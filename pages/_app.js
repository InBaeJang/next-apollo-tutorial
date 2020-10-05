import '../styles/global.css';
import '../styles/antd.less';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch';

import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from '../lib/constants'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

let globalToken
const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    globalToken = token
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// const wsLink = new WebSocketLink({
//     uri: `ws://localhost:4000`,
//     options: {
//         reconnect: true,
//         connectionParams: {
//             authToken: globalToken,
//         }
//     }
// })

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    // uri: 'https://server.inbaedid.kro.kr',
    fetch: fetch
})

// const link = split(
//     ({ query }) => {
//         const { kind, operation } = getMainDefinition(query)
//         return kind === 'OperationDefinition' && operation === 'subscription'
//     },
//     wsLink,
//     authLink.concat(httpLink)
// )

export const client = new ApolloClient({
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