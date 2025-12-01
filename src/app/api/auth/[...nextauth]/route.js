export { GET, POST } from "@/app/_lib/auth";

//ye src/app/api/auth/[...nextauth]/route.js → NEXTAUTH ka main API route hota hai, jaha NextAuth ke GET/POST handlers run hote hain.

// NextAuth ka pura system GET aur POST par hi run hota hai:

// GET → Session fetch, callbacks, authorize check, config load

// POST → Login, logout, token refresh, provider redirect

// Next.js ka rule:
// App Router me har API endpoint ka GET/POST function export karna padta hai.

// “NextAuth ke GET/POST jo auth.js me bana diye,
// unhe yaha API route me forward kar do,
// taki Next.js unhe as actual API handlers use kare.”
