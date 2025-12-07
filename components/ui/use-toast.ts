// components/ui/use-toast.ts
import * as React from "react"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = any // Simplifié pour éviter les erreurs de types complexes
// ... (Version simplifiée et robuste du hook standard)

import { useState, useEffect } from 'react'

export type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = {
  type: "ADD_TOAST"
  toast: ToastProps
} | {
  type: "DISMISS_TOAST"
  toastId?: string
} | {
  type: "REMOVE_TOAST"
  toastId?: string
}

interface State {
  toasts: ToastProps[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

let memoryState: State = { toasts: [] }
let listeners: Array<(state: State) => void> = []

function dispatch(action: ActionType) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      }
      break
    case "DISMISS_TOAST":
      // Simple suppression pour ce MVP
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      }
      break
    case "REMOVE_TOAST":
      if (action.toastId === undefined) memoryState = { ...memoryState, toasts: [] }
      else memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      }
      break
  }
  listeners.forEach((listener) => listener(memoryState))
}

function toast({ ...props }: Omit<ToastProps, "id">) {
  const id = genId()
  const update = (props: ToasterToast) =>
    dispatch({ type: "ADD_TOAST", toast: { ...props, id } })
  
  dispatch({ type: "ADD_TOAST", toast: { ...props, id } })
  
  return {
    id: id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
    update,
  }
}

function useToast() {
  const [state, setState] = useState<State>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }