import logger from "../../util/logger.js";
import normalizationRule from "../../config/normalize-0.0.1.rules.json" with {type: "json"};
import config from "../../config/index.js";


/**
 * Lowercases, trims, strips brackets/parens, and collapses whitespace.
 */
const canonicalize = (data) => {
    if (!data || typeof data !== "string") return "";

    return data
        .toLowerCase()
        .trim()
        .replace(/[\[\]()]/g, "")   // strip brackets and parentheses
        .replace(/\s+/g, " ");      // collapse multiple spaces into one
};


/**
 * Removes noise tokens and tokens that are purely numeric or contain
 * long digit sequences (e.g. card numbers, amounts, balances).
 */
const denoise = (data, noiseTokens = []) => {
    if (!data) return "";

    const tokens = data.split(/\s+/);  // split on any whitespace

    const filtered = tokens.filter((token) => {
        if (!token) return false;

        // remove tokens with no letters at all (e.g. "23.00", ":0.01")
        if (/^[^a-z]+$/i.test(token)) return false;

        // remove tokens containing long digit sequences (e.g. "card..1399", "bal:ghs137.92")
        if (/\d{4,}/.test(token)) return false;

        // remove known noise tokens
        if (noiseTokens.includes(token)) return false;

        return true;
    });

    return filtered.join(" ");
};


/**
 * Attempts to match the cleaned description against known merchant aliases.
 * Uses whole-word regex matching to avoid false substring matches.
 */
const matchMerchant = (data, merchants = []) => {
    for (const merchant of merchants) {
        for (const alias of merchant.aliases) {
            // escape any regex special characters in the alias
            const escaped = alias.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            // whole-word match: alias must not be preceded or followed by alphanumeric chars
            const regex = new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i");

            if (regex.test(data)) {
                return {
                    name: merchant.name,
                    matchedAlias: alias,
                    merchant_logo: merchant.merchant_logo
                };
            }
        }
    }

    return {
        name: null,
        matchedAlias: null,
        merchant_logo: null,
        note: "unable to match to a merchant. bear with us, we'll get there 😅"
    };
};


const normalize = (payload) => {
    logger.info(`Normalizing and extracting insights from ${JSON.stringify(payload)}`);

    if (!payload || !payload.raw_description) {
        return {
            description: payload,
            note: "unable to find a matching merchant. bear with us, we'll get there 😅"
        };
    }

    const originalDescription = payload.raw_description;

    // canonicalize
    const canonical = canonicalize(originalDescription);
    logger.info(`Result of canonicalization: ${canonical}`);

    // denoise
    const cleaned = denoise(canonical, normalizationRule.noiseTokens);
    logger.info(`Result of denoising: ${cleaned}`);

    // match merchant
    const merchantMatch = matchMerchant(cleaned, normalizationRule.merchants);

    return {
        originalDescription,
        normalizedDescription: cleaned,
        merchant: merchantMatch.name,
        merchant_alias: merchantMatch.matchedAlias,
        logo: merchantMatch.merchant_logo ? config.LOGO_CDN + merchantMatch.merchant_logo : null,
        ...(merchantMatch.note && { note: merchantMatch.note })
    };
};


export default {
    normalize
};