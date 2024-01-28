import GithubProvider from "next-auth/providers/github";
import { env } from "./env"; // Import the 'env' object from the 'process' module
import { AuthOptions, getServerSession} from "next-auth"; 
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 
import { prisma } from "./prisma";
import GoogleProvider from "next-auth/providers/google";// Import the 'PrismaAdapter' from the 'next-auth/adapters' module
import EmailProvider from "next-auth/providers/email";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
providers: [
    GithubProvider({
        clientId: env.GITHUB_ID,
        clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
        server: {
            host: env.EMAIL_SERVER_HOST,
            port: env.EMAIL_SERVER_PORT,
            auth: {
                user: env.EMAIL_SERVER_USER,
                pass: env.EMAIL_SERVER_PASSWORD,
            },
        },
        from: env.EMAIL_FROM,
    }) // Use the imported 'EmailProvider'
],
  callbacks: {
    session({ session, user }) {
      if (!session?.user) return session;
      session.user.id = user.id;
      return session;
    },
  },
};

export const getAuthSession =async () => {
    const session = await getServerSession(authOptions)
    return session
}
