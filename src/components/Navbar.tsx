import AnimatedLogo from './AnimatedLogo'
import { WHATSAPP_NUMBER, WHATSAPP_CONTACT_MESSAGE } from '../constants'

export default function Navbar() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_CONTACT_MESSAGE)}`

  return (
    <nav className="md:fixed md:inset-x-0 md:top-0 z-50 border-b border-[var(--color-border)]/80 bg-[var(--color-bg)]/90 backdrop-blur-xl">
      <div className="flex h-[64px] items-center justify-between pl-4 pr-4 sm:h-[72px] sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8">
        <AnimatedLogo />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-[36px] items-center rounded-[980px] border border-[var(--color-border)] bg-transparent px-5 text-[14px] text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[#A1A1AA] active:scale-[0.97]"
        >
          Fale Conosco
        </a>
      </div>
    </nav>
  )
}
