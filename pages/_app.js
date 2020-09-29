import '../styles/global.css';
import '../styles/antd.less';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch';

import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from '../lib/constants'

const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    // uri: 'https://server.inbaedid.kro.kr',
    fetch: fetch
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default function MyApp({ Component, pageProps }) {

    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}