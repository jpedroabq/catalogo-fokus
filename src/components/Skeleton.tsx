export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5 lg:px-10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-[var(--color-bg-secondary)] rounded-[18px] p-5 animate-pulse">
          <div className="aspect-square bg-[var(--color-bg-tertiary)] rounded-[12px] mb-4" />
          <div className="h-3 w-16 bg-[var(--color-bg-tertiary)] rounded mb-2" />
          <div className="h-5 w-3/4 bg-[var(--color-bg-tertiary)] rounded mb-4" />
          <div className="h-8 w-full bg-[var(--color-bg-tertiary)] rounded-[8px] mb-2" />
          <div className="h-8 w-full bg-[var(--color-bg-tertiary)] rounded-[8px]" />
        </div>
      ))}
    </div>
  )
}
