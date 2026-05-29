import db from "@repo/database";
import {formTable} from '@repo/database/models/form'
import { CreateFormInputType, createFormInput } from "./model";

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

}

export default FormService;