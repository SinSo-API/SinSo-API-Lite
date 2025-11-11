import { Hono } from "hono";
import { LyricsController } from "../controllers/lyricsController";

const app = new Hono();

app.get('/health', LyricsController.checkHealth);
app.get('/:id', LyricsController.getLyricByID);

export default app;