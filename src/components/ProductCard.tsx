import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { GroupedProduct } from '../types'
import { BRAND_LOGOS } from '../brandLogos'
import VariantSelector from './VariantSelector'
import WhatsAppButton from './WhatsAppButton'

interface ProductCardProps {
  product: GroupedProduct
  index: number
}

const STORAGE_ORDER = ['64GB', '128GB', '256GB', '512GB', '1TB']

function sortStorage(options: string[]): string[] {
  return [...options].sort(
    (a, b) => STORAGE_ORDER.indexOf(a) - STORAGE_ORDER.indexOf(b)
  )
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color ?? '')
  const [selectedStorage, setSelectedStorage] = useState(product.variants[0]?.storage ?? '')
  const [selectedRam, setSelectedRam] = useState(product.variants[0]?.ram ?? '')
  const [imgFailed, setImgFailed] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const colors = useMemo(
    () => [...new Set(product.variants.map((v) => v.color).filter(Boolean))],
    [product.variants]
  )
  const storages = useMemo(
    () => [...new Set(product.variants.map((v) => v.storage).filter(Boolean))],
    [product.variants]
  )
  const rams = useMemo(
    () => [...new Set(product.variants.map((v) => v.ram).filter(Boolean))],
    [product.variants]
  )

  const sortedStorages = useMemo(() => sortStorage(storages), [storages])
  const sortedRams = useMemo(() => [...rams].sort(), [rams])

  const currentVariant = product.variants.find(
    (v) =>
      v.color === selectedColor &&
      v.storage === selectedStorage &&
      v.ram === selectedRam
  )
  const price = currentVariant?.price ?? product.variants[0]?.price ?? 0

  const images = currentVariant?.images.length
    ? currentVariant.images
    : product.variants.find((v) => v.color === selectedColor && v.images.length)?.images
    || product.variants.find((v) => v.images.length)?.images
    || []

  const currentImage = images[imgIndex] || images[0] || ''
  const outOfStock = currentVariant ? currentVariant.stock === 0 : true

  useEffect(() => {
    setImgFailed(false)
    setImgIndex(0)
  }, [selectedColor, selectedStorage, selectedRam])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft' && images.length > 1) setImgIndex((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight' && images.length > 1) setImgIndex((i) => (i + 1) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, images.length])

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative bg-[var(--color-bg-secondary)] rounded-card overflow-hidden hover:shadow-apple-hover transition-all duration-400 ease-apple will-change-transform flex flex-col h-full"
    >
      <div className="aspect-[4/3] shrink-0 relative overflow-hidden bg-[#E4E4E7] group/image">
        {currentImage && !imgFailed && (
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            <img
              key={currentImage}
              src={currentImage}
              alt={product.model}
              className="w-full h-full object-cover transition-all duration-400 ease-apple"
              onError={() => setImgFailed(true)}
            />
          </button>
        )}
        {images.length > 1 && !imgFailed && (
          <>
            <button
              onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-[#09090B] opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 hover:bg-white shadow-apple-sm"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setImgIndex((i) => (i + 1) % images.length)}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-[#09090B] opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 hover:bg-white shadow-apple-sm"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === imgIndex ? 'bg-[#09090B] w-3' : 'bg-[#09090B]/40 hover:bg-[#09090B]/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 md:p-5 space-y-4 flex-1 flex flex-col relative">
        {BRAND_LOGOS[product.brand.toLowerCase().trim()] && (
          <div className="absolute top-4 md:top-5 right-4 md:right-5">
            <img
              src={BRAND_LOGOS[product.brand.toLowerCase().trim()]}
              alt=""
              className="h-[18px] w-auto"
            />
          </div>
        )}
        <h3 className="text-[17px] font-semibold tracking-[-0.022em] text-[var(--color-text)] leading-tight">
          {product.model}
        </h3>

        <div className="space-y-3 flex-1">
          {colors.length > 0 && (
            <VariantSelector
              label="Cor"
              options={colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          )}
          {storages.length > 0 && (
            <VariantSelector
              label="Armazenamento"
              options={sortedStorages}
              selected={selectedStorage}
              onSelect={setSelectedStorage}
              formatOption={(v) => /[GT]B$/i.test(v.replace(/\s/g, '')) ? v : `${v} GB`}
            />
          )}
          {rams.length > 0 && (
            <VariantSelector
              label="RAM"
              options={sortedRams}
              selected={selectedRam}
              onSelect={setSelectedRam}
              formatOption={(v) => `${v} GB`}
            />
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-[0.04em] text-[var(--color-text-secondary)]">
            R$
          </span>
          <span className="text-[22px] font-bold tracking-[-0.022em] text-[var(--color-text)]">
            {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <WhatsAppButton
          model={product.model}
          color={selectedColor}
          storage={selectedStorage}
          ram={selectedRam}
          price={price}
          outOfStock={outOfStock}
        />
      </div>

    </motion.div>

      {lightboxOpen && images.length > 0 && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i - 1 + images.length) % images.length) }}
              className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            >
              <ChevronLeftIcon className="w-7 h-7" />
            </button>
          )}

          <img
            key={images[imgIndex]}
            src={images[imgIndex]}
            alt={product.model}
            className="max-h-[85vh] max-w-[90vw] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i + 1) % images.length) }}
              className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            >
              <ChevronRightIcon className="w-7 h-7" />
            </button>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i) }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === imgIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  )
}
