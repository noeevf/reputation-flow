"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Review } from "@/lib/types"
import { Star, Loader2, CheckCircle2, Copy, Send } from "lucide-react"

interface ReviewCardProps {
  review: Review
  onGenerateResponse: (reviewId: string) => Promise<void>
}

export function ReviewCard({ review, onGenerateResponse }: ReviewCardProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(
    review.response || null
  )
  const [isCopied, setIsCopied] = useState(false)

  // Mettre à jour la réponse quand la review change
  useEffect(() => {
    if (review.response) {
      setGeneratedResponse(review.response)
    }
  }, [review.response])

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await onGenerateResponse(review.id)
    } catch (error) {
      console.error("Erreur lors de la génération:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    const textToCopy = review.response || generatedResponse
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Remet l'état normal après 2s
    }
  }

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-5 w-5 ${
        i < review.rating
          ? "fill-yellow-400 text-yellow-400"
          : "fill-gray-200 text-gray-200"
      }`}
    />
  ))

  const getRatingColor = () => {
    if (review.rating >= 4) return "text-green-600"
    if (review.rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="hover:shadow-md transition-shadow bg-white">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">{review.customerName}</h3>
              <span className={`text-sm font-medium ${getRatingColor()}`}>
                {review.rating}/5
              </span>
            </div>
            <div className="flex items-center gap-1 mb-2">{stars}</div>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          {review.responded && (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />
                Répondu
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-sm">{review.text}</p>
        
        {/* Zone de la réponse générée */}
        {(review.response || generatedResponse) && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Réponse suggérée par l'IA</p>
            </div>
            <p className="text-gray-800 text-sm whitespace-pre-wrap mb-4">{review.response || generatedResponse}</p>
            
            {/* Boutons d'action */}
            <div className="flex justify-end gap-2 pt-2 border-t border-indigo-100">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCopy}
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 h-8"
                >
                    {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
                    {isCopied ? "Copié !" : "Copier"}
                </Button>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 h-8 gap-2">
                    <Send className="w-3.5 h-3.5" />
                    Publier
                </Button>
            </div>
          </div>
        )}

        {/* Bouton de génération (caché si déjà répondu ou généré) */}
        {!review.responded && !generatedResponse && (
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                L'IA rédige votre réponse...
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4 fill-white" />
                Générer une réponse avec l'IA
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}