import React from "react";
import styles from "./home.module.scss";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';


interface HomeProps {
  product: {
    priceid: string;
    amount: string;
  }
}

const Home = ({ product }: HomeProps) => {
  return (
    <>
      <Head>
    
        <title>Home | Ig.News</title>
       
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} per month</span>
          </p>
          <SubscribeButton priceId={product.priceid} />
          <p className={styles.developer_credit}> Site desenvolvido por  <a href="https://www.linkedin.com/in/thaleson-silva-9298a0296/"> Thaleson silva </a> </p>
        </section>
        <img className={styles.imggirl} src="/images/Mulher.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1PLCbJJa0wr5RduJRdsdssi7');

  const product = {
    priceid: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

export default Home;
