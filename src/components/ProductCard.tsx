import { useState } from 'react'
import { motion } from 'framer-motion'
import { GroupedProduct } from '../types'
import { formatBRL, rangePrice } from '../utils/format'
import VariantSelector from './VariantSelector'
import WhatsAppButton from './WhatsAppButton'

interface ProductCardProps {
  product: GroupedProduct
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '')
  const [selectedStorage, setSelectedStorage] = useState(product.storages[0] || '')
  const [selectedRam, setSelectedRam] = useState(product.rams[0] || '')

  const activeVariant = product.variants.find(
    (v) =>
      v.color === selectedColor &&
      v.storage === selectedStorage &&
      v.ram === selectedRam
  )

  const placeholderColors = ['#1D1D1F', '#F5F5F7', '#007AFF', '#FF3B30', '#34C759']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-[var(--color-bg-secondary)] rounded-[18px] p-5 flex flex-col gap-4 border border-[var(--color-separator)]/30"
    >
      <div className="aspect-square bg-[var(--color-bg-tertiary)] rounded-[12px] flex items-center justify-center overflow-hidden">
        <div
          className="w-20 h-20 rounded-full opacity-30"
          style={{ backgroundColor: placeholderColors[index % placeholderColors.length] }}
        />
      </div>

      <div>
        <p className="text-[13px] font-semibold text-apple-blue uppercase tracking-wider">
          {product.brand}
        </p>
        <h3 className="text-[17px] font-semibold text-[var(--color-text)] mt-0.5 leading-tight">
          {product.model}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {product.colors.length > 1 && (
          <VariantSelector
            label="Cor"
            options={product.colors}
            selected={selectedColor}
            onSelect={setSelectedColor}
          />
        )}
        {product.storages.length > 1 && (
          <VariantSelector
            label="Armazenamento"
            options={product.storages}
            selected={selectedStorage}
            onSelect={setSelectedStorage}
          />
        )}
        {product.rams.length > 1 && (
          <VariantSelector
            label="Memória RAM"
            options={product.rams}
            selected={selectedRam}
            onSelect={setSelectedRam}
          />
        )}
      </div>

      <div className="mt-auto">
        <p className="text-[22px] font-bold text-[var(--color-text)]">
          {activeVariant ? formatBRL(activeVariant.price) : rangePrice(product.minPrice, product.maxPrice)}
        </p>
      </div>

      {activeVariant && (
        <WhatsAppButton
          model={`${product.brand} ${product.model}`}
          color={selectedColor}
          storage={selectedStorage}
          ram={selectedRam}
          price={activeVariant.price}
        />
      )}
    </motion.div>
  )
}
