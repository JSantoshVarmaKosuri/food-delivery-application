import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IDish {
  dishId: mongoose.Schema.Types.UUID,
  name: mongoose.Schema.Types.String,
  dish: string,
  price: string;
}

export const dishSchema = new Schema<IDish>({
  dishId: { type: Schema.Types.UUID, require: true },
  name: { type: Schema.Types.String, require: true },
  price: { type: Schema.Types.String, require: true }
});

//export const DishModel = mongoose.model<IDish>('Dish', dishSchema);
