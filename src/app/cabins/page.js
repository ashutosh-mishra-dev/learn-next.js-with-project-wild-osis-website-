import { Suspense } from "react";
import CabinList from "../_component/CabinList";
import Spinner from "../_component/Spinner";

//--------- route level cache manage:  -----
// export const revalidate = 0;  // yha cache me data jayega hi nhi direct data changes dikhega
// export const revalidate = 20;  // agar aap ne backend me data change kiya to vo  cache me  20 second ke bad changes dikhega

export const metadata = {
  title: "Cabin",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to ashutosh mishra.
      </p>

      {/* yha suspense ke andar jo bhi data aayega vhi loading me jayega baki ka upar ya suspense ke bad ka data show hoga as static  */}
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
