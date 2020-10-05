import Head from 'next/head'
import layoutStyles from '../styles/layout.module.css'
import Link from 'next/link'
import Header from './header'

export const siteTitle = 'Next.js + Apollo Client'

export default function Layout({ children, home }) {
  return (
    <div className={layoutStyles.container}>
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

      <Header home={home} />

      <main>{children}</main>
      {!home && (
        <div className={layoutStyles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}