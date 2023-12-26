import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IOrder {
  orderId: mongoose.Schema.Types.UUID;
  customerId: mongoose.Schema.Types.UUID;
  restarentId: mongoose.Schema.Types.UUID;
  trackingId?: mongoose.Schema.Types.UUID;
  paymentId?: mongoose.Schema.Types.UUID;
  orderStatus?: string;
  address: {
    building: string;
    street: string;
    locality: string;
    city: string;
    zipcode: string;
    landmark?: string;
    instructions?: string;
  };
  orderItems: {
    orderId: mongoose.Schema.Types.UUID,
    orderItemId: mongoose.Schema.Types.UUID,
    dish: {
      dishId: mongoose.Schema.Types.UUID,
      name: mongoose.Schema.Types.String,
      dish: string,
      price: string;
    },
    quantity: number;
  }[];
  price: string;
}

export const orderSchema = new Schema<IOrder>({
  orderId: { type: Schema.Types.UUID, require: true },
  customerId: { type: Schema.Types.UUID, require: true },
  restarentId: { type: Schema.Types.UUID, require: true },
  trackingId: { type: Schema.Types.UUID, require: false },
  paymentId: { type: Schema.Types.UUID, require: false },
  orderStatus: { type: Schema.Types.String, require: false },
  address: {
    building: { type: Schema.Types.String, require: true },
    street: { type: Schema.Types.String, require: true },
    locality: { type: Schema.Types.String, require: true },
    city: { type: Schema.Types.String, require: true },
    zipcode: { type: Schema.Types.String, require: true },
    landmark: { type: Schema.Types.String, require: false },
    instructions: { type: Schema.Types.String, require: false }
  },
  orderItems: [{
    orderItemId: { type: Schema.Types.UUID, require: true },
    orderId: { type: Schema.Types.UUID, require: true },
    dish: {
      dishId: { type: Schema.Types.UUID, require: true },
      name: { type: Schema.Types.String, require: true },
      price: { type: Schema.Types.String, require: true }
    },
    quantity: { type: Schema.Types.Number, require: true }
  }],
  price: { type: Schema.Types.String, require: true }
});

export const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
