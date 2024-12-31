const form = document.getElementById('itemForm');
const tableBody = document.getElementById('itemTableBody');
const summary = document.getElementById('summary');

let items = [];
let subtotal = 0;
let totalTax = 0;

const updateSummary = () => {
    const grandTotal = subtotal + totalTax;
    summary.textContent = `Subtotal: $${subtotal.toFixed(2)} | Total Tax: $${totalTax.toFixed(2)} | Grand Total: $${grandTotal.toFixed(2)}`;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
    const itemTax = parseFloat(document.getElementById('itemTax').value);

    const itemTotalWithoutTax = itemPrice * itemQuantity;
    const itemTaxAmount = (itemTax / 100) * itemTotalWithoutTax;
    const itemTotalWithTax = itemTotalWithoutTax + itemTaxAmount;

    items.push({
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        tax: itemTax,
        totalWithTax: itemTotalWithTax,
    });

    subtotal += itemTotalWithoutTax;
    totalTax += itemTaxAmount;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${itemName}</td>
        <td>$${itemPrice.toFixed(2)}</td>
        <td>${itemQuantity}</td>
        <td>${itemTax.toFixed(2)}%</td>
        <td>$${itemTotalWithTax.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);

    updateSummary();
    form.reset();
});
