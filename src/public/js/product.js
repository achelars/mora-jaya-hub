// public/js/product.js

function updatePrice(basePrice) {
    let additionalCost = 0;

    const customizations = document.querySelectorAll('.customization-option');
    customizations.forEach(option => {
        const selectedOption = option.options[option.selectedIndex];
        additionalCost += parseFloat(selectedOption.getAttribute('data-cost'));
    });

    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const totalPrice = ((basePrice + additionalCost) * quantity).toFixed(2);
    document.getElementById('total-price').textContent = `$${totalPrice}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const basePrice = parseFloat(document.getElementById('total-price').getAttribute('data-base-price'));
    updatePrice(basePrice);

    const customizations = document.querySelectorAll('.customization-option');
    customizations.forEach(option => {
        option.addEventListener('change', () => updatePrice(basePrice));
    });

    const quantityInput = document.getElementById('quantity');
    quantityInput.addEventListener('input', () => updatePrice(basePrice));
});
