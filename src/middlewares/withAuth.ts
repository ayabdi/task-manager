import withAuth from "next-auth/middleware";


export default withAuth(
  function middleware(request) {
    // Check if there is any supported locale in the pathname
    console.log("LETS GO");
  },
  {
    pages: {
      signIn: "/login", // Redirect unauthenticated users to /login
    },
  }
);

export const config = {
  matcher: [
    "/:path*",
    "/tasks/:path*",
    "/team/:path*",
    "/sign/:path*",
    "/api/team/:path*",
  ],
};
