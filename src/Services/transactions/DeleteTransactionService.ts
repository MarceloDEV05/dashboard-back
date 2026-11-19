import { prisma } from "../../prisma/index.js";

interface DeleteTransaction{
    id: string;
    userId: string;
}

export class DeleteTransactionService{
    async execute({userId, id}: DeleteTransaction){
        const transaction = await prisma.transactions.findFirst({
            where: {
                id,
                userId
            }
        });

        if(!transaction){
            throw new Error("Transação não encontrada");
        };

        await prisma.transactions.delete({
            where: {id}
        });
    }
}