const express = require('express');
const router = express.Router();
import * as nc from '../controllers//notes.controller';

router.get('/notes', nc.getAllNotesByUser)
router.get('/notes/:note_id', nc.getSingleNote);
ro8uter.post('/notes/:note_id', nc.createNote);
router.put('/notes/:note_id', nc.updateNote);
router.delete('/notes/:note_id', nc.deleteNote);

module.exports = router;