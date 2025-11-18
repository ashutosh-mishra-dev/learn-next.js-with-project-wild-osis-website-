export default async function Page() {
  // ye ek server component hai kyuki next.js me by default jitne bhi component bante hai vo server component hote h
  // aur yha ham direct  data fetch kar rhe hai bina useEffect ya kisi third party library ke.

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  //console.log(data);
  return (
    <div>
      <h1>Cabin Page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
