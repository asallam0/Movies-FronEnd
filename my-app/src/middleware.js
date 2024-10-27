import { NextResponse } from 'next/server';

export function middleware(req) {
    const authCookie = req.cookies.get('auth'); // Access the auth cookie

    // Check if the cookie exists
    if (!authCookie) {
        return NextResponse.redirect(new URL('/Login', req.url)); // Redirect to login if not authenticated
    }

    let user;
    try {
        user = JSON.parse(authCookie.value); // Parse the cookie value
    } catch (error) {
        return NextResponse.redirect(new URL('/Login', req.url)); // Redirect if parsing fails
    }

    const { pathname } = req.nextUrl;

    // Admin access
    if (user.role === 1) {
        // Admin can access their profile, any user edit, and the admin page
        if (pathname.startsWith('/Profile/') || pathname.startsWith('/UserEdit/') || pathname.startsWith('/Admin')) {
            return NextResponse.next(); // Allow access for admins
        }
    }

    // Regular user access
    if (user.role === 0) {
        const userProfilePath = `/Profile/${user.id}`;
        const userEditPath = `/UserEdit/${user.id}`;
        
        // Allow access to own profile and edit page
        if (pathname === userProfilePath || pathname === userEditPath) {
            return NextResponse.next(); // Allow access to own profile and edit page
        }
        if (pathname.startsWith('/Movie')) {
           return NextResponse.next();

        }
        
    }

    // Redirect to 404 for any unauthorized access
    return NextResponse.redirect(new URL('/404', req.url));
}

// Define protected routes
export const config = {
    matcher: ['/Profile/:path*', '/UserEdit/:path*', '/Admin/:path*','/Movie/:path*'], // Define which routes the middleware should run on
};