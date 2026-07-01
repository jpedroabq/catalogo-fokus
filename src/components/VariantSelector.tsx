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
            className={`px-3 md:px-4 py-[6px] md:py-[7px] text-[12px] md:text-[13px] font-semibold rounded-[980px] transition-all duration-300 ease-apple active:scale-[0.97] ${
              selected === opt
                ? 'bg-[#09090B] text-white'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[#E4E4E7]'
            }`}
          >
            {formatOption ? formatOption(opt) : opt}
          </button>
        ))}
      </div>
    </div>
  )
}
