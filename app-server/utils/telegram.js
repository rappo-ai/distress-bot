const axios = require('axios').default;
const { get: getObjectProperty } = require('lodash/object');

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
        columns.forEach(column => {
          reply_markup_row.push({
            text: column,
            callback_data: column,
          });
        });
        inline_keyboard.push(reply_markup_row);
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

function replaceSlots(text, stored_slots, default_slot_value) {
  const found_slots = [...text.matchAll(/{\w+}/g)];
  let delta = 0;
  found_slots.forEach(s => {
    const slot_name = s[0].slice(1, -1);
    if (stored_slots[slot_name]) {
      text = text.substring(0, s["index"] + delta) + stored_slots[slot_name] + text.substring(s["index"] + delta + s[0].length);
      delta = delta + stored_slots[slot_name].length - s[0].length;
    } else {
      text = text.substring(0, s["index"] + delta) + default_slot_value + text.substring(s["index"] + delta + s[0].length);
      delta = delta + default_slot_value - s[0].length;
    }
  });
  return text;
}

async function doBotAction(action, chat_id, stored_slots, default_slot_value) {
  let next_state_name;
  switch (action.type) {
    case "message":
      const reply_markup = { inline_keyboard: getInlineKeyboard(action.text) };
      let text = removeReplyMarkup(action.text);
      text = replaceSlots(text, stored_slots, default_slot_value);
      await sendMessage({ chat_id, text, reply_markup }, process.env.TELEGRAM_BOT_TOKEN);
      next_state_name = action.on_sent;
      break;
    case "api":
      next_state_name = action.on_success;
      break;
    case "goto":
      next_state_name = action.state;
      break;
    default:
      break;
  }
  return next_state_name;
}

async function doCommand(command_message, bot_definition, chat_id, stored_slots) {
  const command = bot_definition.commands.find(c => c.trigger === command_message);
  if (command) {
    return doBotAction(command.action, chat_id, stored_slots, bot_definition.default_slot_value);
  }
  return sendMessage({ chat_id, text: bot_definition.command_fallback }, process.env.TELEGRAM_BOT_TOKEN);
}

async function doFallback(bot_definition, fallback_state, chat_id) {
  if (fallback_state.fallback) {
    return sendMessage({ chat_id, text: fallback_state.fallback }, process.env.TELEGRAM_BOT_TOKEN);
  }
  return sendMessage({ chat_id, text: bot_definition.default_fallback }, process.env.TELEGRAM_BOT_TOKEN);
}

async function processPrivateMessage(bot_definition, update, tracker) {
  const chat_id = getObjectProperty(update, "message.chat.id") || getObjectProperty(update, "callback_query.message.chat.id");
  const message_id = getObjectProperty(update, "message.message_id") || getObjectProperty(update, "callback_query.message.message_id");

  if (!chat_id) {
    logger.warn("processPrivateMessage !chat_id");
    return;
  }
  if (!tracker[chat_id]) {
    tracker[chat_id] = {
      state: undefined,
      slots: {},
    };
  }

  const message_text = getObjectProperty(update, "message.text") || getObjectProperty(update, "callback_query.data") || "";
  const current_state_name = tracker[chat_id].state;
  const current_state = bot_definition.states.find(s => s.name === current_state_name);
  const stored_slots = tracker[chat_id].slots;

  let next_state_name;
  let next_state_transition;

  if (update.callback_query && chat_id && message_id) {
    //await editMessageReplyMarkup({ chat_id, message_id, reply_markup: { inline_keyboard: [] } }, process.env.TELEGRAM_BOT_TOKEN);
    //await sendMessage({ chat_id, text: update.callback_query.data }, process.env.TELEGRAM_BOT_TOKEN);
    await editMessageText({ chat_id, message_id, text: `${update.callback_query.message.text} ${message_text}`, reply_markup: { inline_keyboard: [] } }, process.env.TELEGRAM_BOT_TOKEN);
  }

  if (message_text.charAt(0) === "/") {
    next_state_name = await doCommand(message_text, bot_definition, chat_id, stored_slots);
  } else if (current_state) {
    if (current_state.slot) {
      stored_slots[current_state.slot] = message_text;
    }

    if (current_state.validation) {
      if (!message_text.match(new RegExp(current_state.validation))) {
        await doFallback(bot_definition, current_state, chat_id);
        return;
      }
    }

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
      await doFallback(bot_definition, current_state, chat_id);
      return;
    }
  }

  while (next_state_name) {
    tracker[chat_id].state = next_state_name;
    next_state_name = await doBotAction(bot_definition.states.find(s => s.name === next_state_name).action, chat_id, stored_slots, bot_definition.default_slot_value);
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
  processPrivateMessage,
};
