import { Review } from "@/lib/types"

export const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "Marie Dubois",
    rating: 5,
    text: "Service impeccable, je recommande vivement !",
    date: "Il y a 2 jours",
    source: "Google",
    responded: false
  },
  {
    id: "2",
    customerName: "Thomas Leroy",
    rating: 2,
    text: "Attente un peu longue...",
    date: "Il y a 1 semaine",
    source: "Facebook",
    responded: false
  }
]