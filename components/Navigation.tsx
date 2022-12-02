import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  {
    slug: '/',
    title: 'Public Assembly',
  },  
  {
    slug: '/about',
    title: 'about',
  },
  {
    slug: '/archive',
    title: 'archive',
  }  
]

export function Navigation() {
  const router = useRouter()

  return (
    <nav className="flex flex-row items-center gap-8">
      <div className="flex flex-row gap-4">
        {pages.map((page) => (
          <Link passHref href={page.slug} key={page.slug}>
            <a
              className="hover:underline"
              style={{
                fontWeight: router.asPath === page.slug ? 'bold' : 'normal',
              }}>
              {page.title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  )
}
