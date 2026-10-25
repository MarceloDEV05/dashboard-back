import { Request, Response } from "express";
import {CreateUserService} from '../../Services/user/CreateUserService.js'


export class CreateUserController {
    async handle(_: Request, res:Response){

            const req = {
                body: {
                    name: "Marcelo",
                    email: "marceloteste@teste.com",
                    password: "232323"
                }
            }

            const {name, email, password } = req.body;
    
            const createUserService = new CreateUserService()
            const user = await createUserService.execute({name, email, password})
            
            res.json(user)

        }
    }