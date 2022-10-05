import Readme from './../../README.md'

export function Hero() {
  return (
    <section id="hero" className='pa--hero h-screen max-h-[750px] flex items-center'>
      <article className='w-full max-w-[900px] m-auto'><Readme /></article>
    </section>
  )
}