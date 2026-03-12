import normalizeRules from "../../config/normalize-0.0.1.rules.json" with { type: "json" };

const getAll = async ({ page = 1, limit = 10 }) => {
    const offset = (page - 1) * limit;

    const merchants = normalizeRules.merchants.map((merchant) => ({
        name: merchant.name,
        aliases: merchant.aliases,
        merchant_logo: merchant.merchant_logo,
    }));

    const paginated = merchants.slice(offset, offset + limit);
    const totalPages = Math.ceil(merchants.length / limit);

    return {
        data: paginated,
        pagination: {
            total: merchants.length,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    };
};

const create = async (merchant) => {
    throw new Error("Creating merchants is not yet supported. Coming soon 🚧");
};

export default {
    getAll,
    create
};