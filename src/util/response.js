export const success = (res, data) => {
    return res.status(200).json({
        status: 'success',
        data
    });
}

export const searchSuccess = (res, data, page) => {
    return res.status(200).json({
        status: 'success',
        data,
        page
    })
}