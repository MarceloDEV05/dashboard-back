import { prisma } from "../../prisma/index.js";
import { hash } from "bcryptjs";

interface UserProps {
    name: string;
    email: string;
    password: string;
};

export class CreateUserService{
    async execute({ name, email, password }: UserProps){


        if(!email || email === ""){
            throw new Error("Email invalido")
        }

        const userExists = await prisma.users.findFirst({
            where: {
                email: email
            }
        })

        if(userExists){
            throw new Error("Ja existe um usuário com este cadastro")
        }

        const encryptedPassword = await hash(password, 8);

     
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: encryptedPassword,
                
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user;
    };
};