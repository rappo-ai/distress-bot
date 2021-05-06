module.exports = {
  start_state_id: "welcome",
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
      reset_slots_exceptions: ["bu_number", "covid_test_srf", "name", "age", "mobile_number", "address"],
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
          to: "spo2",
        },
        {
          on: "Beds",
          to: "bed_type",
        },
      ],
      reset_slots: true,
      reset_slots_exceptions: ["bu_number", "covid_test_srf", "name", "age", "mobile_number", "address"],
    },
    {
      name: "spo2",
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
          to: "check_spo2",
        },
      ],
    },
    {
      name: "bed_type",
      action: {
        type: "send_message",
        text: "What type of bed do you need? [[Normal with Oxygen][Normal without Oxygen][ICU with Oxygen][ICU without Oxygen]]",
      },
      slots: {
        message_text: "bed_type",
      },
      fallback: "Please select from one of the bed types: [[Normal with Oxygen][Normal without Oxygen][ICU with Oxygen][ICU without Oxygen]]",
      transitions: [
        {
          on: "*",
          to: "covid_test_done",
        },
      ],
    },
    {
      name: "check_spo2",
      action: {
        type: "call_function",
        method: "checkSpo2",
        on_success: "covid_test_done",
        on_failure: "needs_cylinder",
      },
    },
    {
      name: "needs_cylinder",
      action: {
        type: "send_message",
        text: "Does the patient require an oxygen cylinder? [[Yes, No]]",
      },
      validation: "^Yes$|^No$",
      fallback: "Please confirm with a Yes / No. [[Yes, No]]",
      slots: {
        message_text: "needs_cylinder",
      },
      transitions: [
        {
          on: "*",
          to: "covid_test_done",
        },
      ],
    },
    {
      name: "covid_test_done",
      action: {
        type: "send_message",
        text: "Has the patient done a COVID test? [[Yes, No]]",
      },
      slots: {
        message_text: "covid_test_done",
      },
      fallback: "Please confirm with a Yes / No. [[Yes, No]]",
      transitions: [
        {
          on: "Yes",
          to: "covid_test_result",
        },
        {
          on: "No",
          to: "collect_personal_details",
        },
      ],
    },
    {
      name: "covid_test_result",
      action: {
        type: "send_message",
        text: "What is the COVID test result? [[Positive, Negative, Awaiting]]",
      },
      slots: {
        message_text: "covid_test_result",
      },
      validation: "^Positive$|^Negative$|^Awaiting$",
      fallback: "Please select one of the following options: [[Positive, Negative, Awaiting]]",
      transitions: [
        {
          on: "Positive",
          to: "bu_number",
        },
        {
          on: "*",
          to: "covid_test_srf",
        },
      ],
    },
    {
      name: "bu_number",
      action: {
        type: "send_message",
        text: "What is the 6-digit BU number? [[{bu_number}][Skip]]",
      },
      slots: {
        message_text: "bu_number",
      },
      validation: "^\\d{6}$|^Skip$",
      persist_slot: true,
      fallback: "Please enter the 6-digit BU number: [[{bu_number}][Skip]]",
      transitions: [
        {
          on: "*",
          to: "covid_test_srf",
        },
      ],
    },
    {
      name: "covid_test_srf",
      action: {
        type: "send_message",
        text: "What is the 13-digit COVID test SRF ID? [[{covid_test_srf}][Skip]]",
      },
      slots: {
        message_text: "covid_test_srf",
      },
      validation: "^\\d{13}$|^Skip$",
      fallback: "Please enter the 13-digit COVID test SRF ID. [[{covid_test_srf}][Skip]]",
      transitions: [
        {
          on: "*",
          to: "collect_personal_details",
        },
      ],
    },
    {
      name: "collect_personal_details",
      action: [
        {
          type: "send_message",
          text: "We will need to collect some personal details to proceed.",
        },
        {
          type: "goto_state",
          state: "name",
        },
      ]
    },
    {
      name: "name",
      action: {
        type: "send_message",
        text: "What is the full name of the patient? [[{name}]]",
      },
      slots: {
        message_text: "name",
      },
      transitions: [
        {
          on: "*",
          to: "age",
        },
      ],
    },
    {
      name: "age",
      action: {
        type: "send_message",
        text: "What is the age of the patient? Please enter a number between 1 and 120. [[{age}]]",
      },
      slots: {
        message_text: "age",
      },
      validation: "^[1-9][0-9]?$|^1[0-1]\\d$|^120$",
      fallback: "Please enter a number between 1 and 120. [[{age}]]",
      transitions: [
        {
          on: "*",
          to: "gender",
        },
      ],
    },
    {
      name: "gender",
      action: {
        type: "send_message",
        text: "What is the gender of the patient?\n{gender} [[Male, Female]]",
      },
      slots: {
        message_text: "gender",
      },
      validation: "^Male$|^Female$",
      fallback: "Please select one of the below options. [[Male, Female]]",
      transitions: [
        {
          on: "*",
          to: "blood_group",
        },
      ],
    },
    {
      name: "blood_group",
      action: {
        type: "send_message",
        text: "What is the blood group of the patient? [[A+, A-][B+, B-][O+, O-][AB+, AB-][Don't know]]",
      },
      slots: {
        message_text: "blood_group",
      },
      validation: "^A\\+$|^A-$|^B\\+$|^B-$|^O\\+$|^O-$|^AB\\+$|^AB-$|^Don't know$",
      fallback: "Please select one of the below options: [[A+, A-][B+, B-][O+, O-][AB+, AB-][Don't know]]",
      transitions: [
        {
          on: "*",
          to: "mobile_number",
        },
      ],
    },
    {
      name: "mobile_number",
      action: {
        type: "send_message",
        text: "What is the 10-digit mobile number of the patient (or the attender)? [[{mobile_number}]]",
      },
      slots: {
        message_text: "mobile_number",
      },
      validation: "^\\d{10}$",
      fallback: "Please enter a 10-digit mobile number. [[{mobile_number}]]",
      transitions: [
        {
          on: "*",
          to: "address",
        },
      ],
    },
    {
      name: "address",
      action: {
        type: "send_message",
        text: "What is the address of the patient? [[{address}][Skip]]",
      },
      slots: {
        message_text: "address",
      },
      transitions: [
        {
          on: "*",
          to: "hospital_preference",
        },
      ],
    },
    {
      name: "hospital_preference",
      action: {
        type: "send_message",
        text: "What is the hospital preference of the patient? [[Private][Government][No preference]]",
      },
      slots: {
        message_text: "hospital_preference",
      },
      validation: "^Private$|^Government$|^No preference$",
      fallback: "Please select the hospital preference from the available options: [[Private][Government][No preference]]",
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
          text: "Summary of your request:\n\nRequirement - {requirement}\nSPO2 level - {spo2}\nBed type - {bed_type}\nNeeds cylinder - {needs_cylinder}\nCovid test done? - {covid_test_done}\nCovid test result - {covid_test_result}\nBU number - {bu_number}\nSRF ID - {covid_test_srf}\nName - {name}\nAge - {age}\nGender - {gender}\nBlood group - {blood_group}\nMobile number - {mobile_number}\nAddress - {address}\nHospital preference - {hospital_preference}",
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