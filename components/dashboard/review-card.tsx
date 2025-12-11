"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Wand2, Loader2, Check, Send } from "lucide-react"

interface ReviewCardProps {
  review: {
    id: string
    customerName: string
    rating: number
    text: string
    date: string
    source: string
    status: string       // 'pending', 'draft', 'replied'
    reply_text?: string
  }
  onGenerateResponse: (id: string) => void
  onPublishResponse: (id: string, finalResponse: string) => void
  isGenerating?: boolean
}

export function ReviewCard({ review, onGenerateResponse, onPublishResponse, isGenerating = false }: ReviewCardProps) {
  // État local pour modifier le texte avant publication
  const [editText, setEditText] = useState(review.reply_text || "")

  // Quand on clique sur "Publier", on envoie le texte modifié
  const handlePublishClick = () => {
    onPublishResponse(review.id, editText)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-l-4 border-l-transparent hover:border-l-indigo-500">
      <CardHeader className="flex flex-row items-start justify-between bg-gray-50/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border text-indigo-700 font-bold uppercase shadow-sm">
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
            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-gray-300"}`} />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed italic border-l-2 pl-3">
          "{review.text || "Pas de commentaire."}"
        </p>

        {/* --- ZONE D'ACTION --- */}
        <div className="pt-2">
          
          {/* CAS 1 : DÉJÀ PUBLIÉ (Replied) */}
          {review.status === 'replied' ? (
            <div className="rounded-md bg-green-50 border border-green-100 p-3">
              <div className="flex items-center gap-2 mb-1">
                 <Check className="h-4 w-4 text-green-600" />
                 <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Réponse publiée</span>
              </div>
              <p className="text-sm text-gray-800">{review.reply_text}</p>
            </div>
          ) 
          
          /* CAS 2 : BROUILLON (Draft) - Mode Édition */
          : review.status === 'draft' ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
              <label className="text-xs font-semibold text-indigo-600 uppercase">Brouillon IA (Modifiable)</label>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
                value={editText || review.reply_text} // On affiche le texte de l'IA par défaut
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="flex gap-2 justify-end">
                <Button 
                    size="sm" variant="outline" 
                    onClick={() => onGenerateResponse(review.id)}
                    disabled={isGenerating}
                >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                    Régénérer
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handlePublishClick}>
                    <Send className="w-4 h-4 mr-2" />
                    Valider & Publier
                </Button>
              </div>
            </div>
          )

          /* CAS 3 : RIEN (Pending) */
          : (
            <div className="flex justify-end">
              <Button 
                size="sm" 
                onClick={() => onGenerateResponse(review.id)}
                disabled={isGenerating}
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rédaction en cours...
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