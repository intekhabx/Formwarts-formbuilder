import {z} from 'zod';


const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const createFormFieldInput = z.object({
  label: z.string().max(100).describe("display label of the form field"),
  type: fieldTypeEnum.describe("type of the field"),
  formId: z.uuid().describe("UUID of the form this field belongs to"),
  placeholder: z.string().optional().describe("placholder text of the form field"),
  description: z.string().optional().describe("description of the form field"),
  isRequired: z.boolean().optional().default(false).describe("field is required or not"),
})

export type CreateFormFieldInputType = z.infer<typeof createFormFieldInput>;


export const updateFormFieldInput = z.object({
  fieldId: z.uuid().describe("UUID of the form this field belongs to"),
  label: z.string().max(100).optional().describe("updated display label"),
  type: fieldTypeEnum.optional().describe("updated type of the field"),
  placeholder: z.string().optional().nullable().describe("updated placholder text of the form field"),
  description: z.string().optional().nullable().describe("updated description of the form field"),
  isRequired: z.boolean().optional().describe("updated required flag"),
})

export type UpdateFormFieldInputType = z.infer<typeof updateFormFieldInput>;



export const deleteFormFieldInput = z.object({
  fieldId: z.uuid().describe("UUID of the form field to delete")
})

export type DeleteFormFieldInputType = z.infer<typeof deleteFormFieldInput>;



export const getFormFieldInput = z.object({
  formId: z.uuid().describe("UUID of the form want to fetch")
})

export type GetFormFieldInputType = z.infer<typeof getFormFieldInput>;