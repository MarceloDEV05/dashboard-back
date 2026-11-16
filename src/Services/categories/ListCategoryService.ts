import { TransactionType } from "../../generated/prisma/enums.js";
import { prisma } from "../../prisma/index.js";

interface CategoryProps {
  type: TransactionType;
}

export class ListCategoryService {
  async execute({ type }: CategoryProps) {
    const categories = await prisma.categories.findMany({
      where: {
        type: type,
      },
    });

    return categories;
  }
}
