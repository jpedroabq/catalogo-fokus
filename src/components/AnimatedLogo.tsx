import { motion } from 'framer-motion'

const LETTERS = ['F', 'O', 'K', 'U', 'S']

const letterVariants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
  },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: i * 0.25,
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: LETTERS.length * 0.25 + 0.25,
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

interface Props {
  compact?: boolean
  static?: boolean
}

function StaticLogo({ compact }: { compact?: boolean }) {
  const boxSize = compact ? 'w-[18px] h-[18px]' : 'w-[26px] h-[26px] md:w-[36px] md:h-[36px]'
  const fontSize = compact ? 'text-sm' : 'text-xl md:text-[30px]'
  const gap = compact ? 'gap-[4px]' : 'gap-[6px] md:gap-2'
  const subtitleSize = compact ? 'text-[8px]' : 'text-[9px] md:text-xs'
  const subtitleTracking = compact ? 'tracking-[3px]' : 'tracking-[4px] md:tracking-[6px]'
  const align = compact ? 'flex-col items-end' : 'flex-col items-end'

  return (
    <div className={`flex ${align}`}>
      <div className={`flex items-center ${gap}`}>
        {LETTERS.map((letter) => (
          <div
            key={letter}
            className={`${boxSize} border border-[#09090B] flex items-center justify-center shrink-0`}
          >
            <span className={`font-bold ${fontSize} leading-none text-[#09090B] select-none`}>
              {letter}
            </span>
          </div>
        ))}
      </div>
      <span className={`${subtitleSize} font-light ${subtitleTracking} uppercase text-[#09090B] mt-[2px] select-none`}>
        TECNOLOGIA
      </span>
    </div>
  )
}

export default function AnimatedLogo({ compact, static: isStatic }: Props) {
  if (isStatic) return <StaticLogo compact={compact} />

  const boxSize = compact ? 'w-[18px] h-[18px]' : 'w-[26px] h-[26px] md:w-[36px] md:h-[36px]'
  const fontSize = compact ? 'text-sm' : 'text-xl md:text-[30px]'
  const gap = compact ? 'gap-[4px]' : 'gap-[6px] md:gap-2'
  const subtitleSize = compact ? 'text-[8px]' : 'text-[9px] md:text-xs'
  const subtitleTracking = compact ? 'tracking-[3px]' : 'tracking-[4px] md:tracking-[6px]'
  const align = compact ? 'flex-col items-end' : 'flex-col items-end'

  return (
    <div className={`flex ${align}`}>
      <div className={`flex items-center ${gap}`} style={{ perspective: 800 }}>
        {LETTERS.map((letter, i) => (
          <motion.div
            key={letter}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className={`${boxSize} border border-[#09090B] flex items-center justify-center shrink-0`}
            style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
          >
            <span className={`font-bold ${fontSize} leading-none text-[#09090B] select-none`}>
              {letter}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.span
        initial="hidden"
        animate="visible"
        variants={subtitleVariants}
        className={`${subtitleSize} font-light ${subtitleTracking} uppercase text-[#09090B] mt-[2px] select-none`}
        style={{ willChange: 'transform' }}
      >
        TECNOLOGIA
      </motion.span>
    </div>
  )
}
