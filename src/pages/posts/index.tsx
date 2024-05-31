import { GetStaticProps } from 'next';
import styles from './styles.module.scss';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import * as prismic from '@prismicio/client';
import { RichText } from 'prismic-dom'
import Link from 'next/link';

type Postss = {
    slug: string;
    title: string;
    excerpt:string;
    updatedAt: string;
};

interface PostProps {
    posts: Postss[]
}


export default function Posts({ posts   }: PostProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post =>(
                        <Link href={`/posts/${post.slug}`} legacyBehavior>
                            <a key={post.slug }>
                            <time >{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                         
                            </a>
                        </Link> 

                    ))}
                   
                </div>
            </main>
        </>
    );
}



export const getStaticProps: GetStaticProps = async () => {
    const prismicClient = getPrismicClient();

    const response = await prismicClient.get({
        predicates: [
            prismic.predicate.at('document.type', 'publication'),
        ],
        fetchLinks: ['publication.title', 'publication.content'],
        pageSize: 100,
    });

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find((content: { type: string; }) => content.type == 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: {
            posts,
        },
    };
};
