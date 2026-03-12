import merchantService from "../../services/merchant/merchant.service.js";
import { searchSuccess } from "../../util/response.js";


const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await merchantService.getAll({ page, limit });
        return searchSuccess(res, result.data, result.pagination);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        await merchantService.create(req.body);
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    create
};