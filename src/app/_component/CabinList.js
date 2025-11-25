import CabinCard from "@/app/_component/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList() {
  //here come cabin data from server
  // yha ham server component me kaam kar rhe hai to hame kisi bhi prakar ka thirparty library ya useEffect ka use karne ki jarurat nhi
  const cabins = await getCabins();
  noStore();

  if (!cabins.length) return null;

  return (
    <div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </div>
  );
}

export default CabinList;
