"use client"

import React, { useState } from 'react'
import {useForm} from 'react-hook-form';
import { useCreateForm } from '~/hooks/api/form';


const Forms = () => {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={()=> setIsVisible(!isVisible)}
      className='bg-slate-100 cursor-pointer text-black '>Create Form</button>
      {isVisible && <CreateFormPopUppage/>}
    </div>
  )
}

export default Forms;




interface FormData {
  title: string,
  description: string
}

const CreateFormPopUppage = () => {

  const {createFormAsync} = useCreateForm();

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {
    title: "",
    description: ""
  }})

  const onsubmit = async (payload: FormData) => {
    const {id} = await createFormAsync({
      title: payload.title,
      description: payload.description
    });

    console.log("Form created successfully with id",id);

  }

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}
      className='flex flex-col justify-center items-center bg-zinc-700 w-fit p-10 rounded-md gap-5'
      >
        <label>
          <input {...register("title", {required: "title is required", minLength: {value: 2, message: "minimum length should be 2"}, maxLength: {value: 55, message: "maximum length should be 55"}})} type="text" name='title' placeholder='Enter title'
          className='w-96 py-5 px-10' />
          {errors && <p className='text-red-600'>{errors.title?.message}</p>}
        </label>
        <label>
          <input {...register("description", {maxLength: {value: 300, message: "maximum length should be 300"}})} type="text" name='description' placeholder='Enter descriptioj'
          className='w-96 py-5 px-10' />
          {errors && <p>{errors.description?.message}</p>}
        </label>

        <button className='bg-yellow-800 py-5 px-10 rounded-sm cursor-pointer' type='submit'>Create</button>
      </form>
    </div>
  )
}