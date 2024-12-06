
interface ConfigEnvs {
  apiUrlProducts: string
}

export const config: ConfigEnvs = {
  apiUrlProducts: import.meta.env.VITE_PRODUCT_API_URL || 'http://localhost:3000',
}
