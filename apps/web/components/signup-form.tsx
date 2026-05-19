"use client"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

import { Input } from "~/components/ui/input"
import {useForm} from 'react-hook-form'
import { trpc } from "~/trpc/client"
import useSignup from "~/hooks/api/auth"

export function SignupForm({className,...props}: React.ComponentProps<"div">) {

  // abstract kr rhe hai - kisi ko nhi dikhana ai trpc use kr rha hun 
  // const {mutateAsync: createUserWithEmailAndPasswordAsync} = trpc.auth.createUserWithEmailAndPassword.useMutation();
  const {createUserWithEmailAndPasswordAsync} = useSignup();

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }});

  const onsubmit = async (data: FormData)=>{
    console.log(data)
    const {id} = await createUserWithEmailAndPasswordAsync({fullName: data.name, email: data.email, password: data.password})
    console.log(id);
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input {...register("name", {required: "name is required", minLength: {value: 2, message: "minimum 2 length"}})}  id="name" type="text" placeholder="John Doe" />
                {errors && <p>{errors.name?.message}</p>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email", {required: "email is required", maxLength: {value: 322, message: "322 character max"}})}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors && <p>{errors.email?.message}</p>}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input {...register("password", {required: "password is required", minLength: {value: 8, message: "minimum 8 length required"}})} id="password" type="password" />
                    {errors && <p>{errors.password?.message}</p>}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input {...register("confirmPassword", {required: "confirm-password is required", minLength: {value: 8, message: "minimum 8 length required"}})} id="confirm-password" type="password" />
                    {errors && <p>{errors.confirmPassword?.message}</p>}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
