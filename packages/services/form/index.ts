import db, { eq } from "@repo/database";
import {formTable} from '@repo/database/models/form'
import { CreateFormInputType, GetAllFormsByUserIdInputType, createFormInput, getAllFormsByUserIdInput } from "./model";

class FormService {

  public async createForm(payload: CreateFormInputType) {
    const {createdBy, description, title} = await createFormInput.parseAsync(payload);

    const createdForm = await db.insert(formTable).values({
      title,
      description,
      createdBy
    }).returning({id: formTable.id})

    if(!createdForm || createdForm.length === 0 || !createdForm[0]?.id){
      throw new Error("something went wrong while creating the form")
    }

    return {
      id: createdForm[0]?.id
    }
  }



  public async getAllFormsByUserId(payload: GetAllFormsByUserIdInputType){
    const {userId} = await getAllFormsByUserIdInput.parseAsync(payload);

    const forms = await db.select({
      id: formTable.id,
      title: formTable.title,
      description: formTable.description,
      createdAt: formTable.createdAt,
      updatedAt: formTable.updatedAt
    })
    .from(formTable).where(eq(formTable.createdBy, userId))

    return forms;
  }

}

export default FormService;