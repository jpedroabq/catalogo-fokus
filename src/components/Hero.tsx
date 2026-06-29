export default function Hero() {
  return (
    <section className="relative pt-10 md:pt-28 pb-16 md:pb-20 lg:pb-24 px-5 lg:px-10 text-center">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <h1 className="text-[34px] md:text-[40px] lg:text-[48px] font-bold tracking-[-0.003em] leading-[1.083] text-[var(--color-text)]">
          Smartphones
        </h1>
        <p className="mt-4 text-[17px] leading-[1.470] tracking-[-0.022em] text-[var(--color-text-secondary)] max-w-lg mx-auto">
          Inovação em cada detalhe. Encontre o dispositivo que acompanha o seu ritmo.
        </p>
      </div>
    </section>
  )
}
