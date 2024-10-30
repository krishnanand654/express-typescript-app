import argon2 from 'argon2'
import { UserRepository } from '../Repositories/UserRepository';
import { User } from '../Models/User';

export class UserService{
    private userRepository = new UserRepository();

    async registerUser(userData: Omit<User, 'id'>):Promise<User>{
        const existingUser = await this.userRepository.findUserByUsername(userData.username);

        if(existingUser) throw new Error("User already exist")

        const hashedPassword  = await argon2.hash(userData.password);
        const newUser:User = {id:Date.now(), ...userData, password:hashedPassword}

        await this.userRepository.saveUser(newUser)
        return newUser
    }


    async authenticateUser(username:string, password:string): Promise<User | null>{
        const user = await this.userRepository.findUserByUsername(username);
        if(user && (await argon2.verify(user.password, password))){
            return user
        }
        
        return null;
    }
}



