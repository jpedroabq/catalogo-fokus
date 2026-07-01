import { getColorHex, isLightColor } from '../iphoneColors'

interface VariantSelectorProps {
  label: string
  options: string[]
  selected: string
  onSelect: (value: string) => void
  formatOption?: (value: string) => string
}

export default function VariantSelector({ label, options, selected, onSelect, formatOption }: VariantSelectorProps) {
  const isColor = label === 'Cor' || label === 'Color'

  if (isColor) {
    return (
      <div>
        <p className="text-[11px] font-semibold tracking-[0.04em] text-[var(--color-text-secondary)] mb-2.5">
          {label}{selected ? ` - ${selected}` : ''}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {options.map((opt) => {
            const hex = getColorHex(opt)
            const light = hex ? isLightColor(hex) : true
            const isSelected = selected === opt
            return (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                title={opt}
                className={`relative w-[28px] h-[28px] rounded-full transition-all duration-200 ease-apple active:scale-[0.92] ${
                  isSelected
                    ? 'scale-105'
                    : 'ring-1 ring-inset ring-black/10 hover:scale-105'
                }`}
                style={{ backgroundColor: hex || '#ccc' }}
              >
                {isSelected && (
                  <span
                    className={`absolute inset-0 flex items-center justify-center text-[11px] font-bold ${
                      light ? 'text-[#09090B]' : 'text-white'
                    }`}
                  >
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.04em] text-[var(--color-text-secondary)] mb-2.5">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`flex-1 min-w-0 max-w-[120px] px-3 md:px-4 py-[6px] md:py-[7px] text-[12px] md:text-[13px] font-semibold rounded-[980px] border transition-all duration-300 ease-apple active:scale-[0.97] whitespace-nowrap ${
              selected === opt
                ? 'border-[#09090B] bg-transparent text-[#09090B]'
                : 'border-[var(--color-border)] bg-transparent text-[var(--color-text-secondary)] hover:border-[#A1A1AA]'
            }`}
          >
            {formatOption ? formatOption(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  )
}
