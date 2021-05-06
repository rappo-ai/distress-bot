const axios = require('axios').default;
const { get: getObjectProperty } = require('lodash/object');

const logger = require('../logger');

const TELEGRAM_MESSAGE_TYPES = ["text", "animation", "audio", "document", "photo", "sticker", "video", "video_note", "voice", "caption", "contact", "dice", "game", "poll", "venue", "location"];

async function callTelegramApi(endpoint, token, body = {}) {
  return axios.post(`https://api.telegram.org/bot${token}/${endpoint}`, {
    ...body,
  });
}

function getWebhookUrl(hostUrl, username, secret) {
  return `${hostUrl}/webhooks/telegram/${username}/${secret}`;
}

async function getMe(botToken) {
  return callTelegramApi(
    'getMe',
    botToken,
  );
}

async function getChat({ chat_id }, botToken) {
  return callTelegramApi(
    'getChat',
    botToken,
    {
      chat_id,
    },
  );
}

async function sendMessage({ chat_id, text, reply_to_message_id = "", reply_markup = {}, parse_mode = "", entities = [], disable_web_page_preview = false }, botToken) {
  return callTelegramApi(
    'sendMessage',
    botToken,
    {
      chat_id,
      text,
      reply_to_message_id,
      reply_markup,
      parse_mode,
      entities,
      disable_web_page_preview,
    },
  );
}

async function forwardMessage({ chat_id, from_chat_id, message_id }, botToken) {
  return callTelegramApi(
    'forwardMessage',
    botToken,
    {
      chat_id,
      from_chat_id,
      message_id,
    },
  );
}

async function copyMessage({ chat_id, from_chat_id, message_id, reply_to_message_id }, botToken) {
  return callTelegramApi(
    'copyMessage',
    botToken,
    {
      chat_id,
      from_chat_id,
      message_id,
      reply_to_message_id,
    },
  );
}

async function editMessageText({ chat_id, message_id, text, parse_mode, entities, reply_markup }, botToken) {
  return callTelegramApi(
    'editMessageText',
    botToken,
    {
      chat_id,
      message_id,
      text,
      parse_mode,
      entities,
      reply_markup,
    },
  );
}

async function editMessageReplyMarkup({ chat_id, message_id, reply_markup }, botToken) {
  return callTelegramApi(
    'editMessageReplyMarkup',
    botToken,
    {
      chat_id,
      message_id,
      reply_markup,
    },
  );
}

async function deleteMessage({ chat_id, message_id }, botToken) {
  return callTelegramApi(
    'deleteMessage',
    botToken,
    {
      chat_id,
      message_id,
    },
  );
}

async function sendPhoto({ chat_id, photo, caption, caption_entities, reply_to_message_id = "", reply_markup = {}, parse_mode = "" }, botToken) {
  return callTelegramApi(
    'sendPhoto',
    botToken,
    {
      chat_id,
      photo,
      caption,
      caption_entities,
      reply_to_message_id,
      reply_markup,
      parse_mode,
    },
  );
}

async function sendAudio({ chat_id, audio, duration, performer, title, thumb, caption, caption_entities, reply_to_message_id = "", reply_markup = {}, parse_mode = "" }, botToken) {
  return callTelegramApi(
    'sendAudio',
    botToken,
    {
      chat_id,
      audio,
      duration,
      performer,
      title,
      thumb,
      caption,
      caption_entities,
      reply_to_message_id,
      reply_markup,
      parse_mode,
    },
  );
}

async function sendDocument({ chat_id, document, thumb, caption, caption_entities, reply_to_message_id = "", reply_markup = {}, parse_mode = "" }, botToken) {
  return callTelegramApi(
    'sendDocument',
    botToken,
    {
      chat_id,
      document,
      thumb,
      caption,
      caption_entities,
      reply_to_message_id,
      reply_markup,
      parse_mode,
    },
  );
}

async function sendVideo({ chat_id, video, duration, width, height, thumb, caption, caption_entities, reply_to_message_id = "", reply_markup = {}, parse_mode = "" }, botToken) {
  return callTelegramApi(
    'sendVideo',
    botToken,
    {
      chat_id,
      video,
      duration,
      width,
      height,
      thumb,
      caption,
      caption_entities,
      reply_to_message_id,
      reply_markup,
      parse_mode,
    },
  );
}

async function sendAnimation({ chat_id, animation, duration, width, height, thumb, caption, caption_entities, reply_to_message_id = "", reply_markup = {}, parse_mode = "" }, botToken) {
  return callTelegramApi(
    'sendAnimation',
    botToken,
    {
      chat_id,
      animation,
      duration,
      width,
      height,
      thumb,
      caption,
      caption_entities,
      reply_to_message_id,
      reply_markup,
      parse_mode,
    },
  );
}

async function sendVoice({ chat_id, voice, duration, caption, caption_entities, reply_to_message_id = "", reply_markup = {}, parse_mode = "" }, botToken) {
  return callTelegramApi(
    'sendVoice',
    botToken,
    {
      chat_id,
      voice,
      duration,
      caption,
      caption_entities,
      reply_to_message_id,
      reply_markup,
      parse_mode,
    },
  );
}

async function sendVideoNote({ chat_id, video_note, duration, length, thumb, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendVideoNote',
    botToken,
    {
      chat_id,
      video_note,
      duration,
      length,
      thumb,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendLocation({ chat_id, longitude, latitude, horizontal_accuracy, live_period, heading, proximity_alert_radius, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendLocation',
    botToken,
    {
      chat_id,
      longitude,
      latitude,
      horizontal_accuracy,
      live_period,
      heading,
      proximity_alert_radius,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendVenue({ chat_id, longitude, latitude, title, address, foursquare_id, foursquare_type, google_place_id, google_place_type, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendVenue',
    botToken,
    {
      chat_id,
      longitude,
      latitude,
      title,
      address,
      foursquare_id,
      foursquare_type,
      google_place_id,
      google_place_type,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendContact({ chat_id, phone_number, first_name, last_name, vcard, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendContact',
    botToken,
    {
      chat_id,
      phone_number,
      first_name,
      last_name,
      vcard,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendPoll({ chat_id, question, options, is_anonymous, type, allows_multiple_answers, correct_option_id, explanation, explanation_entities, open_period, close_date, is_closed, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendPoll',
    botToken,
    {
      chat_id,
      question,
      options,
      is_anonymous,
      type,
      allows_multiple_answers,
      correct_option_id,
      explanation,
      explanation_entities,
      open_period,
      close_date,
      is_closed,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendDice({ chat_id, emoji = "", reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendDice',
    botToken,
    {
      chat_id,
      emoji,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendSticker({ chat_id, sticker, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendSticker',
    botToken,
    {
      chat_id,
      sticker,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function sendGame({ chat_id, game_short_name, reply_to_message_id = "", reply_markup = {} }, botToken) {
  return callTelegramApi(
    'sendGame',
    botToken,
    {
      chat_id,
      game_short_name,
      reply_to_message_id,
      reply_markup,
    },
  );
}

async function leaveChat({ chat_id }, botToken) {
  return callTelegramApi(
    'leaveChat',
    botToken,
    {
      chat_id,
    }
  );
}

async function cloneMessage({ message, chat_id, reply_to_message_id = "", reply_markup = {} }, botToken) {
  let apiResponse;
  TELEGRAM_MESSAGE_TYPES.forEach(type => {
    if (!message[type] || apiResponse) {
      return;
    }
    switch (type) {
      case "text":
        apiResponse = sendMessage({
          chat_id,
          reply_to_message_id,
          reply_markup,
          text: message.text,
          entities: message.entities,
        }, botToken);
        break;

      case "photo":
        apiResponse = sendPhoto({
          chat_id,
          reply_to_message_id,
          reply_markup,
          photo: message.photo[message.photo.length - 1].file_id, // last file observed to be the best quality full-res file
          caption: message.caption,
          caption_entities: message.caption_entities,
        }, botToken);
        break;

      case "audio":
        apiResponse = sendAudio({
          chat_id,
          reply_to_message_id,
          reply_markup,
          audio: message.audio.file_id,
          duration: message.audio.duration,
          performer: message.audio.performer,
          title: message.audio.title,
          thumb: getObjectProperty(message, "audio.thumb.file_id"),
          caption: message.caption,
          caption_entities: message.caption_entities,
        }, botToken);
        break;

      case "document":
        apiResponse = sendDocument({
          chat_id,
          reply_to_message_id,
          reply_markup,
          document: message.document.file_id,
          thumb: getObjectProperty(message, "document.thumb.file_id"),
          caption: message.caption,
          caption_entities: message.caption_entities,
        }, botToken);
        break;

      case "video":
        apiResponse = sendVideo({
          chat_id,
          reply_to_message_id,
          reply_markup,
          video: message.video.file_id,
          duration: message.video.duration,
          width: message.video.width,
          height: message.video.height,
          thumb: getObjectProperty(message, "video.thumb.file_id"),
          caption: message.caption,
          caption_entities: message.caption_entities,
        }, botToken);
        break;

      case "animation":
        apiResponse = sendAnimation({
          chat_id,
          reply_to_message_id,
          reply_markup,
          animation: message.animation.file_id,
          duration: message.animation.duration,
          width: message.animation.width,
          height: message.animation.height,
          thumb: getObjectProperty(message, "animation.thumb.file_id"),
          caption: message.caption,
          caption_entities: message.caption_entities,
        }, botToken);
        break;

      case "voice":
        apiResponse = sendVoice({
          chat_id,
          reply_to_message_id,
          reply_markup,
          voice: message.voice.file_id,
          duration: message.voice.duration,
          caption: message.caption,
          caption_entities: message.caption_entities,
        }, botToken);
        break;

      case "video_note":
        apiResponse = sendVideoNote({
          chat_id,
          reply_to_message_id,
          reply_markup,
          video_note: message.video_note.file_id,
          duration: message.video_note.duration,
          length: message.video_note.length,
          thumb: getObjectProperty(message, "video_note.thumb.file_id"),
        }, botToken);
        break;

      case "location":
        apiResponse = sendLocation({
          chat_id,
          reply_to_message_id,
          reply_markup,
          latitude: message.location.latitude,
          longitude: message.location.longitude,
          horizontal_accuracy: message.location.horizontal_accuracy,
          live_period: message.location.live_period,
          heading: message.location.heading,
          proximity_alert_radius: message.location.proximity_alert_radius,
        }, botToken);
        break;

      case "venue":
        apiResponse = sendVenue({
          chat_id,
          reply_to_message_id,
          reply_markup,
          latitude: message.venue.location.latitude,
          longitude: message.venue.location.longitude,
          title: message.venue.title,
          address: message.venue.address,
          foursquare_id: message.venue.foursquare_id,
          foursquare_type: message.venue.foursquare_type,
          google_place_id: message.venue.google_place_id,
          google_place_type: message.venue.google_place_type,
        }, botToken);
        break;

      case "contact":
        apiResponse = sendContact({
          chat_id,
          reply_to_message_id,
          reply_markup,
          phone_number: message.contact.phone_number,
          first_name: message.contact.first_name,
          last_name: message.contact.last_name,
          vcard: message.contact.vcard,
        }, botToken);
        break;

      case "poll":
        apiResponse = sendPoll({
          chat_id,
          reply_to_message_id,
          reply_markup,
          question: message.poll.question,
          options: message.poll.options,
          is_anonymous: message.poll.is_anonymous,
          type: message.poll.type,
          allows_multiple_answers: message.poll.allows_multiple_answers,
          correct_option_id: message.poll.correct_option_id,
          explanation: message.poll.explanation,
          explanation_entities: message.poll.explanation_entities,
          open_period: message.poll.open_period,
          close_date: message.poll.close_date,
          is_closed: message.poll.is_closed,
        }, botToken);
        break;

      case "dice":
        apiResponse = sendDice({
          chat_id,
          reply_to_message_id,
          reply_markup,
          emoji: message.dice.emoji,
        }, botToken);
        break;

      case "sticker":
        apiResponse = sendSticker({
          chat_id,
          reply_to_message_id,
          reply_markup,
          sticker: message.sticker.file_id,
        }, botToken);
        break;

      case "game":
        /*apiResponse = sendGame({
          chat_id,
          reply_to_message_id,
          reply_markup,
          game_short_name: message.game.?,
        }, botToken);*/
        break;

      default:
        logger.error(`cloneMessage: message type '${type}' not implemented`);
        break;
    }
  });
  return apiResponse;
}

const tracker = {};

function getTrackerForChat(chat_id) {
  if (!tracker[chat_id]) {
    tracker[chat_id] = {
      current_state_name: undefined,
      store: {},
    };
  }
  return tracker[chat_id];
}

function getChatId(update) {
  return getObjectProperty(update, "message.chat.id") || getObjectProperty(update, "callback_query.message.chat.id");
}

function getMessageId(update) {
  return getObjectProperty(update, "message.message_id") || getObjectProperty(update, "callback_query.message.message_id");
}

function getMessageText(update) {
  return getObjectProperty(update, "message.text") || getObjectProperty(update, "callback_query.data") || "";
}

function getUserName(update) {
  return getObjectProperty(update, "message.from.username") || getObjectProperty(update, "callback_query.from.username") || "";
}

function getFirstName(update) {
  return getObjectProperty(update, "message.from.first_name") || getObjectProperty(update, "callback_query.from.first_name") || "";
}

function getLastName(update) {
  return getObjectProperty(update, "message.from.last_name") || getObjectProperty(update, "callback_query.from.last_name") || "";
}

function getDate(update) {
  return getObjectProperty(update, "message.date") || getObjectProperty(update, "callback_query.message.date");
}

function isReplyToBot(update) {
  return !!getObjectProperty(update, "message.reply_to_message.from.is_bot");
}

function isCallbackQuery(update) {
  return !!getObjectProperty(update, "callback_query");
}

function formatDate(unixTs) {
  return new Date(unixTs * 1000).toLocaleString("en-GB",
    {
      timeZone: "Asia/Kolkata",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );
}

async function addRow(ssid,creds, dictionary, headers){
  const { GoogleSpreadsheet } = require('google-spreadsheet');  
  
  const doc = new GoogleSpreadsheet(ssid);
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo(); // loads document properties and worksheets
  
  // for (const [ key, value ] of Object.entries(dictionary)) {
  //   // do something with `key` and `value`
  //   console.log(key);
  // }
  
  console.log(doc.title);
  console.log(doc.sheetCount);
  
  const sheet = await doc.sheetsByTitle["Master"] ? await doc.sheetsByTitle["Master"]: await doc.addSheet({ title : "Master", headerValues: headers });
  dictionary["date"] = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  
  const newRow = await sheet.addRow({Date : dictionary['date'], Requirement : dictionary["requirement"], 
  "SPO2 level" : dictionary["spo2"],"Bed type" : dictionary["bed_type"] , "Needs cylinder" : dictionary["needs_cylinder"],
  "Covid test done?" : dictionary["covid_test_done"], "Covid test result" : dictionary["covid_test_result"], 
  "BU number" : dictionary["bu_number"], "SRF ID" : dictionary["covid_test_srf"], 
  "Name" : dictionary["name"], "Age" :  dictionary["age"], "Gender" : dictionary["gender"],
  "Blood group" : dictionary["blood_group"] , "Mobile number" : dictionary["mobile_number"],
  "Address" : dictionary["address"], "Hospital preference" : dictionary["hospital_preference"], 
  "Resolved":"No"
    });
  // 
   
    
    
  console.log("Successful");
}

const functions = {
  "submitForm": async function (update, chat_tracker, bot_definition) {
    const chat_id = getChatId(update);
    const message_id = getMessageId(update);
    const user_name = getUserName(update);
    const first_name = getFirstName(update);
    const last_name = getLastName(update);
    const date = getDate(update);

    const creds = require('./client_secret.json'); // Authentication Credentials
    const ssid = '1dKsDhCS982cq74mbt-EPkMq3w5dDSaGY937vc1546fo' // Spreadsheet ID
    headers = ["Date", "Requirement","SPO2 level", "Bed type", "Needs cylinder", "Covid test done?", 
    "Covid test result", "BU number", "SRF ID", "Name", "Age", "Gender", "Blood group", "Mobile number",
    "Address", "Hospital preference", "Resolved"];
    addRow(ssid, creds, chat_tracker.store, headers);

    let request_message = `${first_name} ${last_name}/@${user_name}
  
STATUS: OPEN

Received on ${formatDate(date)}

Requirement - {requirement}
SPO2 level - {spo2}
Bed type - {bed_type}
Needs cylinder - {needs_cylinder}
Covid test done? - {covid_test_done}
Covid test result - {covid_test_result}
BU number - {bu_number}
SRF ID - {covid_test_srf}
Name - {name}
Age - {age}
Gender - {gender}
Blood group - {blood_group}
Mobile number - {mobile_number}
Address - {address}
Hospital preference - {hospital_preference}

Reply to this message to send a message to user in PM.

${message_id}
${chat_id}`;
    request_message = replaceSlots(request_message, chat_tracker.store, "");
    const reply_markup = { inline_keyboard: getInlineKeyboard("[[Close Request]]") };
    const api_response = await sendMessage({ chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID, text: request_message, reply_markup }, process.env.TELEGRAM_BOT_TOKEN);
    chat_tracker.group_request_message = api_response.data.result;
  },

  "appendUserForm": async function (update, chat_tracker, bot_definition) {
    const user_message_text = getMessageText(update);
    const admin_request_message_id = chat_tracker.group_request_message.message_id;
    const admin_request_message_text = chat_tracker.group_request_message.text;
    const admin_request_reply_markup = chat_tracker.group_request_message.reply_markup;
    const date = getDate(update);

    const message_lines = admin_request_message_text.split("\n");
    let new_message_lines = [];
    message_lines.forEach(line => {
      new_message_lines.push(line);
      if (line.startsWith("STATUS")) {
        new_message_lines.push("");
        new_message_lines.push(`Received on ${formatDate(date)}`);
        new_message_lines.push("");
        new_message_lines.push(user_message_text);
      }
    });
    const new_admin_request_message_text = new_message_lines.join("\n");

    const api_response = await sendMessage({
      chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
      text: new_admin_request_message_text,
      reply_markup: admin_request_reply_markup,
    }, process.env.TELEGRAM_BOT_TOKEN);
    chat_tracker.group_request_message = api_response.data.result;
    await deleteMessage({
      chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
      message_id: admin_request_message_id,
    }, process.env.TELEGRAM_BOT_TOKEN);
  },

  "cancelRequest": async function (update, chat_tracker, bot_definition) {
    const admin_request_message_id = chat_tracker.group_request_message.message_id;
    const admin_request_message_text = chat_tracker.group_request_message.text;
    const date = getDate(update);

    const message_lines = admin_request_message_text.split("\n");
    let new_message_lines = [];
    message_lines.forEach(line => {
      if (line.startsWith("STATUS")) {
        line = "STATUS: CANCELLED"
      }
      new_message_lines.push(line);
      if (line.startsWith("STATUS")) {
        new_message_lines.push("");
        new_message_lines.push(`Received on ${formatDate(date)}`);
        new_message_lines.push("");
        new_message_lines.push("<User cancelled the request>");
      }
    });
    const new_admin_request_message_text = new_message_lines.join("\n");

    let api_response = await sendMessage({
      chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
      text: new_admin_request_message_text,
    }, process.env.TELEGRAM_BOT_TOKEN);
    chat_tracker.group_request_message = api_response.data.result;
    api_response = await deleteMessage({
      chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
      message_id: admin_request_message_id,
    }, process.env.TELEGRAM_BOT_TOKEN);

    api_response = await sendMessage({
      chat_id: getChatId(update),
      text: 'Your request has been successfully cancelled. Ping me anytime to create a new request.',
    }, process.env.TELEGRAM_BOT_TOKEN);
  },

  "checkSpo2": async function (update, chat_tracker, bot_definition) {
    const spo2 = chat_tracker.store["spo2"];
    if (spo2 && parseInt(spo2) < 90) {
      throw new Error("oxygen too low");
    }
  },

  "appendAdminForm": async function (update, chat_tracker, bot_definition) {
    const admin_message_text = getMessageText(update);
    const admin_message_id = getMessageId(update);
    const admin_request_message_id = update.message.reply_to_message.message_id;
    const admin_request_message_text = update.message.reply_to_message.text;
    const admin_request_reply_markup = update.message.reply_to_message.reply_markup;
    const date = getDate(update);

    const message_lines = admin_request_message_text.split("\n");
    let new_message_lines = [];
    message_lines.forEach(line => {
      new_message_lines.push(line);
      if (line.startsWith("STATUS")) {
        new_message_lines.push("");
        new_message_lines.push(`Sent on ${formatDate(date)}`);
        new_message_lines.push("");
        new_message_lines.push(admin_message_text);
      }
    });
    const new_admin_request_message_text = new_message_lines.join("\n");
    const user_chat_id = message_lines[message_lines.length - 1];

    // admin responses
    let api_response = await sendMessage({
      chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
      text: new_admin_request_message_text,
      reply_markup: admin_request_reply_markup,
    }, process.env.TELEGRAM_BOT_TOKEN);
    tracker[user_chat_id].group_request_message = api_response.data.result;
    await deleteMessage({
      chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
      message_id: admin_request_message_id,
    }, process.env.TELEGRAM_BOT_TOKEN);
    try {
      await deleteMessage({
        chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
        message_id: admin_message_id,
      }, process.env.TELEGRAM_BOT_TOKEN);
    } catch (err) {
      logger.err(`appendAdminForm ${err}`);
      logger.warn('bot is not an admin in the group');
    }

    // user response
    api_response = await sendMessage({
      chat_id: user_chat_id,
      text: `NEW MESSAGE FROM SAHAYA GROUP:

${admin_message_text}`,
    }, process.env.TELEGRAM_BOT_TOKEN);
  },

  "handleAdminCallback": async function (update, chat_tracker, bot_definition) {
    const callback_data = getMessageText(update);
    const admin_message_id = getMessageId(update);
    const admin_username = getUserName(update);
    const admin_request_message_id = update.message.reply_to_message.message_id;
    const admin_request_message_text = update.message.reply_to_message.text;
    const admin_request_reply_markup = update.message.reply_to_message.reply_markup;
    const date = getDate(update);

    switch (callback_data) {
      case "Close Request":
        const message_lines = admin_request_message_text.split("\n");
        let new_message_lines = [];
        message_lines.forEach(line => {
          if (line.startsWith("STATUS")) {
            line = "STATUS: CLOSED"
          }
          new_message_lines.push(line);
          if (line.startsWith("STATUS")) {
            new_message_lines.push("");
            new_message_lines.push(`Sent on ${formatDate(date)}`);
            new_message_lines.push("");
            new_message_lines.push(`<Admin @${admin_username} closed the request>`);
          }
        });
        const new_admin_request_message_text = new_message_lines.join("\n");
        const user_chat_id = message_lines[message_lines.length - 1];

        // admin responses
        let api_response = await sendMessage({
          chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
          text: new_admin_request_message_text,
          reply_markup: admin_request_reply_markup,
        }, process.env.TELEGRAM_BOT_TOKEN);
        tracker[user_chat_id].group_request_message = api_response.data.result;
        await deleteMessage({
          chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
          message_id: admin_request_message_id,
        }, process.env.TELEGRAM_BOT_TOKEN);
        await deleteMessage({
          chat_id: process.env.TELEGRAM_ADMIN_GROUP_CHAT_ID,
          message_id: admin_message_id,
        }, process.env.TELEGRAM_BOT_TOKEN);

        // user response
        api_response = await sendMessage({
          chat_id: user_chat_id,
          text: `Your request has been closed.`,
        }, process.env.TELEGRAM_BOT_TOKEN);
        break;
    }
  },
};

function getInlineKeyboard(text) {
  const inline_keyboard = [];

  let reply_markup_text = text.match(/\[.+]/g);
  if (reply_markup_text && reply_markup_text.length) {
    reply_markup_text = reply_markup_text[0];
  }

  if (reply_markup_text) {
    try {
      const button_rows = reply_markup_text.match(/\[[^\[\]]+]/gm);
      button_rows.forEach(row => {
        const reply_markup_row = [];
        const columns = row.slice(1, -1).trim().split(',');
        let hasAtleastOneColumn = false;
        columns.forEach(column => {
          column = column.trim();
          if (column) {
            reply_markup_row.push({
              text: column,
              callback_data: column,
            });
            hasAtleastOneColumn = true;
          }
        });
        if (hasAtleastOneColumn) {
          inline_keyboard.push(reply_markup_row);
        }
      });
    } catch (err) {
      logger.error(`getInlineKeyboard ${err}`);
    }
  }
  return inline_keyboard;
}

function removeReplyMarkup(text) {
  const reply_markup = text.match(/\s*\[.+]/);
  if (reply_markup && reply_markup.length) {
    text = text.substring(0, reply_markup["index"]);
  }
  return text;
}

function replaceSlots(text, chat_store, default_slot_value) {
  const found_slots = [...text.matchAll(/{\w+}/g)];
  let delta = 0;
  found_slots.forEach(s => {
    const slot_name = s[0].slice(1, -1);
    if (chat_store[slot_name]) {
      text = text.substring(0, s["index"] + delta) + chat_store[slot_name] + text.substring(s["index"] + delta + s[0].length);
      delta = delta + chat_store[slot_name].length - s[0].length;
    } else {
      text = text.substring(0, s["index"] + delta) + default_slot_value + text.substring(s["index"] + delta + s[0].length);
      delta = delta + default_slot_value.length - s[0].length;
    }
  });
  return text;
}

function addMessageSlotsToStore(slots, chat_store, message_text, message_id) {
  if (slots) {
    for (const [data_key, slot_key] of Object.entries(slots)) {
      let slot_value;
      switch (data_key) {
        case "message_text":
          slot_value = message_text;
          break;
        case "message_id":
          slot_value = message_id;
          break;
        default:
          break;
      }
      chat_store[slot_key] = slot_value;
    }
  }
}

async function doBotAction(action, chat_tracker, update, functions, bot_definition) {
  const chat_id = getChatId(update);
  let next_state_name;
  let api_response;
  if (action) {
    switch (action.type) {
      case "send_message":
        let text = replaceSlots(action.text, chat_tracker.store, "");
        const reply_markup = { inline_keyboard: getInlineKeyboard(text) };
        text = removeReplyMarkup(text);
        api_response = await sendMessage({ chat_id, text, reply_markup }, process.env.TELEGRAM_BOT_TOKEN);
        addMessageSlotsToStore(action.slots, chat_tracker.store, api_response.data.result.text, api_response.data.result.message_id);
        chat_tracker.last_message_sent = api_response.data.result;
        break;
      case "forward_message":
        const to_chat_id = replaceSlots(action.to, chat_tracker.store, "");
        const message_id = replaceSlots(action.message_id, chat_tracker.store, "");
        api_response = await forwardMessage({ chat_id: to_chat_id, from_chat_id: chat_id, message_id }, process.env.TELEGRAM_BOT_TOKEN);
        addMessageSlotsToStore(action.slots, chat_tracker.store, api_response.data.result.text, api_response.data.result.message_id);
        chat_tracker.last_message_sent = api_response.data.result;
        break;
      case "call_function":
        if (functions[action.method]) {
          try {
            await functions[action.method](update, chat_tracker, bot_definition);
            next_state_name = action.on_success;
          } catch (err) {
            logger.error(`call_function ${err}`);
            next_state_name = action.on_failure;
          }
        }
        break;
      case "goto_state":
        next_state_name = action.state;
        break;
      default:
        break;
    }
  }
  return next_state_name;
}

async function doCommand(command_match, chat_tracker, update, functions, bot_definition) {
  const command = bot_definition.commands.find(c => c.trigger === command_match[0]);
  if (command) {
    return doBotAction(command.action, chat_tracker, update, functions, bot_definition);
  }
  const chat_id = getChatId(update);
  const api_response = await sendMessage({ chat_id, text: bot_definition.command_fallback }, process.env.TELEGRAM_BOT_TOKEN);
  chat_tracker.last_message_sent = api_response.data.result;
}

async function doFallback(bot_definition, chat_tracker, fallback_state, chat_id) {
  let api_response;
  if (fallback_state.fallback) {
    let text = replaceSlots(fallback_state.fallback, chat_tracker.store, "");
    const reply_markup = { inline_keyboard: getInlineKeyboard(text) };
    text = removeReplyMarkup(text);
    api_response = await sendMessage({
      chat_id,
      text,
      reply_markup
    }, process.env.TELEGRAM_BOT_TOKEN);
    chat_tracker.last_message_sent = api_response.data.result;
    return api_response;
  }
  api_response = await sendMessage({ chat_id, text: bot_definition.default_fallback }, process.env.TELEGRAM_BOT_TOKEN);
  chat_tracker.last_message_sent = api_response.data.result;
}

async function processPMUpdate(update, chat_tracker, bot_definition) {
  const chat_id = getChatId(update);
  const message_id = getMessageId(update);

  if (!chat_id) {
    logger.warn("processPMUpdate !chat_id");
    return;
  }

  const message_text = getMessageText(update);
  const current_state_name = chat_tracker.current_state_name;
  const current_state = bot_definition.states.find(s => s.name === current_state_name);

  const chat_store = chat_tracker.store;

  let next_state_name;
  let next_state_transition;

  if (update.callback_query && chat_id && message_id) {
    // hiding the quick reply buttons when any one is clicked
    await editMessageText({
      chat_id,
      message_id,
      text: `${update.callback_query.message.text} ${message_text}`,
      entities: update.callback_query.message.entities,
      reply_markup: { inline_keyboard: [] }
    }, process.env.TELEGRAM_BOT_TOKEN);
  } else if (getObjectProperty(chat_tracker, "last_message_sent.reply_markup.inline_keyboard.length")) {
    // hiding the quick reply buttons when any new message is sent
    await editMessageText({
      chat_id,
      message_id: getObjectProperty(chat_tracker, "last_message_sent.message_id"),
      text: getObjectProperty(chat_tracker, "last_message_sent.text"),
      entities: getObjectProperty(chat_tracker, "last_message_sent.entities"),
      reply_markup: { inline_keyboard: [] }
    }, process.env.TELEGRAM_BOT_TOKEN);
  }

  const command_match = message_text.match(/(^\/[a-z]+)/);
  if (command_match && command_match.length) {
    next_state_name = await doCommand(command_match, chat_tracker, update, functions, bot_definition);
  } else if (current_state) {
    if (current_state.reset_slots) {
      Object.keys(chat_store).forEach(key => (!current_state.reset_slots_exceptions || !current_state.reset_slots_exceptions.includes(key)) && delete chat_store[key]);
    }

    if (current_state.validation) {
      if (!message_text.match(new RegExp(current_state.validation))) {
        await doFallback(bot_definition, chat_tracker, current_state, chat_id);
        return;
      }
    }

    addMessageSlotsToStore(current_state.slots, chat_store, message_text, message_id);

    if (current_state.transitions) {
      next_state_transition = current_state.transitions.find(t => t.on === message_text);
      if (next_state_transition) {
        next_state_name = next_state_transition.to;
      }
      if (!next_state_name) {
        next_state_transition = current_state.transitions.find(t => t.on === "*");
        if (next_state_transition) {
          next_state_name = next_state_transition.to;
        }
      }
    }

    if (!next_state_name) {
      await doFallback(bot_definition, chat_tracker, current_state, chat_id);
      return;
    }
  }

  while (next_state_name) {
    chat_tracker.current_state_name = next_state_name;
    let action_list = bot_definition.states.find(s => s.name === next_state_name).action;
    if (!Array.isArray(action_list)) {
      action_list = [action_list];
    }
    for (let i = 0; i < action_list.length; ++i) {
      next_state_name = await doBotAction(action_list[i], chat_tracker, update, functions, bot_definition);
    }
  }
}

async function processGroupUpdate(update, chat_tracker, bot_definition) {
  const reply_to_bot_action = getObjectProperty(bot_definition, "group.reply_to_bot.action");
  if (isReplyToBot(update) && reply_to_bot_action) {
    await doBotAction(reply_to_bot_action, chat_tracker, update, functions, bot_definition);
  }
  const callback_query_action = getObjectProperty(bot_definition, "group.callback_query.action");
  if (isCallbackQuery(update) && callback_query_action) {
    await doBotAction(callback_query_action, chat_tracker, update, functions, bot_definition);
  }
}

module.exports = {
  callTelegramApi,
  TELEGRAM_MESSAGE_TYPES,
  getWebhookUrl,
  getMe,
  getChat,
  sendMessage,
  forwardMessage,
  copyMessage,
  editMessageText,
  editMessageReplyMarkup,
  deleteMessage,
  sendPhoto,
  sendAudio,
  sendDocument,
  sendVideo,
  sendAnimation,
  sendVoice,
  sendVideoNote,
  sendLocation,
  sendVenue,
  sendContact,
  sendPoll,
  sendDice,
  sendSticker,
  sendGame,
  leaveChat,
  cloneMessage,
  processPMUpdate,
  processGroupUpdate,
  getTrackerForChat,
  getChatId,
};
