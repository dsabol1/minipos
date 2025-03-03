import { ItemDto } from "../dto/ItemDto.js";
import { items } from "../db/DB.js";

export function getAllItems() {
  return items;
}

export function addItem(item) {
  // Provjerite je li predmet instanca ItemDto i da su sva obavezna polja, uključujući EAN, valjana
  if (item instanceof ItemDto && 
      item.code !== null && item.code !== '' && 
      item.name !== null && item.name !== '' && 
      item.qty !== null && item.qty > 0 && 
      item.unitPrice !== null && item.unitPrice > 0 &&
      item.ean !== null && item.ean !== '' && item.ean.length === 13) {  // Provjera valjanosti EAN-a (mora biti 13 znamenki)
    items.push(item);
  } else {
    throw new Error('Nepostojeci proizvod');
  }
}

export function removeItem(code) {
  const index = items.findIndex(item => item.code === code);
  if (index !== -1) {
    items.splice(index, 1);
  }
}

export function isItemExist(code) {
  return items.find(item => item.code === code) !== undefined;
}

export function updateItem(updatedItem) {
  const index = items.findIndex(item => item.code === updatedItem.code);
  if (index !== -1) {
    // Provjerite ažurirani proizvod (uključujući EAN)
    if (updatedItem.ean !== null && updatedItem.ean !== '' && updatedItem.ean.length === 13) {
      items[index] = updatedItem;
      alert('Proizvod uspješno ažuriran!');
    } else {
      throw new Error('Nepostojeći EAN');
    }
  } else {
    throw new Error('Proizvod nije pronađen');
  }
}
