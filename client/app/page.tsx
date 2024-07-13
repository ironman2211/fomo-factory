'use client';
import { Provider } from "react-redux";
import { store } from "../app/store/store";
import Head from "next/head";
import DataTable from "./components/DataTable";
import Filters from "./components/Filters";

export default function Home() {
  return (
    <Provider store={store}>
      <div>
        <Head>
          <title>Real-Time Data</title>
          <meta name="description" content="Real-Time Stock and Crypto Data" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-5 md:p-20 text-gray-900 bg-gradient-to-b from-gray-100 to-white">
          <h1>Real-Time Data</h1>
          <Filters />
          <DataTable />
        </main>
      </div>
    </Provider>
  );
}
