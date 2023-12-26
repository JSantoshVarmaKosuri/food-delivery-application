import { Order } from "../../DomainCore/Entities/Order"
import { OrderItem } from "../../DomainCore/Entities/OrderItem"

export const domainOrderToOrderModel = (order: Order) => {
  return {
    orderId: order.id.id.toString(),
    customerId: order.customerId.id.toString(),
    restarentId: order.restarentId.id.toString(),
    trackingId: order.trackingId?.id.toString(),
    paymentId: order.paymentId?.id.toString(),
    orderStatus: order.orderStatus?.toString(),
    address: {
      building: order.address.building,
      street: order.address.street,
      locality: order.address.locality,
      city: order.address.city,
      zipcode: order.address.zipcode,
      landmark: order.address.landmark,
      instructions: order.address.instructions
    },
    orderItems: order.orderItems.map((orderItem: OrderItem) => {
      return {
        orderItemId: orderItem.id.id.toString(),
        orderId: orderItem.orderId.id.toString(),
        dish: {
          dishId: orderItem.dish.id.id.toString(),
          name: orderItem.dish.name,
          price: orderItem.dish.price.value
        },
        quantity: orderItem.quantity
      }
    }),
    price: order.price.value
  }
}
