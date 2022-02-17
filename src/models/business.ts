import { Schema, model } from "mongoose";

export interface IBusiness {
  id: string;
  name: string;
  image: string;
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

const businessSchema = new Schema<IBusiness>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

export const BusinessModel = model<IBusiness>("Business", businessSchema);

// export class Business {
//   constructor(public id: string, public name: string) {}
// }
