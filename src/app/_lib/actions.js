"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

// Ye kya karta hai?

// ✔ NextAuth ka signIn() function call
// ✔ Google OAuth flow start
// ✔ user Google page par jata hai
// ✔ login successful → redirect to /account

//-------------------------- es function ka use  src/app/_component/SingInButton.js -------------------------------------
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // "google" ye ek providers h man lo google ke alawa aur bhi provider hote jaise github.facebook etc to hame yha loop lagana padta aur jaise login ho jayenge vo hame redirect kar dega account page pr
}

// es function ka use  src/app/_component/SingOutButton.js
export async function signOutAction() {
  await signOut({ redirectTo: "/" }); // sign out hone ke bad root / route pr chala jayega agar root route pr home page h to vo show karega
}

//------------------------- es function ka use  src/app/_component/ReservationForm.js ------------------------------
//*** agar aap bind() method ka use karke data la rheh hai (jaise ko=i hamne ReservationForm.js component me bind ka use kiya h form action me ) to hamesha ek bat ka dhyan rhe ki formData second position hoga aur bind wala method fist place pr hoga
export async function createBooking(bookingData, formData) {
  //  console.log("formData : ", formData);
  const session = await auth();
  if (!session) throw new Error("You Must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    tatalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  //console.log("newBooking : ", newBooking);
  const { error } = await supabase.from("bookings").insert([newBooking]);
  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`); // yha esne cache clear kar diya matlab booking hone ke bad date disable nhi ho rha tha to hone lga

  redirect("/cabins/thankyou"); //thankyou route pr jayega
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
export async function deleteBooking(bookingId) {
  //await new Promise((res) => setTimeout(res, 3000)); //yha useOptimastic ko check karne ke liye 3s ka delay kar rhe h.
  //throw new Error(); // yha ham simply check kr rhe hai agar data 3s me delete nhi hota to kya optimistic hook hamara data dubara show karayega ya nhi actually data show 3s ke baad hona chahiye agar successfully delete nhi hota to.
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

// ------------------- es function ka use  src/app/account/reservations/edit/[bookingId]/page.js--------------------------

export async function updateBooking(formData) {
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const bookingId = Number(formData.get("bookingId")); //ye hidden fild me set ki gyi id h

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to Update this booking.");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), //yha koi bhi user 1000 letter likh sakta h usse jya ye nhi lega sirf 1000 letter hi lega user chahe jitna bhi dal de
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error Handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  // // old next.js 14 me redirect lagane ke bad path redirect ho ja rha tha pr old value le rha tha es liye yha enone revalidatePath lagaya h but mere case me next.js 16 me aisa koi problem nhi h aap es version me revalidatePath lagao ya na lagao koi fark nhi padta sirf redirect se kam chal jayega
  //revalidatePath(`/account/reservations/edit/${bookingId}`);
  //revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}
