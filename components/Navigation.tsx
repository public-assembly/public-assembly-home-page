import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  {
    slug: '/',
    title: 'home',
  },  
  {
    slug: '/about',
    title: 'about',
  },  
  {
    slug: '/ecosystem',
    title: 'ecosystem',
  }
]

export function Navigation() {
  const router = useRouter()

  return (
    <nav className="flex flex-row items-center gap-8">
      {/* <Link passHref href='/'>
        <a className="font-bold">{process.env.NEXT_PUBLIC_SITE_TITLE}</a>
      </Link> */}
      <div className="flex flex-row gap-4">
        {pages.map((page) => (
          <Link passHref href={page.slug} key={page.slug}>
            <a
              className="hover:underline"
              style={{
                color: router.asPath === page.slug ? 'black' : 'black', // updated to black due to recent figma change
                // color: router.asPath === page.slug ? 'var(--pa-pink)' : 'black',
                fontWeight: router.asPath === page.slug ? 'bold' : 'normal',
              }}>
              {page.title}
            </a>
          </Link>
        ))}
        <a
        className="hover:underline"
        href="https://pblcasmbly.discourse.group/"
        >
          forum
        </a>
      </div>
    </nav>
  )
}
