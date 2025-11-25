/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true, //eska use ham esliye kar rhe server se image  aa rha vo static side me problem na de khas kar jaise niche output: "export", likha h es liye bhi ese use kiya gya
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sarzztxidxgnsbagvswl.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },

  reactCompiler: true,
  //output: "export", // ye production (npm run start) me nhi chalega sirf development mode me hi chalega(npm run dev)
};

export default nextConfig;
