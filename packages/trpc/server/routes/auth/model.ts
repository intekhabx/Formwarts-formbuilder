import {z} from 'zod';


export const createUserWithEmailAndPasswordInputModel = z.object({
  fullName: z.string().min(2).max(95).describe("name of the user"),
  email: z.email().max(95).describe("email of the user"),
  password: z.string().min(8).max(66).describe("password of the user"),
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("id of the user"),
})