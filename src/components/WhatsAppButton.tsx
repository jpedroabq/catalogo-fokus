import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants'

interface WhatsAppButtonProps {
  model: string
  color: string
  storage: string
  ram: string
  brand: string
}

export default function WhatsAppButton(props: WhatsAppButtonProps) {
  const message = WHATSAPP_MESSAGE(props.model, props.color, props.storage, props.ram, props.brand)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex w-fit items-center justify-center whitespace-nowrap text-center bg-[#1D1D1F] hover:bg-[#27272A] active:bg-[#18181B] text-white font-semibold text-[13px] py-[7px] px-5 rounded-[980px] transition-all duration-300 ease-apple active:scale-[0.97]"
    >
      <span className="relative z-10">Comprar</span>
    </a>
  )
}
