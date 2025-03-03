import { customers } from '../db/DB.js';
import { CustomerDto } from '../dto/CustomerDto.js';



export function getAllCustomers(){
  return customers;
}

export function AddCustomer(customer){

  if (customer instanceof CustomerDto && customer.id !== null && customer.id !== '' && customer.name !== null && customer.name !== '' && customer.address !== null && customer.address !== '' && customer.city !== null && customer.city !== '' ){

      customers.push(customer);
     
  } else {
    throw new Error ('Neispravan kupac');
  }

}

export function RemoveCustomer(id){
  const index = customers.findIndex(customer => customer.id === id);
  if (index !== -1) {
    customers.splice(index, 1);
  }
}

export function isCustomerExist(id){
  return customers.find(customer => customer.id === id) !== undefined;
}

export function UpdateCustomer(updateCustomer){
  const index = customers.findIndex(customer => customer.id === updateCustomer.id);
  if (index !== -1) {
    customers[index] = updateCustomer;
    alert('Kupac uspješno ažuriran!');
  } else {
    throw new Error('Kupac nije pronađen');
  }
}
