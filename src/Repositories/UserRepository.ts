import {promises as fs} from 'fs'
import path from 'path';
import { User } from '../Models/User';

const filePath  = path.join(__dirname, '../data/User.json')

export class UserRepository{
    async getAllUsers(): Promise<User[]>{
        const data = await fs.readFile(filePath,'utf-8')
        return JSON.parse(data) as User[];
    }

    async findUserByUsername(username:string): Promise<User | undefined>{
        const users = await this.getAllUsers();
        return users.find(user => user.username === username )
    }

    async saveUser(user:User): Promise<void>{
        const users = await this.getAllUsers();
        users.push(user);
        await fs.writeFile(filePath,JSON.stringify(users,null,2))
    }
}