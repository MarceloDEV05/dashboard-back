import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { ListCategoryController } from "./controllers/categories/ListCategoryController.js";

export const router = Router();

router.post('/users', new CreateUserController().handle);
router.post('/auth', new AuthUserController().handle);

router.get('/categories', new ListCategoryController().handle);