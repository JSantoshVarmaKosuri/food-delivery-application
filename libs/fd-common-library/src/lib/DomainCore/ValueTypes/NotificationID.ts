import { BaseID } from "../Common/BaseID";

export class NotificationID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
