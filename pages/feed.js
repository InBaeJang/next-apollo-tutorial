import Layout from '../components/layout'
import Head from 'next/head'
import LinkList from '../components/linklist'

export default function Feed() {
    return (
        <Layout>
            <Head>
                <title>Link Lisk! 🤩</title>
            </Head>
            <LinkList />
        </Layout>
    )
}