const errHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: 'error',
        error: {
            code: err.code || 'BAD_REQUEST',
            message: err.message || 'An Error Occurred while processing your request',
            detail: err.details
        }
    });
};

export default errHandler;