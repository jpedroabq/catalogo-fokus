export const WHATSAPP_NUMBER = '5562991671882'

export const WHATSAPP_MESSAGE = (model: string, color: string, storage: string, ram: string, price: number) =>
  `Olá! Tenho interesse no ${model} (${color}, ${storage}, ${ram}) por R$ ${price.toFixed(2)}.`

export const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSaeEg0VdasYkjBU4bLpJ7FBMdWJq-sLTQzAMdIlQoEPTGBDU1kJTXM-fLMiDdL8w/pub?gid=1955490037&single=true&output=csv'
