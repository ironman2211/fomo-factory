import Head from "next/head";
import DataTable from "./components/DataTable";
import Filters from "./components/Filters";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Real-Time Stock and Crypto </title>
        <meta name="description" content="Real-Time Stock and Crypto Data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start gap-5 px-5 py-10 md:p-16 text-gray-900 bg-gradient-to-b from-gray-100 to-white">
        <h1 className="font-bold text-lg md:text-2xl mb-6">Real-Time Stock and Crypto Data</h1>
        <Filters />
        <DataTable />
      </main>
    </div>
  );
}
