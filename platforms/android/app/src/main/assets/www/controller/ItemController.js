import { ItemDto } from "../dto/ItemDto.js";
import { getAllItems, addItem, isItemExist, removeItem, updateItem } from "../model/ItemModel.js";

clearItemTable();
loadAllItems();
generateNextItemCode();

document.getElementById('add-item').addEventListener('click', addItemHandler);
document.getElementById('remove-item').addEventListener('click', removeItemHandler);
document.getElementById('update-item').addEventListener('click', updateItemHandler);
document.getElementById('getall-item').addEventListener('click', getAllItemsHandler);
document.getElementById('clear-item').addEventListener('click', clearFieldsHandler);
document.getElementById('capture-image').addEventListener('click', captureImageHandler);

document.getElementById('item-table-body').addEventListener('click', function(event) {
    let target = event.target;
    if (target.tagName === 'TD') {
        let row = target.parentNode;
        let code = row.cells[0].textContent;
        let name = row.cells[1].textContent;
        let qty = row.cells[2].textContent;
        let unitPrice = row.cells[3].textContent;
        let ean = row.cells[4].textContent;

        document.getElementById('item-code').value = code;
        document.getElementById('item-name').value = name;
        document.getElementById('item-qty').value = qty;
        document.getElementById('unit-price').value = unitPrice;
        document.getElementById('item-ean').value = ean;
        // Display the image in form
        let imageSrc = row.cells[5].querySelector('img').src;
        document.getElementById('item-image').src = imageSrc;
    }
});

export function loadAllItems() {
    clearItemTable();
    let items = getAllItems();
    items.forEach(item => {
        reloadItemTable(item);
    });
}

function reloadItemTable(item) {
    if (item !== null && item !== undefined && item instanceof ItemDto && item.code !== null && item.code !== undefined) {
        let tableBody = document.getElementById('item-table-body');
        let newRow = tableBody.insertRow();

        let cellCode = newRow.insertCell(0);
        let cellName = newRow.insertCell(1);
        let cellQty = newRow.insertCell(2);
        let cellUnitPrice = newRow.insertCell(3);
        let cellEan = newRow.insertCell(4);
        let cellImage = newRow.insertCell(5); // New cell for image

        cellCode.textContent = item.code;
        cellName.textContent = item.name;
        cellQty.textContent = item.qty;
        cellUnitPrice.textContent = item.unitPrice;
        cellEan.textContent = item.ean;

        //cellEan.style.display = 'none'; //sakrivam jer prelazi rub
        cellEan.classList.add('d-md-table-cell');
        cellEan.classList.add('d-none');

        // Display the image in the table
        let imageElement = document.createElement('img');
        imageElement.src = item.image || ''; // Use image or empty string
        imageElement.classList.add('item-image');
        imageElement.style.width = '50px'; // Resize image for table
        imageElement.style.height = '50px';
        cellImage.appendChild(imageElement);
    }
}

function getAllItemsHandler() {
    event.preventDefault();
    clearItemTable();
    loadAllItems();
}

function addItemHandler() {
    event.preventDefault();
    const code = document.getElementById('item-code').value;
    const name = document.getElementById('item-name').value;
    const qty = document.getElementById('item-qty').value;
    const unitPrice = document.getElementById('unit-price').value;
    const ean = document.getElementById('item-ean').value;
    const image = document.getElementById('item-image').src; // Get image from form

    const item = new ItemDto(code, name, qty, unitPrice, ean);
    item.image = image; // Add image property to item

    try {
        if (!isItemExist(code)) {
            if (confirm("Jeste li sigurni da želite dodati ovaj artikl?")) {
                addItem(item);
                clearItemTable();
                clearFieldsHandler();
                loadAllItems();
                generateNextItemCode();
                alert('Artikl uspješno dodan!');
            }
        } else {
            alert("Artikl već postoji!");
        }
    } catch (error) {
        throw new Error(error);
    }
}

function removeItemHandler() {
    event.preventDefault();
    const code = document.getElementById('item-code').value;

    try {
        if (isItemExist(code)) {
            if (confirm("Jeste li sigurni da želite izbrisati ovaj artikl?")) {
                removeItem(code);
                clearItemTable();
                clearFieldsHandler();
                loadAllItems();
            }
        } else {
            alert("Artikl nije pronađen!");
        }
    } catch (error) {
        throw new Error(error);
    }
}

function updateItemHandler() {
    event.preventDefault();
    const code = document.getElementById('item-code').value;
    const name = document.getElementById('item-name').value;
    const qty = document.getElementById('item-qty').value;
    const unitPrice = document.getElementById('unit-price').value;
    const ean = document.getElementById('item-ean').value;
    const image = document.getElementById('item-image').src; // Get image from form

    const updatedItem = new ItemDto(code, name, qty, unitPrice, ean);
    updatedItem.image = image; // Add image to updated item

    try {
        if (isItemExist(code)) {
            if (confirm("Jeste li sigurni da želite ažurirati ovaj artikl?")) {
                updateItem(updatedItem);
                clearItemTable();
                clearFieldsHandler();
                loadAllItems();
            }
        } else {
            alert("Artikl nije pronađen!");
        }
    } catch (error) {
        throw new Error(error);
    }
}

function generateNextItemCode() {
    let items = getAllItems();
    let lastItem = items[items.length - 1];

    if (!lastItem || !lastItem.code) {
        lastItem = { code: "I00-000" };
    }

    let lastCode = lastItem.code;
    let codeParts = lastCode.split("-");

    if (codeParts.length === 2) {
        let prefix = codeParts[0];
        let number = parseInt(codeParts[1], 10) + 1;
        let nextCode = prefix + "-" + number.toString().padStart(3, "0");

        document.getElementById('item-code').value = nextCode;
    } else {
        console.error("Neispravan format šifre artikla: " + lastCode);
    }
}

function clearFieldsHandler() {
    event.preventDefault();
    document.getElementById('item-code').value = "";
    document.getElementById('item-name').value = "";
    document.getElementById('item-qty').value = "";
    document.getElementById('unit-price').value = "";
    document.getElementById('item-ean').value = "";
    document.getElementById('item-image').src = ""; // Clear image preview

    const errorTags = document.querySelectorAll('p.error');
    errorTags.forEach(tag => tag.textContent = '');

    generateNextItemCode();
}

function clearItemTable() {
    let tableBody = document.getElementById('item-table-body');
    tableBody.innerHTML = "";
}

// Camera capture handler
function captureImageHandler() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        targetWidth: 300,
        targetHeight: 300
    });
    //destinationType: Camera.DestinationType.DATA_URL,
    //destinationType: Camera.DestinationType.FILE_URI,

    function onSuccess(imageData) {
        console.log("Captured image data:", imageData); // Debugging log
        //let image = "data:image/png;base64,'" + imageData + "'";
        document.getElementById('item-image').src = imageData;
        //document.getElementById('item-image').alt = imageData;
    }


    function onFail(message) {
          console.error("Camera failed with error:", message);
        alert("Camera failed: " + message);
    }
}