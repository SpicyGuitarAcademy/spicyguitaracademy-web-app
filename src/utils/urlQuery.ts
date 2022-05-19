import { useLocation } from "react-router-dom"

export const UrlQuery = () => {
  const { search } = useLocation()
  const q: Record<string, string> = {}
  
  search.substring(1).split("&").forEach(sq => {
    let a = sq.split('=')
    q[a[0]] = a[1]
  })
  return q
}