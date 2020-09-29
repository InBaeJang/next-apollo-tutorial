import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AUTH_TOKEN } from '../lib/constants'
import { useState, useEffect } from 'react';

const name = 'InBader'
export const siteTitle = 'Next.js + Apollo Client'

export default function Layout({ children, home }) {
  const router = useRouter()
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    setAuthToken(window.localStorage.getItem(AUTH_TOKEN))
  });

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.2.1/css/tachyons.min.css" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>

        <Link href="/feed">
          <a>Feed</a>
        </Link>
        {authToken && (
          <Link href="/createlinkpage">
            <a>Create</a>
          </Link>)}
        <Link href="/searchpage">
          <a>Search</a>
        </Link>

        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="ml1 pointer black"
              onClick={(e) => {
                e.preventDefault()
                window.localStorage.removeItem(AUTH_TOKEN)
                router.push('/')
              }}
            >
              logout
            </div>
          ) : (
              <Link href="/loginpage">
                <a>login</a>
              </Link>
            )}
        </div>

        <br />
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
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
                    className={`${styles.headerImage} ${utilStyles.borderCircle}`}
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
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}