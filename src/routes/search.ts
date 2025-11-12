import { Hono } from 'hono';
import { SearchController } from '../controllers/searchController';

const app = new Hono();

app.get('/', SearchController.searchSongs);
app.get('/health', SearchController.checkHealth);

export default app;