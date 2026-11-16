import { TransactionType } from "../../generated/prisma/enums.js";
import { prisma } from "../../prisma/index.js";

interface CreateCategory {
  userId: string;
  id: string;
  name: string;
  type: TransactionType;
}

export class CreateCategoryService {
  async execute({ userId, id, name, type }: CreateCategory) {
    const categoryAlreadyExists = await prisma.categories.findFirst({
      where: {
        userId: userId,
        type: type,
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (categoryAlreadyExists) {
      throw new Error(
        "Voce ja possui uma categoria com esse nome para este tipo de movimentacao",
      );
    }

    const createCategory = await prisma.categories.create({
      data: {
        userId: userId,
        id: id,
        name: name,
        type: type,
      },
    });

    return createCategory;
  }
}
