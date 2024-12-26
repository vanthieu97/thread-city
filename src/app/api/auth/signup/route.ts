import {prisma} from '@/lib/db'
import bcrypt from 'bcrypt'
import {SignJWT} from 'jose'
import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'

export async function POST(request: Request) {
  try {
    const {username, password} = await request.json()

    // 1. Validate input
    if (!username || !password) {
      return NextResponse.json(
        {error: 'Missing required fields'},
        {status: 400},
      )
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{username}],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {error: 'Username or email already exists'},
        {status: 409},
      )
    }

    // 3. Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
      },
    })

    // 5. Create session token
    const token = await new SignJWT({username, id: user.id})
      .setProtectedHeader({alg: 'HS256'})
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    // 6. Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
