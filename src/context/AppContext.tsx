import React, { createContext, useContext, useState } from "react"

type AppState = {
  step: string
  setStep: (step: string) => void
  importedData: string | null
  setImportedData: (data: string | null) => void
  reset: () => void
}

const AppContext = createContext<AppState | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState("import")
  const [importedData, setImportedData] = useState<string | null>(null)

  function reset() {
    setStep("import")
    setImportedData(null)
  }

  return (
    <AppContext.Provider value={{
      step, setStep,
      importedData, setImportedData,
      reset
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
