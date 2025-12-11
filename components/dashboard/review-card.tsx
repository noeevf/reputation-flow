import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Wand2, Loader2, Check } from "lucide-react"

interface ReviewCardProps {
  review: {
    id: string
    customerName: string
    rating: number
    text: string
    date: string
    source: "Google" | "Tripadvisor" | "Facebook"
    responded: boolean
    response?: string
  }
  onGenerateResponse: (id: string) => void
  isGenerating?: boolean // Nouvelle option !
}

export function ReviewCard({ review, onGenerateResponse, isGenerating = false }: ReviewCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between bg-gray-50/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold uppercase">
            {review.customerName.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>{review.source}</span>
              <span>•</span>
              <span>{review.date}</span>
            </div>
          </div>
        </div>
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          {review.text || <span className="italic text-gray-400">Pas de commentaire écrit.</span>}
        </p>

        {/* ZONE RÉPONSE */}
        <div className="pt-2">
          {review.responded && review.response ? (
            <div className="rounded-md bg-green-50 border border-green-100 p-3 animate-in fade-in">
              <div className="flex items-center gap-2 mb-1">
                 <Check className="h-3 w-3 text-green-600" />
                 <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Réponse publiée</span>
              </div>
              <p className="text-sm text-gray-700 italic">
                "{review.response}"
              </p>
            </div>
          ) : (
            <div className="flex justify-end">
              <Button 
                size="sm" 
                onClick={() => onGenerateResponse(review.id)}
                disabled={isGenerating} // On désactive le bouton si ça charge
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rédaction IA en cours...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Générer une réponse IA
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}