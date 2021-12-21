import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Policies } from "../modules/Policies.jsx";

export default function Policy() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Head>
        <title>Policies</title>
        <meta name="description" content="Insurance COmpany" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="lg:w-4/5 md:w-4/5 w-4/5">
        <Policies />
      </div>
    </div>
  );
}
