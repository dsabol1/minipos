export class CustomerDto {

  constructor(id = null, name = '', address = '', city = '') {

    if(this.isValidated(id, name, address, city)) {
      this._id = id;
      this._name = name;
      this._address = address;
      this._city = city;
    }
  
  }

  isValidated(id, name, address, city) {
    let isValid = true;

    if (this.checkIdPattern(id) === false) {
        $('#cusId-error').text("Šifra artikla je obavezno polje i treba biti u formatu 'C00-001'");
        isValid = false;
    } else  {
        $('#cusId-error').text("");
    }

    if (name === null || name === '') {
        $('#cusName-error').text("Molimo unesite ime kupca");
        isValid = false;
    } else if (!/^[a-zA-ZčćžšđČĆŽŠĐ\s]+$/.test(name)) {
      $('#cusName-error').text("Molimo unesite valjano ime kupca");
      isValid = false;
    } else {
        $('#cusName-error').text("");
    }

    if (address === null || address === '') {
        $('#cusAddress-error').text("Molimo unesite adresu kupca");
        isValid = false;
    } else if (address.length < 5) {
        console.log(address.length);
        $('#cusAddress-error').text("Molimo unesite valjanu adresu kupca");
        isValid = false;
    } else {
        $('#cusAddress-error').text("");
    }

    if (city === null || city === '') {
      $('#cusCity-error').text("Molimo unesite grad kupca");
      isValid = false;
    } else {
      $('#cusCity-error').text("");
    }

    return isValid;
  }

  checkIdPattern(id) {  
    let idPattern = /^C\d{2}-\d{3}$/;
    return idPattern.test(id);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get city() {
    return this._city;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  set address(value) {
    this._address = value;
  }

  set city(value) {
    this._city = value;
  }

 toString() {
    return `Customer { id: ${this._id}, name: ${this._name}, address: ${this._address}, city: ${this.city} }`;
  }
}