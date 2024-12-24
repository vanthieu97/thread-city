import {prisma} from '@/lib/db'
import {NextResponse} from 'next/server'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()

    return NextResponse.json({status: 'Database connected successfully!'})
  } catch (error) {
    return NextResponse.json(
      {error: 'Database connection failed'},
      {status: 500},
    )
  } finally {
    await prisma.$disconnect()
  }
}
