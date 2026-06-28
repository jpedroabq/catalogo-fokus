export default function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-[var(--color-bg-secondary)] rounded-card p-5 space-y-3">
          <div className="w-full aspect-[4/3] rounded-[12px] bg-[var(--color-bg-tertiary)]" />
          <div className="h-[14px] w-2/3 rounded-[4px] bg-[var(--color-bg-tertiary)]" />
          <div className="h-[12px] w-1/2 rounded-[4px] bg-[var(--color-bg-tertiary)]" />
          <div className="h-[12px] w-1/3 rounded-[4px] bg-[var(--color-bg-tertiary)]" />
          <div className="h-[36px] rounded-[980px] bg-[var(--color-bg-tertiary)]" />
        </div>
      ))}
    </div>
  )
}
