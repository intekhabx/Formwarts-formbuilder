import { userService } from "../../services";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { getAuthenticationCookie, setAuthenticationCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import { createUserWithEmailAndPasswordInputModel, createUserWithEmailAndPasswordOutputModel, getLoggedInUserInfoInputModel, getLoggedInUserInfoOutputModel, loginUserWithEmailAndPasswordInputModel, loginUserWithEmailAndPasswordOutputModel } from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/createUserWithEmailAndPassword"),
      tags: TAGS
    }
  })
  .input(createUserWithEmailAndPasswordInputModel)
  .output(createUserWithEmailAndPasswordOutputModel)
  .mutation(async ({input, ctx})=>{
    const {fullName, email, password} = input;
    const {id, token} = await userService.createUserWithEmailAndPassword({fullName, email, password});

    setAuthenticationCookie(ctx, token)

    return {id}
  }),


  loginUserWithEmailAndPassword: publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: "/loginUserWithEmailAndPassword",
      tags: TAGS
  }})
  .input(loginUserWithEmailAndPasswordInputModel)
  .output(loginUserWithEmailAndPasswordOutputModel)
  .mutation(async ({input, ctx})=>{
    const {email, password} = input;
    const {id, token} = await userService.loginUserWithEmailAndPassword({email, password});

    setAuthenticationCookie(ctx, token)

    return {
      id
    }
  }),
  

  getLoggedInUserInfo: authenticatedProcedure
  .meta({
    openapi: {
      method: "GET",
      path: "/getLoggedInUserInfo",
      tags: TAGS,
      protect: true
    }
  })
  .input(getLoggedInUserInfoInputModel)
  .output(getLoggedInUserInfoOutputModel)
  .query(async ({ctx}) => {

    const {email, fullName, id, profileImageUrl} = await userService.getUserInfoById(ctx.user.id);

    return{
      id, email, fullName, profileImageUrl
    }
  })

});
