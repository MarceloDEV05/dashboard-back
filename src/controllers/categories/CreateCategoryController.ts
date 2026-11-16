import { Request, Response } from "express";
import { CreateCategoryService } from "../../Services/categories/CreateCategoryService.js";

export class CreateCategoryController{
    async handle(req: Request, res: Response){
        const userId = req.userId;

        const { name, type, id} = req.body;

        const createCategory = new CreateCategoryService();
        const category = await createCategory.execute({ userId, name, type, id });

        return res.json(category);
    }
}