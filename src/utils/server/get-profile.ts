'use server'

import {prisma} from '@/lib/db'
import getSession from './get-session'

const getProfile = async (username?: string): Promise<Profile | null> => {
  const session = await getSession()
  const searchUsername = username
    ? username.replace(/[@%40]/g, '')
    : session?.user.username

  if (!searchUsername) return null

  const user = await prisma.user.findUnique({
    where: {username: searchUsername},
  })

  if (!user) return null

  const {passwordHash, ...profile} = user
  return profile
}

export default getProfile
