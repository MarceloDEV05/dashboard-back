import { TransactionType } from "../../generated/prisma/client.js";
import { prisma } from "../../prisma/index.js";

interface CreateTransaction{
    userId: string;
    title: string;
    amount: number;
    type: TransactionType;
    date: Date;
    categoryId: string;
}

export class CreateTransactionService{
    async execute(){

    }
}