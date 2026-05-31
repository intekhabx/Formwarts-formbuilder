import { formFieldService, formService } from "../../services";
import { authenticatedProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormFieldInputModel, createFormFieldOutputModel, createFormInputModel, createFormOutputModel, deleteFormFieldInputModel, deleteFormFieldOutputModel, getAllFormsByUserIdInputModel, getAllFormsByUserIdOutputModel, getFormFieldInputModel, getFormFieldOutputModel, updateFormFieldInputModel, updateFormFieldOutputModel } from "./model";


const TAGS = ["Form"];
const getPath = generatePath("/form");

export const formRouter = router({
  createForm: authenticatedProcedure.meta({
    openapi: {
      method: "POST",
      path: getPath("/createForm"),
      tags: TAGS,
      protect: true
    }
  })
  .input(createFormInputModel)
  .output(createFormOutputModel)
  .mutation( async ({input, ctx})=>{
    const {title, description} = input;

    const {id} = await formService.createForm({title, description, createdBy: ctx.user.id});

    return {id}
  }),


  getAllFormsByUserId: authenticatedProcedure.meta({
    openapi: {
      method: "GET",
      path: getPath("/listForms"),
      tags: TAGS,
      protect: true
    }
  })
  .input(getAllFormsByUserIdInputModel)
  .output(getAllFormsByUserIdOutputModel)
  .query( async ({ctx}) => {

    const forms = await formService.getAllFormsByUserId({userId: ctx.user?.id})

    return forms;
  }),



  // form field procedures
  createFormField: authenticatedProcedure.meta({
    openapi: {
      method: "POST",
      path: getPath('/createField'),
      tags: TAGS,
      protect: true,
    }
  })
  .input(createFormFieldInputModel)
  .output(createFormFieldOutputModel)
  .mutation(async ({input, ctx}) => {
    const {formId, isRequired, label, type, description, placeholder} = input;

    const {id, index, labelKey} = await formFieldService.createFormField({formId, isRequired, label, type, description, placeholder});

    return {id, index, labelKey}
  }),


  updateFormField: authenticatedProcedure.meta({
    openapi: {
      method: "PATCH",
      path: getPath("/updateField"),
      tags: TAGS,
      protect: true,
    }
  })
  .input(updateFormFieldInputModel)
  .output(updateFormFieldOutputModel)
  .mutation( async ({input, ctx}) => {
    const {fieldId, description, isRequired, label, placeholder, type} = input;

    const {id} = await formFieldService.updateFormField({fieldId, description, isRequired, label, placeholder, type});

    return {id}
  }),


  deleteFormField: authenticatedProcedure.meta({
    openapi: {
      method: "DELETE",
      path: getPath("/deleteField"),
      tags: TAGS,
      protect: true,
    }
  })
  .input(deleteFormFieldInputModel)
  .output(deleteFormFieldOutputModel)
  .mutation(async ({input, ctx}) => {
    const {fieldId} = input;

    const {id} = await formFieldService.deleteFormField({fieldId});
    return {id}
  }),


  getFormField: authenticatedProcedure.meta({
    openapi: {
      method: "POST",
      path: getPath("/getField"),
      tags: TAGS,
      protect: true,
    }
  })
  .input(getFormFieldInputModel)
  .output(getFormFieldOutputModel)
  .mutation(async ({input}) => {
    // const {formId} = input;

    const {form} = await formFieldService.getFormField({formId: input.formId});
    return form;
  })

})