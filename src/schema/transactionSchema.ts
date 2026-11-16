import { z } from "zod";
import { TransactionType } from "../generated/prisma/enums.js";

export const TransactionSchema = z.object({
  title: z.string().min(1, "O titulo é obrigatório").trim(),
  amount: z.number().positive("O valor deve ser maior que zero"),
  type: z.enum(TransactionType),
  date: z.coerce.date(),
  categoryId: z.uuid("ID de categoria inválido"),
});
