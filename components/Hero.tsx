import Readme from './../README.md'

export function Hero() {
  return (
    <section id="hero" className='relative pa--hero h-screen max-h-[50vmax] sm:max-h-[80vmin] flex flex-wrap items-center'>
      <article className='w-full max-w-[884px] m-auto'>
        <Readme />
      </article>
    </section>
  )
}