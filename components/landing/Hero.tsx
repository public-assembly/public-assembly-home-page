import Readme from './../../README.md'

export function Hero() {
  return (
    <section id="hero" className='relative pa--hero h-screen max-h-[50vmax] sm:max-h-[80vmin] flex flex-wrap items-center'>
      <article className='w-full max-w-[884px] m-auto'>
        <Readme />
      </article>
      <div className="mb-4 absolute bottom-0 w-full text-[14px]">
        {"*media generated dynamically from this "}
        <a
        href="https://etherscan.io/address/0xbc8db622af59f115cc228dff44d6b17478470ae2"
        className="hover:cursor-pointer underline text-[#0029FF]"
        >
        {"curation contract"}
        </a>
      </div>
    </section>
  )
}