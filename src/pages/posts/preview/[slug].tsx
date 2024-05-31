import { GetStaticProps } from "next";

import { getPrismicClient } from "../../../services/prismic";
import { RichText } from "prismic-dom";
import Head from "next/head";
import styles from './post.module.scss';






interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostPreviewProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
          className={styles.postContent} 
          dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths=()=>{
  return{
    paths:[],
    fallback:'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params;
//@ts-ignore

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0,3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  };

  return {
    props: {
      post,
    },
  };
};
