import Readme from './../../README.md'

export function Hero() {
  return (
    <section className='pa--hero h-screen max-h-[750px] flex items-center border-b border-1 border-black'>
      <article className='w-full max-w-[900px] m-auto'><Readme /></article>
    </section>
  )
}