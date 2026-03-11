import { z } from 'zod'

export default z.object({
    raw_description: z.string().min(1),
    mcc: z.string().optional(),
    currency: z.string().optional(),
    amount: z.number().optional(),
    country: z.string().min(2).optional(),
    transaction_id: z.string().optional(),
});