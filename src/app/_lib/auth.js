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

//Auth setup :
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  //callback kaam hai:Route ko access karne se pehle check karo user logged-in hai ya nahi
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },

  // pages me ham  Default NextAuth sign-in page mat dikhana Mera khud ka /login page use karna
  pages: { signIn: "/login" },
};

export const {
  auth, //esse yaha se direct session milta hai (no need for getServerSession).
  signIn, //Login trigger karne ke liye
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
