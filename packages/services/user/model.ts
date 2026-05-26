import {email, z} from 'zod';

export const createUserWithEmailAndPasswordInput = z.object({
  fullName: z.string().min(2).max(95).describe("name of the user"),
  email: z.email().max(322).describe("email of the user"),
  password: z.string().min(8).max(66).describe("password of the user"),
})

export type createUserWithEmailAndPasswordInputType = z.infer<typeof createUserWithEmailAndPasswordInput>;


export const loginUserWithEmailAndPasswordInput = z.object({
  email: z.email().max(322).lowercase().describe("email of the user"),
  password: z.string().min(8).max(66).describe("password of the user")
})

export type loginUserWithEmailAndPasswordInputType = z.infer<typeof loginUserWithEmailAndPasswordInput>


export const jwtTokenPayload = z.object({
  id: z.string().describe("token of the user")
})

export type jwtTokenPayloadType = z.infer<typeof jwtTokenPayload>

