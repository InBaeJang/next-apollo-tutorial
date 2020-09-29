import { useState } from 'react';
import gql from 'graphql-tag'
import Link from './link'
import { client } from '../pages/_app'

const FEED_SEARCH_QUERY = gql`
    query FeedSearchQuery($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                url
                description
                createdAt
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`

export default function Search() {
    const [links, setLinks] = useState([]);
    const [filter, setFilter] = useState('');

    const _executeSearch = async () => {
        const result = await client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter },
        })
        const newLinks = result.data.feed.links
        setLinks(newLinks)
    }
    return (
        <div>
            <div>
                Search
                <input
                    type='text'
                    onChange={e => setFilter(e.target.value)}
                />
                <button onClick={() => _executeSearch()}>OK</button>
            </div>
            {links.map((link, index) => (
                <Link key={link.id} link={link} index={index} />
            ))}
        </div>
    )
}