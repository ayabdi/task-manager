import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/services/userService";
// Configuration options for NextAuth
export const authOptions: AuthOptions = {
  providers: [
    // Credentials provider for email and password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      
      // Function to authorize user credentials
      async authorize(credentials) {
        // Check for missing credentials
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          // Fetch user from the database using email
          const user = await getUserByEmail(credentials.email);
          if (!user) {
            return null; // User not found
          }

          // Verify the provided password against the stored hash
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            console.log('Invalid pass')
            return null; // Invalid password
          }

          // Return user object without sensitive information
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.log({ error }); // Log any errors
          return null; // Return null on error
        }
      },
    }),
  ],
  // Callbacks for session management
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        userId: token.sub, // Add userId to session
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
};

// Initialize NextAuth with the defined options
const handler = NextAuth(authOptions);

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
