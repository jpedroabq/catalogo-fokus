export default function Hero() {
  return (
    <section className="relative overflow-hidden px-0 pb-12 pt-24 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero-iphone-family-desktop.jpg"
        />
        <img
          alt=""
          src="/images/hero-iphone-family-mobile.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />

      <div className="relative flex min-h-[320px] w-screen max-w-none flex-col items-center justify-start px-4 pt-[-0.5rem] text-center sm:min-h-[380px] sm:px-6 sm:pt-[-0.5rem] lg:min-h-[440px] lg:px-8 lg:pt-[-0.5rem]">
        <div className="w-full">
          <h1 className="mx-auto w-full text-center text-[clamp(1.6rem,3.8vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-[#09090B]">
            Potência que impressiona. Design que Inspira.
          </h1>
        </div>
        <p className="mt-4 w-full max-w-[32rem] px-4 text-center text-[17px] leading-[1.5] tracking-[-0.018em] text-[#09090B]/80 sm:text-[19px]">
          Disponível na Fokus Tecnologia
        </p>
      </div>
    </section>
  )
}
