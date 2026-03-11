import normalize  from './normalization.service.js'
import logger from "../../util/logger.js";

const enrich = async (payload) => {
    logger.info(`Enriching txn: ${JSON.stringify(payload)}`)
    return normalize.normalize(payload);
};

export default { enrich };