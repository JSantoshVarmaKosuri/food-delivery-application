import { BaseID } from "../Common/BaseID";

export class TrackingID<T> extends BaseID<T> {
  constructor(id: T) {
    super(id);
  }
}
