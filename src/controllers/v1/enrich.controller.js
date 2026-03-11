import enrichmentService from '../../services/enrichment/enrichment.service.js';
import { success } from '../../util/response.js';
import logger from "../../util/logger.js";

const enrich = async (req, res, next) => {
    try {
        const result = await enrichmentService.enrich(req.body);
        return success(res, result);
    } catch (err) {
        logger.error(`An error occurred while processing the request: ${err}`)
        next(err);
    }
};

export default { enrich };