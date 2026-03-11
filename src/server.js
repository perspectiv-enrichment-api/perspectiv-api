import app from './app.js';
import config from "./config/index.js";
import logger from "./util/logger.js";

if (process.env.NODE_ENV !== 'prod') {
    logger.warn(`App active env: ${config.NODE_ENV}`)
    app.listen(config.PORT, () => {
        console.log(`Server started on port ${config.PORT}`);
    });
}

export default app;