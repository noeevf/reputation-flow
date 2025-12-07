// lib/types.ts

export interface Review {
  id: string
  customerName: string
  rating: number
  date: string
  text: string
  source: "Google" | "Facebook" | "Tripadvisor" // Optionnel si tu ne l'utilises pas encore
  responded: boolean
  response?: string
}