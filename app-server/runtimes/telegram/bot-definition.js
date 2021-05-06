module.exports = {
  start_state_id: "welcome",
  default_slot_value: "N/A",
  default_fallback: "Please read the instructions and respond as asked.",
  command_fallback: "This is not a valid command",
  debug_channel_chat_id: process.env.TELEGRAM_DEBUG_CHANNEL_CHAT_ID,
  commands: [
    {
      trigger: "/start",
      action: {
        type: "goto_state",
        state: "welcome",
      },
    },
    {
      trigger: "/restart",
      action: {
        type: "goto_state",
        state: "welcome",
      },
    },
  ],
  states: [
    {
      name: "welcome",
      action: [
        {
          type: "send_message",
          text: "Hi I am here to assist you with Covid requests for the state of Karnataka.",
        },
        {
          type: "goto_state",
          state: "new_request",
        },
      ],
      reset_slots: true,
    },
    {
      name: "new_request",
      action: {
        type: "send_message",
        text: "Please select the category for which you want assistance: [[Oxygen][Beds]]",
      },
      slots: {
        message_text: "requirement",
      },
      fallback: "Please select the category from one of the available options: [[Oxygen][Beds]]",
      transitions: [
        {
          on: "Oxygen",
          to: "oxygen",
        },
        {
          on: "Beds",
          to: "beds",
        },
      ],
      reset_slots: true,
    },
    {
      name: "oxygen",
      action: {
        type: "send_message",
        text: "What is the current SPO2 level of the patient? Please enter a value between 1 and 100.",
      },
      slots: {
        message_text: "spo2",
      },
      validation: "^[1-9][0-9]?$|^100$",
      fallback: "Please enter a value between 1 and 100.",
      transitions: [
        {
          on: "*",
          to: "summary",
        },
      ],
    },
    {
      name: "beds",
      action: {
        type: "send_message",
        text: "What type of bed do you need? [[Normal with Oxygen][Normal without Oxygen][ICU with Oxygen][ICU without Oxygen]]",
      },
      slots: {
        message_text: "bed",
      },
      fallback: "Please select from one of the bed types: [[Normal with Oxygen][Normal without Oxygen][ICU with Oxygen][ICU without Oxygen]]",
      transitions: [
        {
          on: "*",
          to: "summary",
        },
      ],
    },
    {
      name: "summary",
      action: [
        {
          type: "send_message",
          text: "Summary of your request:\n\nRequirement - {requirement}\nSPO2 level - {spo2}\nBed type - {bed}",
        },
        {
          type: "send_message",
          text: "Is this correct? [[Yes][No]]"
        },
      ],
      fallback: "Please confirm with a Yes / No. [[Yes][No]]",
      transitions: [
        {
          on: "Yes",
          to: "submit_form",
        },
        {
          on: "No",
          to: "new_request",
        },
      ],
    },
    {
      name: "submit_form",
      action: [
        {
          type: "call_function",
          method: "submitForm",
          on_success: "submit_form_success",
          on_failure: "submit_form_failure",
        },
      ],
    },
    {
      name: "submit_form_success",
      action: {
        type: "send_message",
        text: `Thank you for reaching out to us. Your message has been recorded. We are trying our best to help, but until we revert back to you with an update please dial 1912 or 108 for beds.
 
We wish a speedy recovery for your loved ones. [[Cancel Request]]`,
      },
      transitions: [
        {
          on: "Cancel Request",
          to: "cancel_request",
        },
        {
          on: "*",
          to: "append_form",
        },
      ],
    },
    {
      name: "submit_form_failure",
      action: {
        type: "send_message",
        text: "Your request could not be recorded at this time. Would you like to try again? [[Yes][No]]",
      },
      fallback: "Please confirm with a Yes / No. [[Yes][No]]",
      transitions: [
        {
          on: "Yes",
          to: "submit_form",
        },
        {
          on: "No",
          to: "sleep",
        }
      ],
    },
    {
      name: "append_form",
      action: {
        type: "call_function",
        method: "appendUserForm",
        on_success: "append_form_success",
        on_failure: "append_form_failure",
      },
    },
    {
      name: "append_form_success",
      action: {
        type: "send_message",
        text: `Your message has been recorded. We are trying our best to help, but until we revert back to you with an update please dial 1912 or 108 for beds.

We wish a speedy recovery for your loved ones. [[Cancel Request]]`,
      },
      transitions: [
        {
          on: "Cancel Request",
          to: "cancel_request",
        },
        {
          on: "*",
          to: "append_form",
        },
      ],
    },
    {
      name: "append_form_failure",
      action: {
        type: "send_message",
        text: "Your request could not be recorded. Please try sending your message again after some time. [[Cancel Request]]",
      },
      transitions: [
        {
          on: "Cancel Request",
          to: "cancel_request",
        },
        {
          on: "*",
          to: "append_form",
        },
      ],
    },
    {
      name: "cancel_request",
      action: {
        type: "call_function",
        method: "cancelRequest",
        on_success: "sleep",
        on_failure: "cancel_request_failure",
      },
    },
    {
      name: "cancel_request_failure",
      action: {
        type: "send_message",
        text: "Your cancellation request could not be processed. Please try again after some time. [[Cancel Request]]",
      },
      transitions: [
        {
          on: "Cancel Request",
          to: "cancel_request",
        },
        {
          on: "*",
          to: "append_form",
        },
      ],
    },
    {
      name: "sleep",
      transitions: [
        {
          on: "*",
          to: "new_request",
        },
      ],
    }
  ],
  group: {
    allow: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
    reply_to_bot: {
      action: {
        type: "call_function",
        method: "appendAdminForm"
      },
    },
    callback_query: {
      action: {
        type: "call_function",
        method: "handleAdminCallback"
      },
    }
  }
};