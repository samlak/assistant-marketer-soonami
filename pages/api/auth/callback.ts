import { NextApiRequest, NextApiResponse } from 'next'
import { type CookieOptions, createServerClient, serialize, parse } from '@supabase/ssr'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req
  const code = query.code as string | undefined
  const next = (query.next as string | undefined) ?? '/'

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[name]
          },
          set(name: string, value: string, options: CookieOptions) {
            res.appendHeader('Set-Cookie', serialize(name, value, options))
          },
          remove(name: string, options: CookieOptions) {
            res.appendHeader('Set-Cookie', serialize(name, '', options))
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      res.redirect(next)

      return
    }
  }
  res.redirect('/auth/auth-code-error')
}
