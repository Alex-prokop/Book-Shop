const wrap = document.querySelector('.wrap');

// ----------------Header________________________

const header = document.createElement('header');
header.classList.add('header');

const logo = document.createElement('img');
logo.src = '../img/books.png';
logo.alt = 'book shop';
logo.classList.add('logo');
header.appendChild(logo);

const headerTitle = document.createElement('h1');
headerTitle.textContent = 'BOOK SHOP';
headerTitle.classList.add('header-title');
header.appendChild(headerTitle);

document.body.prepend(header);

// ----------------Section____________________________

const section = document.createElement('section');
section.classList.add('section');

const catalog = document.createElement('div');
catalog.classList.add('catalog');

const divTitleCatalog = document.createElement('div');
divTitleCatalog.classList.add('div-title-catalog');
catalog.appendChild(divTitleCatalog);

const catalogTitle = document.createElement('h2');
catalogTitle.textContent = 'Book Catalog';
catalogTitle.classList.add('title-catalog');
divTitleCatalog.appendChild(catalogTitle);

const order = document.createElement('div');
order.classList.add('order');

// --------------Drag-and-drop-------------------
order.addEventListener('drop', (event) => {
  const book = event.dataTransfer.getData('text/plain');
  updateCart();
  addToCart(JSON.parse(book));
});
order.addEventListener('dragover', (event) => {
  event.preventDefault();
});

const divTitleOrder = document.createElement('div');
divTitleOrder.classList.add('div-title-order');
order.appendChild(divTitleOrder);

const orderCart = document.createElement('div');
orderCart.classList.add('order-cart');
order.appendChild(orderCart);

const orderTitle = document.createElement('h2');
orderTitle.textContent = 'Order Catalog';
orderTitle.classList.add('title-order');
divTitleOrder.appendChild(orderTitle);

section.appendChild(catalog);
section.appendChild(order);

document.body.appendChild(section);

// ----------------Footer________________________

var footer = document.createElement('footer');
footer.classList.add('footer');

var container = document.createElement('div');
container.classList.add('footer-container');
footer.appendChild(container);

var githubDiv = document.createElement('div');
githubDiv.classList.add('github');
container.appendChild(githubDiv);

var githubLink = document.createElement('a');
githubLink.href = 'https://github.com/Alex-prokop';
githubLink.classList.add('github');
githubLink.textContent = 'Alex-prokop';
githubDiv.appendChild(githubLink);

var rigDiv = document.createElement('div');
rigDiv.classList.add('rig');
rigDiv.textContent = '© 2023';
container.appendChild(rigDiv);

var rssLink = document.createElement('a');
rssLink.href = 'https://rs.school/js/';
rssLink.classList.add('rss');
container.appendChild(rssLink);

document.body.appendChild(footer);

// ----------------Catalog________________________
let catalogContent = document.createElement('div');
catalogContent.classList.add('catalogContent');
catalog.append(catalogContent);

fetch('../pages/books.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    generateBooksCards(data);
  });

// функция для генерации карточек книг
function generateBooksCards(data) {
  const booksEl = document.querySelector('.catalogContent');

  // создаем Document Fragment, чтобы добавлять карточки книг
  const fragment = document.createDocumentFragment();

  let cardId = 1;
  // проходимся по массиву объектов книг и генерируем для каждого объекта карточку
  data.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('draggable', true);

    bookCard.id = `bookCard-${cardId}`;
    cardId++;

    const divImage = document.createElement('div');
    divImage.classList.add('div-image');
    bookCard.appendChild(divImage);

    const bookImage = document.createElement('img');
    bookImage.classList.add('book-image');
    bookImage.src = book.imageLink;
    bookImage.alt = book.title;
    divImage.appendChild(bookImage);

    const bookTitle = document.createElement('h2');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `Author: ${book.author}`;
    bookCard.appendChild(bookAuthor);

    const bookPrice = document.createElement('p');
    bookPrice.classList.add('book-price');
    bookPrice.textContent = `Price: ${book.price}$`;
    bookCard.appendChild(bookPrice);

    const bookShowMoreBtn = document.createElement('button');
    bookShowMoreBtn.classList.add('book-show-more-btn');
    bookShowMoreBtn.textContent = 'Show More';
    bookCard.appendChild(bookShowMoreBtn);

    const bookAddToCartBtn = document.createElement('button');
    bookAddToCartBtn.classList.add('book-add-to-cart-btn');
    bookAddToCartBtn.textContent = 'Add to Cart';
    bookAddToCartBtn.addEventListener('click', () => {
      addToCart(book);
    });
    bookCard.appendChild(bookAddToCartBtn);

    fragment.appendChild(bookCard);

    bookShowMoreBtn.addEventListener('click', () => {
      const popup = document.createElement('div');
      popup.classList.add('popup');

      const popupTitle = document.createElement('h2');
      popupTitle.textContent = `${book.author}`;

      const popupCloseBtn = document.createElement('button');

      popupCloseBtn.innerHTML = '<span>&times;</span>';

      popupCloseBtn.addEventListener('click', () => {
        popup.remove();
      });

      const popupContent = document.createElement('p');
      popupContent.textContent = `${book.description}`;

      popup.appendChild(popupTitle);
      popup.appendChild(popupCloseBtn);
      popup.appendChild(popupContent);

      document.body.appendChild(popup);
    });

    bookCard.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', JSON.stringify(book));
    });
  });

  catalogContent.appendChild(fragment);
}
// ---------------Cart______________________

const cart = [];

function addToCart(book) {
  // Добавляем книгу в корзину
  cart.push(book);

  // Обновляем содержимое корзины и ее стоимость
  updateCart();
}

function removeBookFromCart(bookId) {
  // Удаляем книгу из корзины по ее идентификатору
  const index = cart.findIndex((book) => book.id === bookId);
  cart.splice(index, 1);

  // Обновляем содержимое корзины и ее стоимость
  updateCart();
  const btnConfirm = document.createElement('button');
}

function updateCart() {
  const cartContainer = document.createElement('div');
  cartContainer.classList.add('cart-container');
  orderCart.appendChild(cartContainer);

  const cartTitle = document.createElement('h3');
  cartTitle.textContent = 'Cart';
  cartContainer.appendChild(cartTitle);

  const btnConfirm = document.createElement('div');
  btnConfirm.classList.add('btn-confirm');

  const confirmLink = document.createElement('a');
  confirmLink.setAttribute('href', '../pages/form/form.html');
  confirmLink.classList.add('confirm-link');
  confirmLink.innerText = 'Confirm';
  btnConfirm.appendChild(confirmLink);

  const cartItems = document.createElement('biv');
  cartItems.classList.add('cart-items');

  cartItems.innerHTML = '';

  let totalPrice = 0;

  cart.forEach((book) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = '<span>&times;</span>';
    removeBtn.addEventListener('click', () => removeBookFromCart(book.id));
    cartItem.appendChild(removeBtn);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = `Author: ${book.author}`;
    cartItem.appendChild(bookAuthor);

    const bookTitle = document.createElement('h4');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    cartItem.appendChild(bookTitle);

    const bookPrice = document.createElement('p');
    bookPrice.classList.add('book-price');
    bookPrice.textContent = `Price: ${book.price}$`;
    cartItem.appendChild(bookPrice);

    cartItems.appendChild(cartItem);

    totalPrice += book.price;
  });

  const totalPriceElement = document.createElement('div');
  totalPriceElement.classList.add('total-price');
  totalPriceElement.textContent = `Total Price: ${totalPrice}$`;

  cartContainer.appendChild(cartItems);
  cartContainer.appendChild(totalPriceElement);
  cartContainer.appendChild(btnConfirm);

  //Заменяем старый элемент корзины обновленным
  const oldCart = document.querySelector('.cart-container');
  orderCart.replaceChild(cartContainer, oldCart);
}

section.appendChild(order);

// ---------------Pop-Up______________________

function showDescriptionPopup() {
  showMoreBtn.addEventListener('click', function () {
    popup.style.display = 'block';
  });

  closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });
}
