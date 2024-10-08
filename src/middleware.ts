import { withAuth } from "next-auth/middleware";


export default withAuth(
  function middleware(req) {
    //console.log("Middleware hit:", req.nextauth?.token);
    // Additional middleware logic if needed
  },
  {
    pages: {
      signIn: "/login", // Redirect unauthenticated users to /login
    },
  }
);

export const config = {
  matcher: [ "/api/tasks/:path*", '/tasks/:path*', "/api/team/:path*"],
};