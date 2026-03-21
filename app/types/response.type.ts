export type RawResponse = {
  Id: number;
  Startzeit: string;
  Fertigstellungszeit: string;
  "E-Mail": string;
  Name: string;
  "Sind Sie persönlich der Meinung, dass es sich lohnt zu heiraten?":
    | "Ja, auf jeden Fall"
    | "Eher ja"
    | "Weiss nicht / Unentschieden"
    | "Eher nein"
    | "Nein, auf keinen Fall";
  "Wie alt sind Sie?":
    | "unter 18"
    | "18-24 Jahre"
    | "25–34 Jahre"
    | "35–44 Jahre"
    | "45–54 Jahre"
    | "55-64 Jahre"
    | "65-74 Jahre"
    | "75 Jahre und älter";
  "Was sind für Sie Gründe, die das Heiraten lohnenswert machen?": string;
  "Was spricht für Sie gegen das Heiraten?": string;
  "Wie ist Ihr persönlicher Beziehungsstatus?":
    | "Ledig"
    | "In einer festen Partnerschaft (nicht verheiratet)"
    | "Verheiratet"
    | "Geschieden / Getrennt lebend"
    | "Verwitwet";
};

export type Response = {
  id: number;
  start: string;
  end: string;
  worthIt:
    | 1 //"Ja, auf jeden Fall"
    | 0.5 //"Eher ja"
    | 0 //"Weiss nicht / Unentschieden"
    | -0.5 //"Eher nein"
    | -1; //"Nein, auf keinen Fall";
  age:
    | "unter 18"
    | "18-24 Jahre"
    | "25-34 Jahre"
    | "35-44 Jahre"
    | "45-54 Jahre"
    | "55-64 Jahre"
    | "65-74 Jahre"
    | "75 Jahre und älter";
  pro: (
    | "Sicherheit / Verlässlichkeit"
    | "Steuerliche Vorteile / Rechtliche Absicherung"
    | "Liebe / Romantik / Symbol der Zusammengehörigkeit"
    | "Familiäre Erwartungen / Tradition"
    | "Gesellschaftliche Anerkennung"
  )[];
  contra: (
    | "Hohe Kosten einer Hochzeit"
    | "Risiko einer schwierigen / teuren Scheidung"
    | "Man kann auch so zusammenleben"
    | "Heirat ist ein veraltetes Modell"
    | "Will persönliche Unabhängigkeit bewahren"
  )[];
  relationshipState:
    | "Ledig"
    | "In einer festen Partnerschaft (nicht verheiratet)"
    | "Verheiratet"
    | "Geschieden / Getrennt lebend"
    | "Verwitwet";
};
