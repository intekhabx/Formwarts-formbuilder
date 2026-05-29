import {z} from "zod";

export const createFormInputModel = z.object({
  title: z.string().min(2).max(55).describe("title of the form"),
  description: z.string().max(300).optional().describe("description of the from")
})

export const createFormOutputModel = z.object({
  id: z.string().describe("id of the form"),
})