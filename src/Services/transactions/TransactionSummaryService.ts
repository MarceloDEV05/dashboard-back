import { prisma } from "../../prisma/index.js";

interface SummaryInput {
  userId: string;
  month?: number;
  year?: number;
}

export class TransactionSummaryService {
  async execute({ userId, month, year }: SummaryInput) {
    const now = new Date();
    const targetMonth = month ?? now.getUTCMonth() + 1;
    const targetYear = year ?? now.getUTCFullYear();

    const startDate = new Date(Date.UTC(targetYear, targetMonth - 1, 1));
    const endDate = new Date(
      Date.UTC(targetYear, targetMonth, 0, 23, 59, 59, 999),
    );

    const transaction = await prisma.transactions.findMany({
      where: {
        userId,
        date: { gte: startDate, lte: endDate },
      },
      include: {
        categories: true,
      },
    });

    let earnings = 0;
    let expense = 0;

    const categoryTotals: Record<string, { name: string; total: number }> = {};

    for (const item of transaction) {
      const amount = Number(item.amount);
      if (item.type === "EARNINGS") {
        earnings += amount;
      } else {
        expense += amount;

        if (!categoryTotals[item.categoryId]) {
          categoryTotals[item.categoryId] = {
            name: item.categories.name,
            total: 0,
          };
        }
        categoryTotals[item.categoryId].total += amount;
      }
    }

    return {
      income: Number(earnings.toFixed(2)),
      expense: Number(expense.toFixed(2)),
      balance: Number((earnings - expense).toFixed(2)),
      expensesByCategory: Object.values(categoryTotals).map((cat) => ({
        ...cat,
        total: Number(cat.total.toFixed(2)),
      })),
    };
  }
}
