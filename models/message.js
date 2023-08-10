const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 1000 },
  added: { type: Date, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
