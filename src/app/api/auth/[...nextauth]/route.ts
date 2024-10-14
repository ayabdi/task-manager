import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// Initialize NextAuth with the defined options
const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };