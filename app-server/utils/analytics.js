const ua = require('universal-analytics');

module.exports = {
  sendEvent: function (user_id, category, action, label, value) {
    if (process.env.GA_UA_ID) {
      const visitor = ua(process.env.GA_UA_ID, user_id, { uid: user_id, strictCidFormat: false });
      visitor.event(category, action, label, value).send();
    }
  }
};
