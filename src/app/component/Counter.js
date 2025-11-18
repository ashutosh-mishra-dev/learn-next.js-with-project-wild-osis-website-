"use client";

// "use client" likhate hi yah component client component ho jata hai.
//use client agar ham na likhe to ye by default server component hi rahega aur server component me hooks use ham nhi kar sakte.
import { useState } from "react";

// ham yha server se users props ke through data leke aa rhe h es client componet me
function Counter({ users }) {
  const [count, setCount] = useState(0);
  //console.log(users);
  return (
    <div>
      <p>There {users.length} are Users</p>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
