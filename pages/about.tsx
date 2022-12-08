// @ts-nocheck
import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import { Seo, ExternalLinkList, ExternalLink, ExternalLinkCard, ExternalCard, CurationContractPlug, CreateWhatsMissingPlug } from 'components'

const READING_LIST_LINKS = [
  {
   title: 'Hyperstructures - Jacob Horne (2021)',
   url: 'https://jacob.energy/hyperstructures.html'
  },
  {
   title: 'Headless Brands - Other Internet (2019)',
   url: 'https://otherinter.net/research/headless-brands/'
  },
  {
   title: 'Market-Protocol Fit - Other Internet (2020)',
   url: 'https://otherinter.net/research/market-protocol-fit/'
  },
  {
   title: 'Squad Wealth - Other Internet (2020)',
   url: 'https://otherinter.net/research/squad-wealth/'
  },
  {
   title: 'Primacy - Interdependence (2021)',
   url: 'https://interdependence.fm/episodes/primacism-david-rudnick-on-the-struggle-for-primacy-type-and-poetrys-unique-value-in-an-age-of-digital-and-physical-conflict-and-percy-shelleys-mont-blanc-cwpBIPGY'
  },
  {
    title: 'DAOs are not corporations: Vitalik Buterin (2022)',
    url: 'https://vitalik.ca/general/2022/09/20/daos.html'
  },
  {
    title: 'Post-individualism - Interdependence (2022)',
    url: 'https://www.interdependence.fm/episodes/post-individualism-metalabels-and-web-3-with-yancey-strickler'
  },
  {
    title: '"Everything in Quotes" - Virgil Abloh (2017)',
    url: 'https://www.youtube.com/watch?v=zKYp1t0-xYw&ab_channel=ColumbiaGSAPP'
  },
  {
    title: '"Insert Complicated Title Here" - Virgil Abloh (2017)',
    url: 'https://www.youtube.com/watch?v=qie5VITX6eQ&t=1304s&ab_channel=HarvardGSD'
  },
  {
    title: 'Why the US + Mars Need a Creative Director - Eugene Angelo + Reggie James (2022)',
    url: 'https://www.youtube.com/watch?v=2NP5A3I2stA&t=2s&ab_channel=Baukunst'
  },
  {
    title: 'Life After Lifestyle - Toby Shorin (2022)',
    url: 'https://subpixel.space/entries/life-after-lifestyle/'
  },
  {
    title: 'The Network State and How to Start a New Country - Balaji Srinivasan + Tim Ferris (2022)',
    url: 'https://www.youtube.com/watch?v=FV5SqIm5e90&ab_channel=TimFerriss/'
  },
  {
    title: 'PROTOPIA FUTURES - Planet Earth (2021)',
    url: 'https://medium.com/protopia-futures/protopia-futures-framework-f3c2a5d09a1e'
  },           
 ] as ExternalLink[]

 const ECOSYSTEM_CARDS = [
  {
   title: 'Forum',
   url: 'https://forum.public---assembly.com/',
   description: "Community hub 1"
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/pblcasmbly',
    description: "Community hub 2"   
  },    
  {
   title: 'Governance Portal',
   url: 'https://nouns.build/dao/0xd2e7684cf3e2511cc3b4538bb2885dc206583076',
   description: "Onchain decisions"   
  },

  {
   title: 'Github',
   url: 'https://github.com/public-assembly',
   description: "PA codebase"   
  },
  {
   title: 'Docs',
   url: 'https://docs.public---assembly.com/',
   description: "User documentation"   
  }
 ] as ExternalCard[] 

const About: NextPage = () => { 
  return (
    <article className="max-w-[650px] w-full">
      <Seo title="about"/>
      <p className="text-left pb-[32px] text-[16px] italic leading-[18px]">
        In contrast to the physical world, only one degree of separation lies between everyone on the internet. This heightened connectivity allows for new models of coordination + creation that are native to the digital realm. Public Assembly will test the best practices for leveraging the unique physics of the internet to create what’s missing as fast as possible.
      </p>         
      <h2 className="font-bold text-[20px] pb-[9px]">
        Public Conversations
      </h2>                
      <ExternalLinkCard links={ECOSYSTEM_CARDS} />        
      <h2 className="mt-[32px] font-bold text-[20px] pb-[9px]">
        Reading List
      </h2>            
      <ExternalLinkList links={READING_LIST_LINKS} />
      <h5 className="text-[14px] pb-[20px]">
        Site maintained by <a href="https://twitter.com/FF89DE" className="hover:font-bold underline">#FF89DE</a>
      </h5>
    </article>
  )
}

export default About
