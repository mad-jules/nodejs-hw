import express from 'express';
import cors from 'cors';
import PinoHttp from 'pino-http';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3000;
const app = express();
const logger = PinoHttp({
  transport: {
    target: 'pino-pretty',
  },
});

app.use(express.json());
app.use(cors());
app.use(logger);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/notes', (req, res) => {
  console.log('test');
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${id}`,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.get('/test-error', (req, res) => {
  console.log('err');
  throw new Error('Simulated server error');
});

app.use((error, req, res, next) => {
  res.status(500).json({
    message: 'Internal Server Error',
  });
});
