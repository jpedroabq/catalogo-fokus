export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-separator)]/50 px-5 lg:px-10 py-6 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[var(--color-text-secondary)]">
        <p>&copy; {year} Fokus. Todos os direitos reservados.</p>
        <p>
          <a
            href={`https://wa.me/5562991671882`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-apple-blue transition-colors"
          >
            Fale conosco no WhatsApp
          </a>
        </p>
      </div>
    </footer>
  )
}
