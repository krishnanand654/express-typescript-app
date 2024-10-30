import {Request, Response} from "express";
import { UserService } from "../Services/UserService";

const userService = new UserService();

export class UserController{
    async register(req: Request, res: Response){
        try{
            const newUser = await userService.registerUser(req.body);
            res.status(201).json(newUser);
        }catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(400).json({ error: "An unknown error occurred" });
            }
        }
    }

    async login(req: Request, res: Response){
        const {username, password} = req.body;

        const user = await userService.authenticateUser(username,password)

        if(user){
            res.status(200).json({message: 'Login successful',user})
        }else{
            res.status(401).json({message: 'Invalid credentials'})
        }
    }
}
