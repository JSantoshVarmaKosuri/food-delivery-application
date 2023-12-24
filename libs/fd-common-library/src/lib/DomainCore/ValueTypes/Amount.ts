import Big = require("big.js");
Big.DP = 2;
Big.RM = Big.roundHalfEven;

export class Amount {
  private _amount: Big;
  static readonly Zero: Big = new Big(0.00);

  constructor(amount: number | Big | string) {
    Amount.setScale();
    if (typeof amount === "number" || typeof amount === "string") {
      this._amount = new Big(amount);
    } else {
      this._amount = amount;
    }
  }

  get bvalue() {
    return this._amount;
  }

  get value() {
    return this._amount.toFixed(2);
  }

  addAmount(amount: Big) {
    this._amount = new Big(this._amount.add(amount))
  }

  removeAmount(amount: Big) {
    this._amount = new Big(this._amount.sub(amount))
  }

  multiplyAmount(multiplier: number) {
    return new Amount(this._amount.mul(multiplier));
  }

  isEqual(amount: Big) {
    return this._amount.eq(amount);
  }

  isZero() {
    return this._amount.eq(Amount.Zero);
  }

  isGreaterThanZero() {
    return this._amount.gt(Amount.Zero);
  }

  isSmallerThanZero() {
    return this._amount.lt(Amount.Zero);
  }

  isGreaterThanAmount(amount: Big) {
    return this._amount.gt(amount);
  }

  isSmallerThanAmount(amount: Big) {
    return this._amount.lt(amount);
  }

  static setScale() {
    Big.DP = 2;
    Big.RM = Big.roundHalfEven;
  }

}
