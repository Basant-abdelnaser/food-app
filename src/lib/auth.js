import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Demo users — replace with a real DB in production
const USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@food.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "John Doe",
    email: "user@food.com",
    password: "user123",
    role: "user",
  },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const user = USERS.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password,
        );
        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
});
