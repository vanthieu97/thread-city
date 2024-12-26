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
      return NextResponse.json({error: 'Missing credentials'}, {status: 400})
    }
    // 2. Get user from database
    const user = await prisma.user.findUnique({where: {username}})
    if (!user) {
      return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
    }

    // Verify the original password by encrypting stored hash with same timestamp
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
    }

    // 3. Create session token
    const token = await new SignJWT({username, id: user.id})
      .setProtectedHeader({alg: 'HS256'})
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    // 4. Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({success: true})
  } catch (error) {
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
