interface UserProps {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService{
    async execute({ name, email, password }: UserProps){
        const user = {
            name: name,
            email: email,
            password: password
        }

        return user
    }
}