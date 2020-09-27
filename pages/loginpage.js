import Layout from '../components/layout'
import Head from 'next/head'
import Login from '../components/login'


export default function LoginPage() {
    return (
        <Layout>
            <Head>
                <title>Please Login! 🥾</title>
            </Head>
            <Login />

        </Layout>
    )
}