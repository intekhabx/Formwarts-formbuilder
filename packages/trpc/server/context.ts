import type { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import {createCookieFactory, getCookieFactory, clearCookieFactory} from './utils/cookie'


interface TRPCUserCtx {
  id: string,
}
export interface TRPCContext {
  createCookie: ReturnType<typeof createCookieFactory>
  getCookie: ReturnType<typeof getCookieFactory>
  clearCookie: ReturnType<typeof clearCookieFactory>

  user?: TRPCUserCtx
}

export async function createContext({req, res}: CreateExpressContextOptions): Promise<TRPCContext> {
  const ctx: TRPCContext = {
    createCookie: createCookieFactory(res),
    getCookie: getCookieFactory(req),
    clearCookie: clearCookieFactory(res),
    user: undefined, //user ho v sakta h nhi v to by default undefined
  }
  return ctx
}
export type Context = Awaited<ReturnType<typeof createContext>>;
