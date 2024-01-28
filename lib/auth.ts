import GithubProvider from "next-auth/providers/github";
import { env } from "./env"; // Import the 'env' object from the 'process' module
import { AuthOptions, getServerSession} from "next-auth"; 
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 
import { prisma } from "./prisma";
// Import the 'PrismaAdapter' from the 'next-auth/adapters' module
export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
        }),
        // ...add more providers here
    ],
    callbacks: {
        session({session, user}) {
            if (!session?.user) return session
            session.user.id = user.id
            return session
}}}

export const getAuthSession =async () => {
    const session = await getServerSession(authOptions)
    return session
}
