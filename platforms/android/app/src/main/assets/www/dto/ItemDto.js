export class ItemDto {
  constructor(code = null, name = '', qty = 0, unitPrice = 0, ean = '', image = '') {
    if (this.isValidated(code, name, qty, unitPrice, ean)) {
      this._code = code;
      this._name = name;
      this._qty = qty;
      this._unitPrice = unitPrice;
      this._ean = ean;
      this._image = image; // New property for storing image
    }
  }

  isValidated(code, name, qty, unitPrice, ean) {
    let isValid = true;

    // Provjera šifre
    if (this.checkCodePattern(code) === false) {
      $('#itemCode-error').text("Šifra artikla je obavezno polje i treba biti u formatu 'I00-001'");
      isValid = false;
    } else {
      $('#itemCode-error').text("");
    }

    // Provjera naziva
    if (name === null || name === '') {
      $('#itemName-error').text("Unesite naziv artikla");
      isValid = false;
    } else if (!/^[a-zA-ZčćžšđČĆŽŠĐ\s]+$/.test(name)) {
      $('#itemName-error').text("Unesite važeći naziv artikla");
      isValid = false;
    } else {
      $('#itemName-error').text("");
    }

    // Provjera količine
    if (qty === null || qty === '' || isNaN(qty) || qty <= 0) {
      $('#itemQty-error').text("Unesite važeću količinu");
      isValid = false;
    } else {
      $('#itemQty-error').text("");
    }

    // Provjera cijene po jedinici
    if (unitPrice === null || unitPrice === '' || isNaN(unitPrice) || unitPrice <= 0) {
      $('#unitPrice-error').text("Unesite važeću cijenu po jedinici");
      isValid = false;
    } else {
      $('#itemUnitPrice-error').text("");
    }

    // Provjera EAN-a
    if (!this.checkEANPattern(ean)) {
      $('#itemEAN-error').text("Unesite važeći EAN kod");
      isValid = false;
    } else {
      $('#itemEAN-error').text("");
    }

    return isValid;
  }

  // EAN validacijski obrazac (na primjer, EAN-13)
  checkEANPattern(ean) {
    let eanPattern = /^\d{13}$/; // EAN-13 je broj s 13 znamenki
    return eanPattern.test(ean);
  }

  checkCodePattern(code) {
    let codePattern = /^I\d{2}-\d{3}$/; // Obrazac šifre 'I00-001'
    return codePattern.test(code);
  }

  // Getteri
  get code() {
    return this._code;
  }

  get name() {
    return this._name;
  }

  get qty() {
    return this._qty;
  }

  get unitPrice() {
    return this._unitPrice;
  }

  get ean() {
    return this._ean;
  }

  get image() {
    return this._image; // Getter for image
  }

  // Setteri
  set code(value) {
    this._code = value;
  }

  set name(value) {
    this._name = value;
  }

  set qty(value) {
    this._qty = value;
  }

  set unitPrice(value) {
    this._unitPrice = value;
  }

  set ean(value) {
    this._ean = value;
  }

  set image(value) {
    this._image = value; // Setter for image
  }

  // Metoda za prikaz objekta kao string
  toString() {
    return `Item { code: ${this._code}, name: ${this._name}, qty: ${this._qty}, unitPrice: ${this._unitPrice}, ean: ${this._ean}, image: ${this._image} }`;
  }
}
