import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IAddress {
  building: string;
  street: string;
  locality: string;
  city: string;
  zipcode: string;
  landmark?: string;
  instructions?: string;
}

export const addressSchema = new Schema<IAddress>({
  building: { type: Schema.Types.String, require: true },
  street: { type: Schema.Types.String, require: true },
  locality: { type: Schema.Types.String, require: true },
  city: { type: Schema.Types.String, require: true },
  zipcode: { type: Schema.Types.String, require: true },
  landmark: { type: Schema.Types.String, require: false },
  instructions: { type: Schema.Types.String, require: false }
});

//export const AddressModel = mongoose.model<IAddress>('Address', addressSchema);
