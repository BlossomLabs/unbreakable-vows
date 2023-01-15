import Head from "next/head";
import Landing from "@/components/landing";
// import PreLaunch from "@/components/landing/prelaunch";
import styles from "../styles/Home.module.css";

export default function Home(props: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Unbreakable Vows</title>
        <meta name="description" content="promises and spells" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Landing />
      </main>
    </div>
  );
}
