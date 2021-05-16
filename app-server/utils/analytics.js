const ua = require('universal-analytics');

module.exports = {
    sendEvent: function (user_id, category, action, label, value) {
        const visitor = ua(process.env.GA_UA_ID, {uid: user_id});
        visitor.event(category, action, label, value).send();
    }
  };
  