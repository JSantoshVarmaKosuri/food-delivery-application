import mongoose from 'mongoose';
import { IDish, dishSchema } from './DishModel';
const { Schema } = mongoose;

export interface IOrderItem {
  orderId: mongoose.Schema.Types.UUID,
  orderItemId: mongoose.Schema.Types.UUID,
  dish: IDish,
  quantity: number;
}

export const orderItemSchema = new Schema<IOrderItem>({
  orderItemId: { type: Schema.Types.UUID, require: true },
  orderId: { type: Schema.Types.UUID, require: true },
  dish: dishSchema,
  quantity: { type: Schema.Types.Number, require: true }
});

//export const OrderItemModel = mongoose.model<IOrderItem>('OrderItem', orderItemSchema);
