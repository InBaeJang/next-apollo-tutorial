import { useState } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { useRouter } from 'next/router';
import { FEED_QUERY } from './linklist'

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            url
            description
        }
    }
`

export default function CreateLink() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    placeholder="A description for the link"
                /><br />
                <input
                    className="mb2"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <Mutation
                mutation={POST_MUTATION}
                variables={{ description, url }}
                onCompleted={() => router.push('/')}
                update={(store, { data: { post } }) => {
                    const data = store.readQuery({ query: FEED_QUERY })
                    data.feed.links.unshift(post)
                    store.writeQuery({
                        query: FEED_QUERY,
                        data
                    })
                }}
            >
                {postMutation => <button onClick={postMutation}>Submit</button>}
            </Mutation>
        </div>
    )
}
