module.exports = {
  start_state_id: "welcome",
  default_slot_value: "N/A",
  default_fallback: "Please read the instructions and respond as asked.",
  command_fallback: "This is not a valid command",
  commands: [
    {
      trigger: "/start",
      action: {
        type: "goto",
        state: "welcome",
      },
    },
    {
      trigger: "/restart",
      action: {
        type: "goto",
        state: "welcome",
      },
    },
  ],
  states: [
    {
      name: "welcome",
      action: {
        type: "message",
        text: "Hi I am here to assist you. Please select the category for which you want assistance: [[Oxygen][Beds][Other]]",
      },
      slot: "requirement",
      fallback: "Please select the category from one of the available options: [[Oxygen][Beds][Other]]",
      transitions: [
        {
          on: "Oxygen",
          to: "oxygen",
        },
        {
          on: "Beds",
          to: "beds",
        },
        {
          on: "Other",
          to: "misc",
        }
      ],
    },
    {
      name: "oxygen",
      action: {
        type: "message",
        text: "What is the current SPO2 level of the patient? Please enter a value between 1 and 100.",
      },
      slot: "spo2",
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
        type: "message",
        text: "What type of bed do you need? [[Normal with Oxygen][Normal without Oxygen][ICU with Oxygen][ICU without Oxygen]]",
      },
      slot: "bed",
      fallback: "Please select from one of the bed types: [[Normal with Oxygen][Normal without Oxygen][ICU with Oxygen][ICU without Oxygen]]",
      transitions: [
        {
          on: "*",
          to: "summary",
        },
      ],
    },
    {
      name: "misc",
      action: {
        type: "message",
        text: "Please state your query here and we will do our best to get back to you.",
      },
      slot: "misc_query",
      transitions: [
        {
          on: "*",
          to: "submit_misc_query",
        },
      ],
    },
    {
      name: "summary",
      action: {
        type: "message",
        text: "Summary of your request:\n\nRequirement - {requirement}\nSPO2 level - {spo2}\nBed type - {bed}\n\nIs this correct? [[Yes][No]]",
      },
      fallback: "Please confirm if your requirement is correct with a Yes / No. [[Yes][No]]",
      transitions: [
        {
          on: "Yes",
          to: "submit_form",
        },
        {
          on: "No",
          to: "welcome",
        },
      ],
    },
    {
      name: "submit_form",
      action: {
        type: "api",
        request: "addRow?requirement={requirement}&spo2={spo2}&bed={bed}",
        on_success: "form_submit_success",
        on_failure: "form_submit_failure",
      },
      slot: "form_response",
    },
    {
      name: "form_submit_success",
      action: {
        type: "message",
        text: "Your request has been recorded. Your position in the queue is {form_response.queue_position}. We will get back to you soon.",
      },
    },
    {
      name: "form_submit_failure",
      action: {
        type: "message",
        text: "Your request could not be recorded at this time. Would you like to try again? [[Yes][No]]",
      },
      transitions: [
        {
          on: "Yes",
          to: "submit_form",
        },
        {
          on: "No",
          to: "welcome",
        }
      ],
    },
    {
      name: "submit_misc_query",
      action: {
        type: "forward",
        message: "{misc_query}",
        on_success: "misc_query_submitted"
      },
    },
    {
      name: "misc_query_submitted",
      action: {
        type: "message",
        message: "We have received your request and will revert to you shortly.",
      },
    }
  ],
};