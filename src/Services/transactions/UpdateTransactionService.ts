import { prisma } from "../../prisma/index.js";
import { TransactionType } from "../../generated/prisma/enums.js";

interface UpdateTransaction {
  id: string;
  userId: string;
  title?: string;
  amount?: number;
  type?: TransactionType;
  date?: Date;
  categoryId?: string;
}

export class UpdateTransactionService {
  async execute({
    id,
    userId,
    title,
    amount,
    type,
    date,
    categoryId,
  }: UpdateTransaction) {
    const existingTransaction = await prisma.transactions.findFirst({
      where: { id, userId },
    });

    if (!existingTransaction) {
      throw new Error("Transação não encontrada");
    }

    const finalType = type ?? existingTransaction.type;
    const finalCategoryId = categoryId ?? existingTransaction.categoryId;

    if (categoryId || type) {
      const category = await prisma.categories.findFirst({
        where: { id: finalCategoryId, userId },
      });

      if (!category) {
        throw new Error("Categoria nao encontrada");
      }

      if (category.type !== finalType) {
        throw new Error(
          `Esta categoria aceita apenas movimentações do tipo ${category.type}`,
        );
      }
    }


    const updateTransaction = await prisma.transactions.update({
        where: { id },
        data: {
            title: title?.trim(),
            amount,
            type,
            date, 
            categoryId
        },
        include: {
            categories: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    return updateTransaction;

  }
}
