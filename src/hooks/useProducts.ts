import { useState, useEffect } from 'react'
import { GroupedProduct } from '../types'
import { fetchProducts } from '../utils/csv'
import { groupProducts } from '../utils/groupProducts'

export function useProducts() {
  const [products, setProducts] = useState<GroupedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const rows = await fetchProducts()
        if (!cancelled) {
          setProducts(groupProducts(rows))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro ao carregar produtos')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return { products, loading, error }
}
