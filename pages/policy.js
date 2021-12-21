import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Policies } from "../modules/Policies.jsx";

export default function Policy() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Policies</title>
        <meta name="description" content="Insurance COmpany" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Policies />
      </main>
    </div>
  );
}
