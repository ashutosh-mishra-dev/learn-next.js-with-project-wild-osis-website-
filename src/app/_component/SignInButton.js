import { signInAction } from "@/app/_lib/actions";

/*
hamne yha button pr onclick ka use na karke form action ka use kiya beacouse es page ko server component banana tha agar ham onClick ka use karte to ye client componet ban jata

pura process :

SignInButton → signInAction() → Google Login →
Google Redirect → /api/auth/callback/google →
NextAuth session create →
User goes to /account →
middleware(auth) checks session →
Allowed → /account page render
Denied → redirect to /login

*/

function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
