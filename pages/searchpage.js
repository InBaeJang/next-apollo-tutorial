import Layout from '../components/layout'
import Head from 'next/head'
import Search from '../components/search'


export default function LoginPage() {
    return (
        <Layout>
            <Head>
                <title>Search Links! 🍭</title>
            </Head>
            <Search />

        </Layout>
    )
}