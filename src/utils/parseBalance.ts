/**
 * Parse un CSV de balance générale ANCC (séparateur ;, colonnes COMPTE;LIBELLE;DEBIT;CREDIT;ANNEE)
 * Retourne un objet { [annee]: LigneBilan[] }
 */
export type LigneBilan = {
  compte: string
  libelle: string
  debit: number
  credit: number
  annee: string
}

export type BilanParAnnee = {
  [annee: string]: LigneBilan[]
}

export function parseBalance(csv: string): BilanParAnnee {
  const lines = csv
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0)
  if (lines.length < 2) throw new Error("Aucune donnée trouvée dans le fichier.")

  const header = lines[0].split(";").map(h => h.trim().toUpperCase())
  const idx = {
    compte: header.indexOf("COMPTE"),
    libelle: header.indexOf("LIBELLE"),
    debit: header.indexOf("DEBIT"),
    credit: header.indexOf("CREDIT"),
    annee: header.indexOf("ANNEE"),
  }
  if (Object.values(idx).some(i => i === -1)) {
    throw new Error("Colonnes attendues manquantes dans le fichier.")
  }

  const data: BilanParAnnee = {}

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(";")
    if (cols.length < 5) continue
    const ligne: LigneBilan = {
      compte: cols[idx.compte].trim(),
      libelle: cols[idx.libelle].trim(),
      debit: parseFloat(cols[idx.debit].replace(",", ".")) || 0,
      credit: parseFloat(cols[idx.credit].replace(",", ".")) || 0,
      annee: cols[idx.annee].trim(),
    }
    if (!data[ligne.annee]) data[ligne.annee] = []
    data[ligne.annee].push(ligne)
  }
  return data
}
