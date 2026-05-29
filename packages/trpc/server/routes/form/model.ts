import {nullable, z} from "zod";

export const createFormInputModel = z.object({
  title: z.string().min(2).max(55).describe("title of the form"),
  description: z.string().max(300).optional().describe("description of the from")
})

export const createFormOutputModel = z.object({
  id: z.string().describe("id of the form"),
})



export const getAllFormsByUserIdInputModel = z.undefined();

export const getAllFormsByUserIdOutputModel = z.array(
  z.object({
    id: z.string().describe("UUID of the created form"),
    title: z.string().describe("Title of the form"),
    description: z.string().nullable().optional().describe("description of the form"),
    createdAt: z.date().nullable().describe("creation time of the form"),
    updatedAt: z.date().nullable().describe("updation time of the form")
  })
)