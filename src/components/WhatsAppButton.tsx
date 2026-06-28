import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants'

interface WhatsAppButtonProps {
  model: string
  color: string
  storage: string
  ram: string
  price: number
}

export default function WhatsAppButton({ model, color, storage, ram, price }: WhatsAppButtonProps) {
  const message = WHATSAPP_MESSAGE(model, color, storage, ram, price)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center bg-[#34C759] hover:bg-[#28a745] text-white font-semibold text-[15px] py-3 px-6 rounded-[980px] transition-all active:scale-[0.98]"
    >
      Comprar
    </a>
  )
}
