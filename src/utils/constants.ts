export const domain = process.env.NODE_ENV === "production"
  ? process.env.REACT_APP_DOMAIN
  : process.env.REACT_APP_DOMAIN_DEV

export const baseUrl = process.env.NODE_ENV === "production"
  ? process.env.REACT_APP_BASE_URL
  : process.env.REACT_APP_BASE_URL_DEV

export const uniqueAppID = "6f8cb0121b809585c3a06511be096e28"

export const authToken = () => JSON.parse(localStorage.getItem(uniqueAppID + '.auth') ?? '{}')?.state?.auth?.token
