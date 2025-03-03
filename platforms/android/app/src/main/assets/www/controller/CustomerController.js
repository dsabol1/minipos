import { CustomerDto } from "../dto/CustomerDto.js";
import { getAllCustomers, AddCustomer, isCustomerExist, RemoveCustomer, UpdateCustomer } from "../model/CustomerModel.js";

clearTable();
loadAllCustomers();
generateNextCustomerID();

document.getElementById('save-cus').addEventListener('click', addCustomer);
document.getElementById('clear').addEventListener('click', clearFields);
document.getElementById('remove-cus').addEventListener('click', removeCustomer);
document.getElementById('update-cus').addEventListener('click', updateCustomer);
document.getElementById('getall-cus').addEventListener('click', getAll);

document.getElementById('cus-table-body').addEventListener('click', function(event) {
  let target = event.target;
  if (target.tagName === 'TD') {
    let row = target.parentNode;
    let id = row.cells[0].textContent;
    let name = row.cells[1].textContent;
    let address = row.cells[2].textContent;
    let city = row.cells[3].textContent;

    document.getElementById('cus-ID').value = id;
    document.getElementById('cus-name').value = name;
    document.getElementById('cus-address').value = address;
    document.getElementById('cus-city').value = city;
  }
});

function loadAllCustomers() {
  clearTable();
  let customers = getAllCustomers();
  customers.forEach(
    customer => {
      reloadTable(customer);
    }
  );
}

function reloadTable(customer) {
  if (customer !== null && customer !== undefined && customer instanceof CustomerDto && customer._id !== null && customer._id !== undefined) {
    let tableBody = document.getElementById('cus-table-body');
    let newRow = tableBody.insertRow();

    let cellId = newRow.insertCell(0);
    let cellName = newRow.insertCell(1);
    let cellAddress = newRow.insertCell(2);
    let cellCity = newRow.insertCell(3);

    cellId.textContent = customer._id;
    cellName.textContent = customer._name;
    cellAddress.textContent = customer._address;
    cellCity.textContent = customer._city;
  }
}

function getAll() {
  event.preventDefault();
  clearTable();
  loadAllCustomers();
}

function addCustomer() {
  event.preventDefault();
  const id = document.getElementById('cus-ID').value;
  const name = document.getElementById('cus-name').value;
  const address = document.getElementById('cus-address').value;
  const city = document.getElementById('cus-city').value;

  const customer = new CustomerDto(
    id,
    name,
    address,
    city
  );

  try {
    if (!isCustomerExist(id)) {
      if (confirm("Sigurno želite dodati ovog kupca?")) {
        AddCustomer(customer);
        clearTable();
        clearFields();
        loadAllCustomers();
        generateNextCustomerID();
        alert('Kupac uspješno spremljen!');
      }
    } else {
      alert("Kupac već postoji!");
    }

  } catch (error) {
    throw new Error(error);
  }
}

function removeCustomer() {
  event.preventDefault();
  const id = document.getElementById('cus-ID').value;

  try {
    if (isCustomerExist(id)) {
      if (confirm("Sigurno želite obrisati kupca?")) {
        RemoveCustomer(id);
        clearTable();
        clearFields();
        loadAllCustomers();
      }
    } else {
      alert("Ne mogu pronaći kupca!");
    }
  } catch (error) {
    throw new Error(error);
  }
}

function updateCustomer() {
  event.preventDefault();

  const id = document.getElementById('cus-ID').value;
  const name = document.getElementById('cus-name').value;
  const address = document.getElementById('cus-address').value;
  const city = document.getElementById('cus-city').value;

  const updatedCustomer = new CustomerDto(
    id,
    name,
    address,
    city
  );

  try {
    if (isCustomerExist(id)) {
      if (confirm("Sigurno želite ažurirati kupca?")) {
        UpdateCustomer(updatedCustomer);
        clearTable();
        clearFields();
        loadAllCustomers();
      }
    } else {
      alert("Ne mogu pronaći kupca!");
    }
  } catch (error) {
    throw new Error(error);
  }
}

function generateNextCustomerID() {
  let customers = getAllCustomers();
  let lastCustomer = customers[customers.length - 1];
  let lastID = lastCustomer ? lastCustomer._id : "C00-000";
  let idParts = lastID.split("-");
  let prefix = idParts[0];
  let number = parseInt(idParts[1]) + 1;
  let nextID = prefix + "-" + number.toString().padStart(3, "0");

  document.getElementById('cus-ID').value = nextID;
}

function clearFields() {
  event.preventDefault();
  document.getElementById('cus-ID').value = "";
  document.getElementById('cus-name').value = "";
  document.getElementById('cus-address').value = "";
  document.getElementById('cus-city').value = "";

  const errorTags = document.querySelectorAll('p.error');
  errorTags.forEach(tag => tag.textContent = '');

  generateNextCustomerID();
}

function clearTable() {
  let tableBody = document.getElementById('cus-table-body');
  tableBody.innerHTML = "";
}
