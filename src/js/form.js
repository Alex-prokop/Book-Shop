const form = document.getElementById('order-form');
const completeButton = document.getElementById('complete-btn');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = form.elements['name'].value;
  const surname = form.elements['surname'].value;
  const deliveryDate = form.elements['delivery-date'].value;
  const street = form.elements['street'].value;
  const houseNumber = form.elements['house-number'].value;
  const flatNumber = form.elements['flat-number'].value;
  const paymentType = form.elements['payment-type'].value;

  const gifts = form.elements['gifts[]']
    ? Array.from(form.elements['gifts[]'])
        .filter((el) => el.checked)
        .map((el) => el.value)
    : [];

  const summary = `The order created. The delivery address is ${street} house ${houseNumber} flat ${flatNumber}. Customer ${name} ${surname}.`;

  if (paymentType === 'card') {
    alert(
      `${summary} Payment type: Card. ${
        gifts.length > 0 ? 'Gifts: ' + gifts.join(', ') : ''
      }`
    );
  } else {
    alert(
      `${summary} Payment type: Cash. ${
        gifts.length > 0 ? 'Gifts: ' + gifts.join(', ') : ''
      }`
    );
  }

  form.reset();
  completeButton.disabled = true;
});

form.addEventListener('input', function () {
  validateForm();
});

// Слушатель событий для создания заказа при отправке формы
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validateForm()) {
    createOrder();
  }
});
