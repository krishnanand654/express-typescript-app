import express from "express";
import { UserController } from "../Controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.post('/register', (req, res)=> userController.register(req,res));
router.post('/login', (req, res)=> userController.login(req,res));

export default router;
