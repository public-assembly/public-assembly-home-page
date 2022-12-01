import type { NextPage } from 'next'
import { Seo, ExternalLinkList, ExternalLink } from 'components'

const ECOSYSTEM_LINKS = [
 {
  title: 'PA Forum',
  url: 'https://pblcasmbly.discourse.group/'
 },
 {
  title: 'Dao Auction Site',
  url: 'https://nouns.build'
 },
 {
  title: 'Github',
  url: 'https://github.com/public-assembly'
 },
 {
  title: 'Docs',
  url: 'https://public-assembly-docs.vercel.app/'
 },
 {
  title: 'Twitter',
  url: 'https://twitter.com/pblcasmbly'
 }
] as ExternalLink[]

const Ecosystem: NextPage = () => {
  return (
    <>
      <Seo title='Ecosystem'/>
      <ExternalLinkList links={ECOSYSTEM_LINKS}/>
    </>
  )
}

export default Ecosystem
