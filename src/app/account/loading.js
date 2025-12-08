// wow next.js me loading aaply karna bahut hi jyada easy h bas app folder ke root me loading.js file likha
//aur simple ye component banaya apne aap jaha jarurat padi ex cabin me ham server se data fetch kra rhe h
// kuch second delay ho rha tha to delay ki jagah bina kuch kiye hamne jo es componenet se p tag (LOADING DATA...)
// return karwaya h vo auomatic show hone laga means bina kuch kiye loading show ho gya sirf loadong.js
//  file ko app ke root me likhane se amazing...
// most important sare componet aur sare route ke liye kaam karega chahe jitna deep route ya componet ho sab
//  ke liye automatic loading show hoga ex //http://localhost:3000/cabins/showCabin/123

import Spinner from "@/app/_component/Spinner";

function Loading() {
  return <Spinner />;
}

export default Loading;
