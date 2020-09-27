import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Link from './link'

const FEED_QUERY = gql`
    query {
        feed {
            id
            url
            description
            postedBy{
                name
            }
            votes{
                id
            }
        }
    }
`
export default function ContentsList() {

    return (
        <Query query={FEED_QUERY}>
            { ({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                const linksToRender = data.feed

                for (let key in linksToRender[0]) {
                    console.log("Attribute: " + key + ", value: " + linksToRender[0][key])
                }

                return (
                    <div>
                        {linksToRender.map((link, index) =>
                            <Link key={link.id}
                                link={link}
                                index={index}
                                postedBy={link.postedBy}
                                votes={link.votes}
                            />
                        )}
                    </div>
                )
            }}
        </Query>
    )
}