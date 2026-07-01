import AnimatedLogo from './AnimatedLogo'

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)]/80 bg-[var(--color-bg)]/90 backdrop-blur-xl">
      <div className="flex h-[64px] items-center pl-4 sm:h-[72px] sm:pl-6 lg:pl-8">
        <AnimatedLogo />
      </div>
    </nav>
  )
}
