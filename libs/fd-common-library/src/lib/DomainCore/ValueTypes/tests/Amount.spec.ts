import { Amount } from "@food-delivery-application/fd-common-library"
import Big = require("big.js");

describe('Amount - ValueType - Test Suite', () => {
  it('should create a new values with Amount type', () => {
    const amount = new Amount("23.00");

    expect(amount.bvalue).toBeInstanceOf(Big);
    expect(amount.value).toBe("23.00");
  });

  it('should add a provided amount to existing amount', () => {
    const amount = new Amount("23.00");
    const amountAdditional = new Amount(45.00);

    amount.addAmount(amountAdditional.bvalue);

    expect(amount.bvalue).toBeInstanceOf(Big);
    expect(amount.value).toBe((23.00 + 45.00).toFixed(2).toString());
  });

  it('should substract a provided amount to existing amount', () => {
    const amount = new Amount(23.00);
    const amountAdditional = new Amount(45.00);

    amount.removeAmount(amountAdditional.bvalue);

    expect(amount.bvalue).toBeInstanceOf(Big);
    expect(amount.value).toBe((23.00 - 45.00).toFixed(2).toString());
  });

  it('should give a multiplier of amount', () => {
    const amount = new Amount("23.00");

    const actual = amount.multiplyAmount(5);

    expect(actual.bvalue).toBeInstanceOf(Big);
    expect(actual.value).toBe((23.00 * 5).toFixed(2).toString());
  });

  it('should check if all helper methods are as expected', () => {
    const amount = new Amount("23.00");
    const amountS = new Amount("45.00");

    expect(amount.bvalue).toBeInstanceOf(Big);
    expect(amount.isEqual(amount.bvalue)).toBeTruthy();
    expect(amount.isZero()).toBeFalsy();
    expect(amount.isGreaterThanZero()).toBeTruthy();
    expect(amount.isGreaterThanAmount(amountS.bvalue)).toBeFalsy();
    expect(amount.isSmallerThanAmount(amountS.bvalue)).toBeTruthy();
  });
});
