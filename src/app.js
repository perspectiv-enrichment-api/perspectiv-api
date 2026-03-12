import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

// info route
app.get('/', (req, res) => {
    res.json({
        name: "Perspectiv API",
        description: "Open Source Transaction Enrichment API",
        version: "1.0.0",
        docs: "https://github.com/perspectiv-enrichment-api/perspectiv-api"
    });
});

app.use('/', routes);
app.use(errorMiddleware);

export default app;