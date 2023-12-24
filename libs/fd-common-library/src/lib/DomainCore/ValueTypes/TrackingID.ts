import { BaseID } from "../Common/BaseID";

export class TrackingID extends BaseID<string> {
  constructor(id: string) {
    super(id);
  }
}
