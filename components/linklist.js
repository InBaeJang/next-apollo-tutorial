import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './link'

export const FEED_QUERY = gql`
    query{
        feed {
            count
            links {
                id
                createdAt
                url
                description
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

export default function ContentsList() {
    // const _updateCacheAfterVote = (store, createVote, linkId) => {
    //     const data = store.readQuery({ query: FEED_QUERY })

    //     const votedLink = data.feed.links.find(link => link.id === linkId)
    //     votedLink.votes = createVote.link.votes

    //     store.writeQuery({ query: FEED_QUERY, data })
    // }
    return (
        <Query query={FEED_QUERY}>
            { ({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                const linksToRender = data.feed.links

                return (
                    <div>
                        {linksToRender.map((link, index) =>
                            <Link key={link.id}
                                link={link}
                                index={index}
                            // updateStoreAfterVote={_updateCacheAfterVote()}
                            />
                        )}
                    </div>
                )
            }}
        </Query>
    )
}