const { Schema, model } = require('mongoose');

const candidateSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    linkedInURL: {
      type: String,
    },
    gitHubURL: {
      type: String,
    },
    experience: {
      type: Number,
      default: 0,
    },
    tags: [String],
    notes: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Candidate', candidateSchema);
