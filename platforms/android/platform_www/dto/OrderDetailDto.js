export class OrderDetailDto {
  constructor(orderId, itemCode, itemName, itemPrice, itemQtyOnHand, orderedQty, totalPrice) {
      this._orderId = orderId;
      this._itemCode = itemCode;
      this._itemName = itemName;
      this._itemPrice = itemPrice;
      this._itemQtyOnHand = itemQtyOnHand;
      this._orderedQty = orderedQty;
      this._totalPrice = totalPrice;
  }

  get orderId() {
      return this._orderId;
  }

  set orderId(value) {
      if (value) {
          this._orderId = value;
      } else {
          throw new Error("ID narudžbe je obavezan");
      }
  }

  get itemCode() {
      return this._itemCode;
  }

  set itemCode(value) {
      if (value) {
          this._itemCode = value;
      } else {
          throw new Error("Šifra artikla je obavezna");
      }
  }

  get itemName() {
      return this._itemName;
  }

  set itemName(value) {
      this._itemName = value;
  }

  get itemPrice() {
      return this._itemPrice;
  }

  set itemPrice(value) {
      this._itemPrice = value;
  }

  get itemQtyOnHand() {
      return this._itemQtyOnHand;
  }

  set itemQtyOnHand(value) {
      this._itemQtyOnHand = value;
  }

  get orderedQty() {
      return this._orderedQty;
  }

  set orderedQty(value) {
      if (value > 0) {
          this._orderedQty = value;
      } else {
          throw new Error("Kupljena količina mora biti veća od nule");
      }
  }

  get totalPrice() {
      return this._totalPrice;
  }

  set totalPrice(value) {
      this._totalPrice = value;
  }

  isValid() {
      let isValid = true;
      if (!this.orderId) {
          console.error("ID računa je obavezan");
          isValid = false;
      }
      if (!this.itemCode) {
          console.error("Šifra proizvoda je obavezna");
          isValid = false;
      }
      if (this.orderedQty <= 0) {
          console.error("Kupljena količina mora biti veća od nule");
          isValid = false;
      }
      return isValid;
  }
}
