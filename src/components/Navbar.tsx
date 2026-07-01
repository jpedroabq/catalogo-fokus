import AnimatedLogo from './AnimatedLogo'

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[var(--color-bg)]">
      <div className="px-5 lg:px-10 h-[64px] md:h-[72px] flex items-center justify-center md:justify-start">
        <AnimatedLogo />
      </div>
    </nav>
  )
}
