import express from 'express';
import { CreateUserController } from './controllers/user/CreateUserController.js';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get("/user", new CreateUserController().handle)

app.listen(port, () => {
    console.log(`Server running in http://localhost:${port}`)
})