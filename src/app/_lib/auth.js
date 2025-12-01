import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

//aap ko 2 example diya h koi bhi use kar sakte ho

// ----------------------------------------- ex1: ----------------------------------------------------
// lekin aapko v5 hona jaruri h npm install next-auth@beta / npm install next-auth@next 28/11/25 tak

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   callbacks: {
//     authorized({ auth, request }) {
//       return !!auth?.user;
//     },
//   },
// });

//ex2: version 5 me chalega
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },

  pages: { signIn: "/login" },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

//ex3:------------------------------- version 4 me chalega ----------------------------------------------------
// const handler = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
// });

// export { handler as GET, handler as POST, handler as auth };
