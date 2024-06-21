import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { compare } from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize: async (credentials) => {
        // Logic to look up the user from the credentials supplied
        await connectMongoDB();
        const user = await User.findOne({ uname: credentials.username });
        if (!user) {
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (isValid &&  credentials.username === user.uname) {
          return {
            id: user._id.toString(),  // Ensure ID is included and converted to string
            name: user.name,
            uname: user.uname,
            sex: user.sex,
            dateOfBirth: user.dateOfBirth
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.uname = user.uname;
        token.name = user.name;
        token.sex = user.sex;
        token.dateOfBirth = user.dateOfBirth;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.uname = token.uname;
        session.user.name = token.name;
        session.user.sex = token.sex;
        session.user.dateOfBirth = token.dateOfBirth;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
