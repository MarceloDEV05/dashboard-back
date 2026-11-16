import { Request, Response } from "express";
import { ListCategoryService } from "../../Services/categories/ListCategoryService.js";
import { schema } from "../../schema/categorySchema.js";

export class ListCategoryController {
  async handle(req: Request, res: Response) {
    const { type } = schema.parse(req.query);

    const listCategory = new ListCategoryService();
    const categories = await listCategory.execute({ type });

    return res.json(categories);
  }

}
