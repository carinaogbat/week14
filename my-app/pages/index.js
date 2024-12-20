import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Layout from "../components/layout";
import { getSortedData, getCatData, getOwnerData, getContactData } from "../lib/data.js";
import Link from 'next/link';



// get static props
export async function getStaticProps() {
  const allData = await getSortedData();
  const allCats = await getCatData();
  const allOwners = await getOwnerData();
  const allContacts = await getContactData();
  return {
    props: { allData , allCats, allOwners, allContacts}
  };
}

// exports Home page component removed allData to populate my three endpoints instead
export default function Home( { allCats, allOwners, allContacts } ) {
  return (
    <>
      <Head>
        <title>Carinas Test App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout home>
      <h1>Hello from Carinas Cats</h1>
      <h2>Our Kitties (click to view)</h2>
      <div className="list-group">
        {allCats && allCats.map(
          ({id, name}) => (
            <Link key={id} href={`/cats/${id}`} className="list-group-item">
              {name}
            </Link>
          )
        )
        }
      </div>
      <div className="list-group">
        <h3>Kitty Owners</h3>
        {allOwners && allOwners.map(
          ({id, name}) => (
            <p key={id} className="list-group-item">
              {name}
            </p>
          )
        )
        }
      </div>

      <div className="list-group">
        <h4>Contacts:</h4>
        {allContacts && allContacts.map(
          ({id, name}) => (
            <p key={id}>
              {name}
            </p>
          )
        )
        }
      </div>

      </Layout>
    </>
  );
}
