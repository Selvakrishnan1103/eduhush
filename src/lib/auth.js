import GoogleProvider from "next-auth/providers/google";
import { connectToMongoDb } from "./mongoDb";
import User from "@/models/User";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await connectToMongoDb();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({ email: user.email });
      }
      return true;
    },
    async jwt({ user, token }) {
      if (user) {
        await connectToMongoDb();
        const isAdminUser = await User.findOne({email : user.email})
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isAdmin = isAdminUser.isAdmin ;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        isAdmin : token.isAdmin,
      };
      return session;
    },
  },
};
