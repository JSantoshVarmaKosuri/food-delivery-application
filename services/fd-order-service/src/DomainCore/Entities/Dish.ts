import { Amount, BaseEntity, DishID } from "@food-delivery-application/fd-common-library";

export class Dish extends BaseEntity<DishID>{
  constructor(
    public readonly dishId: DishID,
    public readonly name: string,
    public readonly price: Amount
  ) {
    super(dishId);
  }
}
