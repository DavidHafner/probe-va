import type { RawResponse, Response } from "~/types/response.type";

export default function (rawResponse: RawResponse) {
  return {
    id: rawResponse.Id,
    start: rawResponse.Startzeit,
    end: rawResponse.Fertigstellungszeit,
    worthIt: getWorthItValue(
      rawResponse[
        "Sind Sie persönlich der Meinung, dass es sich lohnt zu heiraten?"
      ],
    ),
    age: rawResponse["Wie alt sind Sie?"].replace("–", "-"),
    pro: rawResponse[
      "Was sind für Sie Gründe, die das Heiraten lohnenswert machen?"
    ].split(";"),
    contra: rawResponse["Was spricht für Sie gegen das Heiraten?"].split(";"),
    relationshipState:
      rawResponse["Wie ist Ihr persönlicher Beziehungsstatus?"],
  } as Response;
}

function getWorthItValue(
  input:
    | "Ja, auf jeden Fall"
    | "Eher ja"
    | "Weiss nicht / Unentschieden"
    | "Eher nein"
    | "Nein, auf keinen Fall",
) {
  switch (input) {
    case "Ja, auf jeden Fall":
      return 1;
    case "Eher ja":
      return 0.5;
    case "Weiss nicht / Unentschieden":
      return 0;
    case "Eher nein":
      return -0.5;
    case "Nein, auf keinen Fall":
      return -1;
  }
  return 0;
}
