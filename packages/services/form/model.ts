import {z} from 'zod';

export const createFormInput = z.object({
  title: z.string().min(2).max(55).describe("title of the form"),
  description: z.string().max(300).optional().describe("description of the form"),
  createdBy: z.string().describe("creator of the form")
});

export type CreateFormInputType = z.infer<typeof createFormInput>;