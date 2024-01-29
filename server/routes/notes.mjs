import  express from 'express';
const router = express.Router();
import { Utility as util } from '../utility/utility.mjs';

import { 
    getAllNotesByUser,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote,
} from '../controllers/notes.controller';

router.get('/api/notes', getAllNotesByUser);


router.get('/api/notes/:note_id', getSingleNote);
// ro8uter.post('notes/:note_id', nc.createNote);
router.post('/api/notes/:note_id', createNote);
// router.put('notes/:note_id', nc.updateNote);
router.put('/api/notes/:note_id', updateNote);
// router.delete('notes/:note_id', nc.deleteNote);
router.delete('/api/notes/:note_id', deleteNote);

module.exports = router;