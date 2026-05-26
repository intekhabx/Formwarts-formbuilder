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
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { useLogin } from "~/hooks/api/auth"


interface FormData {
  email: string,
  password: string,
}

export function LoginForm({className, ...props}: React.ComponentProps<"div">) {

  const {loginUserWithEmailAndPasswordAsync} = useLogin();

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({defaultValues: {
    email: "",
    password: ""
  }})

  const onsubmit = async (data: FormData) =>{
    const {id} = await loginUserWithEmailAndPasswordAsync({email: data.email, password: data.password})
    console.log(id)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onsubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email", {required: "email is required", maxLength: {value: 322, message: "email should be less than 322"}})}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors && <p>{errors.email?.message}</p>}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input {...register("password", {required: "password is required", minLength: {value: 8, message: "minimum 8 character required"}})} id="password" type="password" required />
                {errors && <p>{errors.password?.message}</p>}
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
