import logger from "../util/logger.js";

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {

        const detail = result.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
        }));

        logger.error(`Validation failed: ${JSON.stringify(detail)}`);
        return next({
            status: 400,
            code: 'INVALID_PAYLOAD',
            message: 'Payload validation failed',
            details: detail
        });
    }

    next();
};

export default validate;