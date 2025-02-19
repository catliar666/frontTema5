export interface Munieca {
    _id: string; // MongoDB usa _id en lugar de id
    Nombre: string;
    TipoDeMonstruo: string;
    FechaDeLanzamiento: string;
    CiudadNatal?: string; // Puede estar vacío
    Edad: number;
    Foto: string;
  }
  