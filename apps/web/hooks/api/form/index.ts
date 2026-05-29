import { trpc } from "~/trpc/client"

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const {mutate: createForm, mutateAsync: createFormAsync, error, failureCount, isError, isIdle, isSuccess, status} = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.invalidate()
    }
    });

  return {
    createForm, createFormAsync, error, failureCount, isError, isIdle, isSuccess, status
  }
}


export const useGetAllForms = () => {
  const {data: forms, error, isFetched, isFetching, isLoading, status} = trpc.form.getAllFormsByUserId.useQuery();

  return {
    forms,
    error,
    isFetched,
    isFetching,
    isLoading,
    status
  }
}