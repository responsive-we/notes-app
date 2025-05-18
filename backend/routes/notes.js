const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth")
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
  trashNote,
  restoreNote,
  togglePin,
  toggleArchive
} = require('../controllers/noteController');

router.get('/search', auth, searchNotes);
router.post('/', auth, createNote);
router.get('/', auth, getNotes);
router.get('/:id', auth, getNoteById);
router.put('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);
router.delete('/trash/:id', auth, trashNote);
router.post('/restore/:id', auth, restoreNote);
router.post('/pin/:id', auth, togglePin);
router.post('/archive/:id', auth, toggleArchive);
module.exports = router;