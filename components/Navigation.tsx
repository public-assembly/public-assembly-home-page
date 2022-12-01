import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  {
    slug: '/permanent-collection',
    title: 'Permanent Collection',
  },
  {
    slug: '/ecosystem',
    title: 'Ecosystem',
  },
  {
    slug: '/about',
    title: 'About',
  },
]

export function Navigation() {
  const router = useRouter()

  return (
    <nav className="flex flex-row items-center gap-8">
      <Link passHref href='/'>
        <a className="font-bold">{process.env.NEXT_PUBLIC_SITE_TITLE}</a>
      </Link>
      <div className="flex flex-row gap-4">
        {pages.map((page) => (
          <Link passHref href={page.slug} key={page.slug}>
            <a
              style={{
                color: router.asPath === page.slug ? 'var(--pa-pink)' : 'black',
              }}>
              {page.title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  )
}
