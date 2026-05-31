import {z} from "zod";


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



// form field models
const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"]);

export const createFormFieldInputModel = z.object({
  label: z.string().max(100).describe("display label of the form field"),
  type: fieldTypeEnum.describe("type of the field"),
  formId: z.uuid().describe("UUID of the form this field belongs to"),
  placeholder: z.string().optional().describe("placholder text of the form field"),
  description: z.string().optional().describe("description of the form field"),
  isRequired: z.boolean().optional().default(false).describe("field is required or not"),
})

export const createFormFieldOutputModel = z.object({
  id: z.uuid().describe("UUID of the form field"),
  index: z.string().describe("index of the form field"),
  labelKey: z.string().describe("label key of the form field"),
})



export const updateFormFieldInputModel = z.object({
  fieldId: z.uuid().describe("UUID of the form this field belongs to"),
  label: z.string().max(100).optional().describe("updated display label"),
  type: fieldTypeEnum.optional().describe("updated type of the field"),
  placeholder: z.string().optional().nullable().describe("updated placholder text of the form field"),
  description: z.string().optional().nullable().describe("updated description of the form field"),
  isRequired: z.boolean().optional().describe("updated required flag"),
})

export const updateFormFieldOutputModel = z.object({
  id: z.uuid().describe("UUID of the updated form field"),
})



export const deleteFormFieldInputModel = z.object({
  fieldId: z.uuid().describe("UUID of the field")
})

export const deleteFormFieldOutputModel = z.object({
  id: z.uuid().describe("UUID of the deleted field")
})



export const getFormFieldInputModel = z.object({
  formId: z.uuid().describe("UUID of the form")
})

export const getFormFieldOutputModel = z.object({
  id: z.uuid().describe("UUID of the field"),
  label: z.string().describe("label of the form field"),
  labelKey: z.string().describe("label key of the field"),
  description: z.string().optional().nullable().describe("description of the field"),
  placeholder: z.string().optional().nullable().describe("placeholder of the form field"),
  isRequired: z.boolean().describe("required flag of the field"),
  type: fieldTypeEnum.describe("type of the field"),
  formId: z.uuid().nullable().describe("UUID of the form"), 
  index: z.string().describe("index of the form field"),
})