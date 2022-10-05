import Readme from './../../README.md'

export function Hero() {
  return (
    <section id="hero" className='pa--hero h-screen max-h-[80vmin] flex items-center'>
      <article className='w-full max-w-[950px] m-auto'><Readme /></article>
    </section>
  )
}