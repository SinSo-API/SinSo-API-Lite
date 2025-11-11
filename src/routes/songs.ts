import { Hono } from 'hono';
import { SongsController } from '../controllers/songsController';

const app = new Hono();

app.get('/', SongsController.getAllSongs);
app.get('/health', SongsController.checkHealth);
app.get('/:id', SongsController.getSongByID);

export default app;
