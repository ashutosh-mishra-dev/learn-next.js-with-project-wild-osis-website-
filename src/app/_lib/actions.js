"use server";

import { signIn } from "./auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" }); // "google" ye ek providers h man lo google ke alawa aur bhi provider hote jaise github.facebook etc to hame yha loop lagana padta aur jaise login ho jayenge vo hame redirect kar dega account page pr
}
