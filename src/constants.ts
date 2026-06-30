export const WHATSAPP_NUMBER = '5562991671882'

const formatStorage = (v: string) => /[GT]B$/i.test(v.replace(/\s/g, '')) ? v : `${v} GB`
const formatRam = (v: string) => `${v} GB RAM`

export const WHATSAPP_MESSAGE = (model: string, color: string, storage: string, ram: string) =>
  `Olá! Tenho interesse no ${model} (${color}, ${formatStorage(storage)}, ${formatRam(ram)}).`

export const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6sSqQZnN6aFQs0D1rU_oIzq4l587CUwq2k0Grn9XdlFF4Kt0uhxpnSBCrjnWwHJKd-LJz7xdQqzmt/pub?gid=338374894&single=true&output=csv'
 