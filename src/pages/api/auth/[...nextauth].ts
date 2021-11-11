import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      scope: "repo",
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session(session, userOrToken) {
      return Promise.resolve({
        ...session,
        accessToken: (userOrToken as JWT).accessToken as string,
      });
    },
  },
});
