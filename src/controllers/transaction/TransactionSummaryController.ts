import { Request, Response } from 'express';
import { TransactionSummaryService } from '../../Services/transactions/TransactionSummaryService.js'
import { summarySchema } from '../../schema/summarySchema.js';

export class TransactionSummaryController{
    async handle(req: Request, res: Response){
        const { month, year } = summarySchema.parse(req.query);
        const userId = req.userId;

        const transactionSummary = new TransactionSummaryService();
        const transaction = await transactionSummary.execute({userId, month, year});

        res.json(transaction);
    }
}