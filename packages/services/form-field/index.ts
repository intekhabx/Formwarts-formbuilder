import db, { eq, max } from "@repo/database";
import {formFieldTable} from '@repo/database/models/form-field'
import { createFormFieldInput, CreateFormFieldInputType, deleteFormFieldInput, DeleteFormFieldInputType, getFormFieldInput, GetFormFieldInputType, updateFormFieldInput, UpdateFormFieldInputType } from "./model";



function makeLabelKey(label: string): string {
  return label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, '');
}

export default class FormFieldService {

  //fractional indexing
  private async getNextIndex(formId: string): Promise<string>{
    const result = await db.select({maxIndex: max(formFieldTable.index)}).from(formFieldTable).where(eq(formFieldTable.formId, formId));

    const current = result[0]?.maxIndex;
    const next = current ? parseFloat(current) + 1 : 1;
    return next.toFixed(2);
  }



  public async createFormField(payload: CreateFormFieldInputType){
    const {formId, isRequired, label, type, description, placeholder} = await createFormFieldInput.parseAsync(payload);

    const labelKey = makeLabelKey(label);
    const index = await this.getNextIndex(formId);

    const result = await db.insert(formFieldTable).values({
      label,
      labelKey,
      index,
      type,
      formId,
      description,
      isRequired,
      placeholder,
    }).returning({id: formFieldTable.id})

    if(!result || result.length === 0 || !result[0]?.id){
      throw new Error("something went wrong while creating the field");
    }

    return {id: result[0].id, index, labelKey}
  }


  public async updateFormField(payload: UpdateFormFieldInputType){
    const {fieldId, ...updates} = await updateFormFieldInput.parseAsync(payload);

    const patch: Partial<typeof formFieldTable.$inferInsert> = {};

    if(updates.label !== undefined) patch.label = updates.label;
    if(updates.isRequired !== undefined) patch.isRequired = updates.isRequired;
    if(updates.type !== undefined) patch.type = updates.type;
    if('description' in updates) patch.description = updates.description ?? null;
    if('placeholder' in updates) patch.placeholder = updates.placeholder ?? null;

    if(Object.keys(patch).length === 0){
      throw new Error("no fields provided to update");
    }

    const result = await db.update(formFieldTable).set(patch)
                  .where(eq(formFieldTable.id, fieldId)).returning({id: formFieldTable.id});

    if(!result || result.length === 0 ){
      throw new Error(`field with id ${fieldId} doesn't exist`);
    }

    return {id: result[0]!.id}
  }


  public async deleteFormField(payload: DeleteFormFieldInputType){
    const {fieldId} = await deleteFormFieldInput.parseAsync(payload);

    const result = await db.delete(formFieldTable).where(eq(formFieldTable.id, fieldId)).returning({id: formFieldTable.id});

    if(!result || result.length === 0){
      throw new Error(`field with id ${fieldId} doesn't exist`);
    }

    return {id: result[0]!.id}
  }


  public async getFormField(payload: GetFormFieldInputType){
    const {formId} = await getFormFieldInput.parseAsync(payload);

    const result = await db.select({
      id: formFieldTable.id,
      label: formFieldTable.label,
      labelKey: formFieldTable.labelKey,
      description: formFieldTable.description,
      type: formFieldTable.type,
      isRequired: formFieldTable.isRequired,
      placeholder: formFieldTable.placeholder,
      formId: formFieldTable.formId,
      index: formFieldTable.index
    }).from(formFieldTable).where(eq(formFieldTable.formId, formId));

    if(!result || result.length === 0){
      throw new Error(`form with this id ${formId} doesn't exist`)
    }

    return {form: result[0]!}
  }

}