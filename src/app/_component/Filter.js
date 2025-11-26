"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter(); //ye router pr navigation ka hook h
  const pathname = usePathname(); // ye bhi ek hook h jo pathname nikalata h ex. cabins

  // yha active css class able dikhane ke liye URL per se capacity me jo aa rha h vo nikal rhe h ex. all, small,medium, large
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        All Cabins
      </Button>

      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        1&mdash;3 Guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        4&mdash;7 Guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        8&mdash;12 Guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`cursor-pointer px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-800 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}>
      {children}
    </button>
  );
}
export default Filter;
