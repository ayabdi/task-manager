import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    //console.log("Middleware hit:", req.nextauth?.token);
    // Additional middleware logic if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        //console.log("Authorization check:", token);
        // Allow access only if the user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Redirect unauthenticated users to /login
    },
  }
);

export const config = {
  matcher: [ "/api/tasks/:path*", '/tasks/:path*'],
};