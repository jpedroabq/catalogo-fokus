import Papa from 'papaparse'
import { ProductRow } from '../types'
import { GOOGLE_SHEETS_CSV_URL } from '../constants'

export async function fetchProducts(): Promise<ProductRow[]> {
  const response = await fetch(GOOGLE_SHEETS_CSV_URL)
  const csvText = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse<ProductRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => {
        const map: Record<string, string> = {
          marca: 'brand',
          modelo: 'model',
          cor: 'color',
          armazenamento: 'storage',
          ram: 'ram',
          'preço': 'price',
          estoque: 'stock',
          imagens: 'imageurl',
        }
        return map[h.trim().toLowerCase()] ?? h.trim().toLowerCase()
      },
      complete: (results) => {
        resolve(results.data.filter((row) => row.model && row.model.trim()))
      },
      error: reject,
    })
  })
}
