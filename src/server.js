import { connectMongoDB } from './db/connectMongoDB.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { logger } from './middleware/logger.js';
import { getAllNotes, getNoteById } from './routes/notesRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// src/routes/notesRoutes.js

app.get('/notes', getAllNotes);
app.get('/notes/:noteId', getNoteById);

app.use(notFoundHandler());
app.use(errorHandler());
