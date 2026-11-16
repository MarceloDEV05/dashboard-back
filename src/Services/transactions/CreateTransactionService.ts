import { TransactionType } from "../../generated/prisma/client.js";
import { prisma } from "../../prisma/index.js";

interface CreateTransaction {
  userId: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  categoryId: string;
}

export class CreateTransactionService {
  async execute({
    userId,
    title,
    amount,
    type,
    date,
    categoryId,
  }: CreateTransaction) {
    const category = await prisma.categories.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error("Categoria nao encontrada!");
    }

    if (category.type !== type) {
      throw new Error(
        `Esta categoria aceita apenas movimentações do tipo ${category.type} `,
      );
    }

    const transaction = await prisma.transactions.create({
      data: {
        userId,
        title,
        amount,
        type,
        date,
        categoryId,
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return transaction;
  }
}
