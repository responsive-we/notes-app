const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [String],
  linkedNotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
