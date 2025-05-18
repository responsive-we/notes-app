const Note = require('../models/Note');

// Extract #tags
function extractTags(content) {
  const regex = /#(\w+)/g;
  const tags = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    tags.push(match[1]);
  }
  return [...new Set(tags)];
}

// Extract [[Note Title]]
function extractLinkedTitles(content) {
  const regex = /\[\[([^\]]+)\]\]/g;
  const titles = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    titles.push(match[1].trim());
  }
  return [...new Set(titles)];
}

// Resolve titles to note ObjectIds
async function resolveLinkedNotes(titles, userId) {
  const notes = await Note.find({ title: { $in: titles }, user: userId });
  return notes.map(note => note._id);
}

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const tags = extractTags(content);
    const linkedTitles = extractLinkedTitles(content);
    const linkedNotes = await resolveLinkedNotes(linkedTitles, userId);

    const note = new Note({ title, content, user: userId, tags, linkedNotes });
    await note.save();

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const tags = extractTags(content);
    const linkedTitles = extractLinkedTitles(content);
    const linkedNotes = await resolveLinkedNotes(linkedTitles, userId);

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, content, tags, linkedNotes },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.searchNotes = async (req, res) => {
  const userId = req.user.id;
  const { query = '', tag = '', sortBy = 'updatedAt', order = 'desc' } = req.query;

  try {
    const searchConditions = {
      user: userId,
      ...(query && {
        $or: [
          { title: new RegExp(query, 'i') },
          { content: new RegExp(query, 'i') }
        ]
      }),
      ...(tag && { tags: tag })
    };

    const notes = await Note.find(searchConditions)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};