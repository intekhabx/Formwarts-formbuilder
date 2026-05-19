import { trpc } from "~/trpc/client";

const useSignup = () => {
  // const {mutateAsync: createUserWithEmailAndPasswordAsync} = trpc.auth.createUserWithEmailAndPassword.useMutation();
  const {
    mutateAsync: createUserWithEmailAndPasswordAsync, 
    mutate: createUserWithEmailAndPassword, 
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status
  } = trpc.auth.createUserWithEmailAndPassword.useMutation();

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isIdle,
    isSuccess,
    status
  }
}

export default useSignup