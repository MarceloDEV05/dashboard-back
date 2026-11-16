import { z } from 'zod';
import { TransactionType } from '../generated/prisma/enums.js';

export const schema = z.object({
    type: z.enum(TransactionType)
})