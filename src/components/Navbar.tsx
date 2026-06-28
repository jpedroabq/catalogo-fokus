import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface NavbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(0,0,0,0.72)] backdrop-blur-[20px] border-b border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-12 flex items-center justify-between">
        <span className="text-[17px] font-semibold tracking-tight text-[var(--color-text)]">
          Fokus
        </span>

        <div className="relative flex-1 max-w-xs ml-4">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-[13px] rounded-[8px] bg-[var(--color-bg-tertiary)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] border-none outline-none focus:ring-1 focus:ring-apple-blue transition-all"
          />
        </div>
      </div>
    </nav>
  )
}
