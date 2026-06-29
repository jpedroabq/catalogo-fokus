export default function Navbar() {
  return (
    <nav className="relative md:fixed top-0 left-0 right-0 z-50">
      <div className="px-5 lg:px-10 h-[64px] md:h-[72px] flex items-center justify-center md:justify-start">
        <img src="/logo.png" alt="Fokus Tecnologia" className="h-[48px] md:h-[56px] w-auto md:ml-16" />
      </div>
    </nav>
  )
}
