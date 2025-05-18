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
  }],
  trashed: {
  type: Boolean,
  default: false
},
pinned: {
  type: Boolean,
  default: false
},
archived: {
  type: Boolean,
  default: false
}
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
