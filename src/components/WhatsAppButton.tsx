import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants'

interface WhatsAppButtonProps {
  model: string
  color: string
  storage: string
  ram: string
}

export default function WhatsAppButton(props: WhatsAppButtonProps) {
  const message = WHATSAPP_MESSAGE(props.model, props.color, props.storage, props.ram)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center w-full text-center bg-[#000000] hover:bg-[#27272A] active:bg-[#18181B] text-white font-semibold text-[14px] md:text-[15px] py-[10px] md:py-[12px] px-6 rounded-[980px] transition-all duration-300 ease-apple active:scale-[0.97]"
    >
      <span className="relative z-10">Comprar</span>
    </a>
  )
}
