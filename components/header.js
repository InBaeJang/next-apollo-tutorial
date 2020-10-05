import layoutStyles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'
import { Row, Col } from 'antd';
import { message, Button } from 'antd';

import Link from 'next/link'
import { useRouter } from 'next/router'
import { AUTH_TOKEN } from '../lib/constants'
import { useState, useEffect } from 'react';

const name = 'InBader'

export default function Header({ home }) {
    const router = useRouter()
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        setAuthToken(window.localStorage.getItem(AUTH_TOKEN))
    });
    const warning = () => {
        message.warning('자네, 로그인을 잊지는 않았는가?');
    };

    return (
        <header>
            <Row justify="end">
                <Col span={4}>
                    <Link href="/feed">
                        <Button type="primary"><a>Feed</a></Button>
                    </Link>
                </Col>
                <Col span={4}>
                    {authToken ? (
                        <Link href="/createlinkpage">
                            <Button type="primary"><a>Create</a></Button>
                        </Link>
                    ) : (
                            <Button type="dashed" onClick={warning}>Create</Button>
                        )}
                </Col>
                <Col span={4}>
                    <Link href="/searchpage">
                        <Button type="primary"><a>Search</a></Button>
                    </Link>
                </Col>

                <Col span={4}>
                    <div>
                        {authToken ? (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault()
                                    window.localStorage.removeItem(AUTH_TOKEN)
                                    router.push('/')
                                }}
                            >logout
                            </Button>
                        ) : (
                                <Link href="/loginpage">
                                    <Button type="primary"><a>Login</a></Button>
                                </Link>
                            )}
                    </div>
                </Col>
            </Row>

            <br />
            <div className={layoutStyles.header}>
                {home ? (
                    <>
                        <img
                            src="/images/profile.jpg"
                            className={`${layoutStyles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                        <>
                            <Link href="/">
                                <a>
                                    <img
                                        src="/images/profile.jpg"
                                        className={`${layoutStyles.headerImage} ${utilStyles.borderCircle}`}
                                        alt={name}
                                    />
                                </a>
                            </Link>
                            <h2 className={utilStyles.headingLg}>
                                <Link href="/">
                                    <a className={utilStyles.colorInherit}>{name}</a>
                                </Link>
                            </h2>
                        </>
                    )}
            </div>
        </header>
    )
}