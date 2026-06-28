export const WHATSAPP_NUMBER = '5562991671882'

export const WHATSAPP_MESSAGE = (model: string, color: string, storage: string, ram: string, price: number) =>
  `Olá! Tenho interesse no ${model} (${color}, ${storage}, ${ram}) por R$ ${price.toFixed(2)}.`

export const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQIv8FVdB_Smrwl4n4eog5bnwvRCPYr7FauKpJrZ3fpNJC-lsGYYupK9zSGYQ7wvDY09sDtjrKrddqC/pub?output=csv'
