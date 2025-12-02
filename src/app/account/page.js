import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

//yha hamene Account name diya h function ka but ham yha kuch bhi name de sakte h ex. xxx() ,abc(), page() Sab sahi hai. Next.js ko koi fark nahi padta.
export default async function Account() {
  const session = await auth();
  console.log("session : ", session);

  const firstName = session.user.name.split(" ").at(0);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {firstName}
      </h2>
    </div>
  );
}
