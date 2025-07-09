export type TypeRetraitement =
  | "plus-value"
  | "moins-value"
  | "actif-fictif"
  | "provision"
  | "dette"
  | "autre"

export interface Retraitement {
  id: string
  type: TypeRetraitement
  libelle: string
  montant: number
  poste: string
  explication?: string
}
