import {NextResponse} from 'next/server'
import {prisma} from '@/lib/db'
import getSession from '@/utils/server/get-session'

export async function PUT(request: Request) {
  try {
    const session = await getSession()

    if (!session?.user?.username) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }

    const data = await request.json()

    const updatedUser = await prisma.user.update({
      where: {
        username: session.user.username,
      },
      data: {
        name: data.name,
        bio: data.bio,
        link: data.link,
        avatar: data.avatar,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({error: 'Failed to update profile'}, {status: 500})
  }
}
