import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";

export const router = Router();

router.post('/users', new CreateUserController().handle);