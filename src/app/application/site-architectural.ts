import { Commentaire } from "./commentaire";

export interface SiteArchitectural {
  id: string;
  nom: string;
  photo: string;
  localisation: string;
  dateConstruction: Date;
  prixEntree: number;
  description: string;
  commentaires?: Commentaire[];
}
