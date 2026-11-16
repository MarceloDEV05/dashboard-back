import { Request, Response } from "express";
import { CreateTransactionService } from "../../Services/transactions/CreateTransactionService.js";
import { TransactionSchema } from "../../schema/transactionSchema.js";

export class CreateTransactionController {
  async handle(req: Request, res: Response) {
    const userId = req.userId;
    const { title, amount, type, date, categoryId } = TransactionSchema.parse(
      req.body,
    );

    const createTransaction = new CreateTransactionService();
    const transaction = await createTransaction.execute({
      userId,
      title,
      amount,
      type,
      date,
      categoryId,
    });

    return res.json(transaction);
  }
}
