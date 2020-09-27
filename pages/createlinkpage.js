import Layout from '../components/layout'
import Head from 'next/head'
import CreateLink from '../components/createlink'


export default function CreateLinkPage() {
    return (
        <Layout>
            <Head>
                <title>Create Link! 👑</title>
            </Head>
            <CreateLink />

        </Layout>
    )
}