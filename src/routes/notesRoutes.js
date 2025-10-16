import { Router } from 'express';
import { getAllNotes, getNoteById } from '../controllers/notesController.js';

export const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
