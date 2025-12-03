"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

// Ye kya karta hai?

// ✔ NextAuth ka signIn() function call
// ✔ Google OAuth flow start
// ✔ user Google page par jata hai
// ✔ login successful → redirect to /account

// es function ka use  src/app/_component/SingInButton.js
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // "google" ye ek providers h man lo google ke alawa aur bhi provider hote jaise github.facebook etc to hame yha loop lagana padta aur jaise login ho jayenge vo hame redirect kar dega account page pr
}

// es function ka use  src/app/_component/SingOutButton.js
export async function signOutAction() {
  await signOut({ redirectTo: "/" }); // sign out hone ke bad root / route pr chala jayega agar root route pr home page h to vo show karega
}

// es function ka use  src/app/_component/UpdateProfileForm.js
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please Provide a valid nationalId.");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}
