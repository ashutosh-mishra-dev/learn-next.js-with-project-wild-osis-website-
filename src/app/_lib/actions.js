"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

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

//------------------------- es function ka use  src/app/_component/UpdateProfileForm.js ------------------------------
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please Provide a valid nationalId.");

  const updateData = { nationality, countryFlag, nationalID };

  // delay 2s
  //await new Promise((res) => setTimeout(res, 2000));

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

/*
// hamne ese tab ke liye use kiya tha jab updateProfileForm component ko force fully render karna tha
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updateData = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
  return { success: true };
}
*/
// --------------------------------------------------------------------------------------------------------------

// es function ka use  src/app/_component/UpdateProfileForm.js
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  //----------------------------------------------------------------------------
  // protected code becouse browser se koi bhi delete kar sakta tha dekhana h to learn_next project folder ke root me browserDeleteAsHacker file dekho.
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id); //yha jo guestne book kiya vohi bookings milengi

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking.");
  //----------------------------------------------------------------------------

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservations");
}
