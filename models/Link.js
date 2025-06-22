const mongoose = require('mongoose');
const shortid = require('shortid');

const TargetValueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const ClickSchema = new mongoose.Schema({
  insertedAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: false, // Set to false to handle cases where IP is not available
  },
  targetParamValue: {
    type: String,
  },
});

const LinkSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrlId: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: [ClickSchema],
  targetParamName: {
    type: String,
    default: 't',
  },
  targetValues: [TargetValueSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Link', LinkSchema);
