import { useState, useEffect } from 'react';
import { AUTH_TOKEN } from '../lib/constants'

export default function Link({ link, index }) {
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        setAuthToken(window.localStorage.getItem(AUTH_TOKEN))
    });

    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{index + 1}.</span>
                {authToken && (
                    <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {link.description} ({link.url})
                </div>
                <div className="f6 lh-copy gray">
                    {link.votes.length} votes | by{' '}
                    {link.postedBy
                        ? link.postedBy.name
                        : 'Unknown'}{' '}
                    {/* {timeDifferenceForDate(link.createdAt)} */}
                </div>
            </div>
        </div>
    )
}