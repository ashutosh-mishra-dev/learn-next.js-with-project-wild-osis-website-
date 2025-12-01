"use server";

import { signIn, signOut } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // "google" ye ek providers h man lo google ke alawa aur bhi provider hote jaise github.facebook etc to hame yha loop lagana padta aur jaise login ho jayenge vo hame redirect kar dega account page pr
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" }); // sign out hone ke bad root / route pr chala jayega agar root route pr home page h to vo show karega
}

// Ye kya karta hai?

// ✔ NextAuth ka signIn() function call
// ✔ Google OAuth flow start
// ✔ user Google page par jata hai
// ✔ login successful → redirect to /account
