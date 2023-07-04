import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"

export const authOptions = {
   // Configure one or more authentication providers
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
   ],
   secret: process.env.SECRET,
}

export default NextAuth(authOptions)
