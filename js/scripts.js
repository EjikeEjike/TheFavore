if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

const { log } = console;

function ready() {
  // remove cart item
  let removeCartItemButton =
    document.getElementsByClassName("cart-items-remove");
  for (let i = 0; i < removeCartItemButton.length; i++) {
    const button = removeCartItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  // handle input change
  let inputElements = document.getElementsByClassName("cart-items-qty");
  for (let i = 0; i < inputElements.length; i++) {
    const inputElement = inputElements[i];
    inputElement.addEventListener("change", inputChanged);
  }

  // handle add to cart
  let addToCartButtons = document.getElementsByClassName("collection-item-btn");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("cart-item-purshase")[0]
    .addEventListener("click", purshaseClicked);
}

function purshaseClicked(e) {
  let cartRow = document.getElementsByTagNameNS("tbody")[0];
  if (!cartRow.hasChildNodes()) {
    alert("Cart is empty");
  } else {
    alert("Cart items purshased");
    cartRow.innerHTML = "";
    updateCartTotal();
  }
}

// add to cart handler
function addToCartClicked(e) {
  const button = e.target;
  const collectionItems = buttonClicked.parentElement.parentElement;
  const title = collectionItems.getElementsByClassName(
    "collection-items-title"
  )[0].textContent;
  const price = collectionItems.getElementsByClassName(
    "collection-items-price"
  )[0].textContent;
  const imgSrc =
    collectionItems.getElementsByClassName("collection-img")[0].src;

  addItemToCart = (item, price, imgSrc);
  updateCartTotal();
}

const addItemToCart = (item, price, imgSrc) => {
  const tbody = document.getElementsByTagName("tbody")[0];
  const tr = document.createElement("tr");
  tr.classList.add(" cart-items");

  // prevent cart items duplicate

  const cartTitleElements = document.getElementsByClassName("cart-items");
  for (let i = 0; i < cartTitleElements.length; i++) {
    const cartTitleElements = cartTitleElements[i];
    console.log(cartTitleElements.textContent);
    if (cartTitleElements.innerText === title) {
      alert("Item is already in the cart list");
      return;
    }
  }
  const cartContent = `
    <td class="cart-items-title">
        <img src=${imgSrc} alt="cart image" width="100px" height="100px" >
        <span class='cart-title'>${title}</span>
    </td>
    <td class='cart-items-price'>${price}</td>
    <td class="class-items-qty-container">
    <input class="cart-items-qty" type="number" value='1'>
    <button class="btn cart-items-remove">REMOVE</button>
    </td>
    `;

  tr.innerHTML = cartContent;
  tbody.appendChild(tr);
  tr.getElementsByClassName("cart-items-remove")[0].addEventListener(
    "click",
    removeCartItem
  );
  tr.getElementsByClassName("cart-items-qty")[0].addEventListener(
    "change",
    inputChanged
  );
};

// input changed handler
function inputChanged(e) {
  const input = e.target;
  if (isNAN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// cart removed handler
function removeCartItem(e) {
  let buttonClicked = e.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// update cart total handler
function updateCartTotal() {
  let cart = document.getElementsByClassName("cart")[0];
  let cartItems = cart.getElementsByClassNames("cart-items");
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElemment =
      cartItem.getElementsByClassName("cart-items-price")[0];
    const qtyElement = cartItem.getElementsByClassName("cart-items-qty")[0];
    const price = parseFloat(priceElemment.innerText.replace("#", ""));
    const qty = qtyElement.value;

    total = total + price * qty;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName(
    "cart-items-total"
  )[0].innerHTML = `Total: #${total}`;
}
