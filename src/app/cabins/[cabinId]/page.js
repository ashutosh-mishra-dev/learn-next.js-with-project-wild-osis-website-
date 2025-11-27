import Cabin from "@/app/_component/Cabin";
import Reservation from "@/app/_component/Reservation";
import Spinner from "@/app/_component/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// ------------- static metaData -----------------
// export const metadata = {
//   title: "single Cabins",
//   description: "List of all resort cabins",
// };

// ------------- dynamic metaData -----------------
// method 1:
// export async function generateMetadata({ params }) {
//   const { cabinId } = await params;
//   const { name } = await getCabin(cabinId);
//   return { title: `Cabin ${name}` };
// }

// method 2:
export async function generateMetadata({ params }) {
  const { cabinId } = await params;
  const cabin = await getCabin(cabinId);

  return {
    title: `${cabin.name} | Cabin Details`,
    openGraph: {
      title: cabin.name,
      description: cabin.description,
      images: [cabin.image],
    },
  };
}

//this is use for build time
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  //console.log(ids);
  return ids;
}

export default async function Page({ params }) {
  //const cabin = await getCabin(params.cabinId); aap aisa direct use nhi kar sakte

  const { cabinId } = await params; // most importaint in next.js 16
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} cabin today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
