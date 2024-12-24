'use server'

import {cookies} from 'next/headers'
import {jwtVerify} from 'jose'

const getSession = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return null

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
    )
    return {user: verified.payload as {id: string; username: string}}
  } catch {
    return null
  }
}

export default getSession
