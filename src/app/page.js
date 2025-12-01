import Image from "next/image";
import bgImage from "@/assets/bg.png";
import Link from "next/link";
//import fs from "fs";

export const runtime = "edge"; // by default node js server runtimes
function page() {
  // console.log("fs : ", fs); //here we only check default runtime is nodejs or edge runtime
  console.log("process :", process); // if you using runtime = "edge" the only found ansewer in console env
  return (
    <main className="mt-24">
      <Image
        src={bgImage}
        alt="Mountains and forests with two cabins"
        fill
        className="object-cover object-top"
        placeholder="blur"
        quality={80}
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all">
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}

export default page;
