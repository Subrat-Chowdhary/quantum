import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // If user is not authenticated and trying to access protected routes
// ✅ Don't redirect login page to itself
if (!token) {
  if (pathname === '/admin/login' || pathname === '/library/login') {
    return NextResponse.next(); // allow access to login page
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/library')) {
    const loginUrl = pathname.startsWith('/admin') ? '/admin/login' : '/library/login';
    return NextResponse.redirect(new URL(loginUrl, req.url));
  }
}


    // If user is authenticated but accessing wrong role area
    if (token) {
      const userRole = token.role as string;
      
      // Admin trying to access library area
      if (userRole === 'admin' && pathname.startsWith('/library')) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      
      // Librarian trying to access admin area
      if (userRole === 'librarian' && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/library/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to login pages
        if (pathname === '/admin/login' || pathname === '/library/login') {
          return true;
        }
        
        // For protected routes, require authentication
        if (pathname.startsWith('/admin') || pathname.startsWith('/library')) {
          return !!token;
        }
        
        // Allow access to other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/library/:path*']
};