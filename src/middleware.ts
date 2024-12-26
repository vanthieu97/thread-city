import {NextRequest, NextResponse} from 'next/server'

const middleware = (request: NextRequest) => {
  const {pathname} = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export default middleware

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
