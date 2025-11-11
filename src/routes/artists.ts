import { Hono } from "hono";
import { ArtistsController } from "../controllers/artistsController";

const app = new Hono();

app.get('/', ArtistsController.getAllArtists);
app.get('/:id', ArtistsController.getArtistByID);
app.get('/health', ArtistsController.checkHealth);

export default app;