const { TrackerModel } = require('../db/schema/trackerSchema');
const logger = require('../logger');

async function add(store_data) {
  const saved_tracker = new TrackerModel(store_data);
  await saved_tracker.save().catch(err => logger.error(`database.add error: ${err}`));
}

async function update(request_id, update_data) {
  const filter = { request_id };
  await TrackerModel.findOneAndUpdate(filter, update_data, err => err && logger.error(`database.update error: ${err}`));
}

module.exports = {
  add,
  update
};