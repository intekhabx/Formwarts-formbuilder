import crypto from 'crypto';
import db, { eq } from "../../database";
import {usersTable} from '@repo/database/models/user';
import { createUserWithEmailAndPasswordInput, createUserWithEmailAndPasswordInputType, jwtTokenPayload, jwtTokenPayloadType, loginUserWithEmailAndPasswordInput, loginUserWithEmailAndPasswordInputType } from "./model";
import * as JWT from 'jsonwebtoken';
import { env } from '../env';


class UserService {

  private async getUserWithEmail(email: string){
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if(!user || user.length === 0) return null;
    return user[0];
  }

  private generateUserToken = async (payload: jwtTokenPayloadType)=>{
    const {id} = await jwtTokenPayload.parseAsync(payload);
    const token = JWT.sign({id}, env.JWT_SECRET)
    return {token}
  }

  private generateHash(salt: string, password: string){
    return crypto.createHmac('sha256', salt).update(password).digest("hex")
  }

  public async createUserWithEmailAndPassword(payload: createUserWithEmailAndPasswordInputType){
    // step:1 - extract payload data
    const {fullName, email, password} = await createUserWithEmailAndPasswordInput.parseAsync(payload);

    // step:2 - check user is already registered or not
    const existringUser = await this.getUserWithEmail(email);
    if(existringUser){
      throw new Error(`user with this email ${email} already registered`);
    }

    // step:3 - create salt and hash user password
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = await this.generateHash(salt, password)

    // step:4 - create user in DB
    const insertedUser = await db.insert(usersTable).values({
      fullName,
      email,
      password: hash,
      salt
    }).returning({ id: usersTable.id})
    
    if(!insertedUser || insertedUser.length === 0 || !insertedUser[0]?.id){
      throw new Error("something went wrong while creating user in DB")
    }

    const userId = insertedUser[0].id
    const {token} =await this.generateUserToken({id: userId})

    return {
      id: userId,
      token
    }
  }


  public async loginUserWithEmailAndPassword(payload: loginUserWithEmailAndPasswordInputType){
    // step:1 - extract payload data
    const {email, password} = await loginUserWithEmailAndPasswordInput.parseAsync(payload);

    // step:2 - find user with email
    const existingUser = await this.getUserWithEmail(email);
    if(!existingUser) throw new Error(`user with email ${email} doesn't exist`);

    // step:3 - if salt and password is missing in existing user (means login with authO)
    if(!existingUser.salt || !existingUser.password){
      throw new Error("invalid authentication method")
    }

    // step:4 - compare user password
    const hash = this.generateHash(existingUser.salt, password);
    if(hash !== existingUser.password){
      throw new Error("invalid user credientials");
    }

    // step:5 - generate token
    const {token} = await this.generateUserToken({id: existingUser.id})

    return {
      id: existingUser.id,
      token,
    }
  }
}

export default UserService;
