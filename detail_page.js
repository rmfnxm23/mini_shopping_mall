let storage = [];
let productId = ""; //?
window.onload = function () {
  const base_data = JSON.parse(localStorage.getItem("cart"));
  storage = base_data || [];

  // url에서 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  // 상품 id로 파라미터를 가져오게 지정
  const productId = urlParams.get("product_id");

  // localstorage에서 데이터 가져오기
  const _data = JSON.parse(window.localStorage.getItem("shop_local_data"));

  // 데이터에서 파라미터와 일치한 상품 id 찾기
  const product = _data.find((x) => x.id === productId);

  // 상품의 정보를 상세페이지에 나타내기
  if (product) {
    const product_detail = document.querySelector("#product_detail");
    product_detail.innerHTML = `
            <div class="item_img">
             <img src="${product.img}" alt="${product.name}" />
            </div>
            <div class="item_info">
              <div class="item_name">${product.name}</div>
              <div class="item_price">${product.price} 원</div>
              <div class="item_details">${product.details}</div>
              <div class="button_box">
               <button class="add_to_cart_btn" onclick="cart_click(number)">장바구니</button>
               <button class="purchase" onclick="alert_show()">바로구매</button>
              <div>
            </div>

          `;
  } else {
    document.querySelector(
      "#product_detail"
    ).innerHTML = `<div class="noItem">상품을 찾을 수 없습니다.</div>`;
  }

  // const cart2 = JSON.parse(window.localStorage.getItem("cart"));
  // console.log("1", cart2);

  // console.log(storage.length);
  // const count = storage.length;
  // const cart_count = document.querySelector(".cart_count");
  // cart_count.innerText = count;
  // console.log(cart_count, "1");
  // updateCartCount();

  // const count = storage.length;
  // const cart_count = document.querySelector(".cart_count");

  // if (cart_count) {
  //   console.log("되니");
  //   cart_count.innerText = count;
  // } else {
  //   console.log("안되니");
  // }
};
console.log(productId, "------------");
// 장바구니 카트 숫자를 담아줘야함. 초기화 숫자는 0이다
let number = 0;
// 장바구니 클릭 시
const cart_click = () => {
  // url에서 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  // 상품 id로 파라미터를 가져오게 지정
  const productId = urlParams.get("product_id");
  console.log(productId);

  // localstorage에서 데이터 가져오기
  const _data = JSON.parse(window.localStorage.getItem("shop_local_data"));

  // storage "cart"에 한 품목의 상세페이지에서 쌓이는 것은 되지만 다른 페이지의 상품이 담기지 않았다.
  // cart에 빈 배열이거나 값이 있을 때를 명시
  const storage = JSON.parse(window.localStorage.getItem("cart")) || [];
  // console.log(storage);

  // 데이터에서 파라미터와 일치한 상품 id 찾기
  const product = _data.find((x) => x.id === productId);
  const cart = {
    id: product.id,
    img: product.img,
    name: product.name,
    price: product.price,
    details: product.details,
  };

  storage.push(cart);
  localStorage.setItem("cart", JSON.stringify(storage));

  // // 장바구니 아이콘 카운트 (1)
  // const cart_count = document.querySelector(".cart_count");

  // let number = cart_count.innerText;

  // if (number) {
  //   number = parseInt(number) + 1;

  //   cart_count.innerText = number;

  //   const storage = JSON.parse(window.localStorage.getItem("cart")) || [];
  //   const cart_length = storage.array.forEach((element) => {
  //     cart.cart_length;
  //   });
  // }

  // // 장바구니 아이콘 카운트 (2)
  // 장바구니 추가 삭제 => 로컬스토리지 길이를 카운팅
  // 클릭 시 카운팅은 됨! 하지만 여전히 새로고침하면 카운팅 사라짐!
  // const cart2 = JSON.parse(window.localStorage.getItem("cart"));
  // console.log("1", cart2);

  // console.log(storage.length);
  // const count = storage.length;
  // const cart_count = document.querySelector(".cart_count");
  // cart_count.innerText = count;
  // console.log(cart_count, "1");

  // // 장바구니 아이콘 카운트 (3)
  // const count = storage.length;
  // const cart_count = document.querySelector(".cart_count");
  // if (cart_count) {
  //   cart_count.innerText = count;
  // }
  // console.log(count)
  // ;
  // updateCartCount();

  const count = storage.length;
  const cart_count = document.querySelector(".cart_count");
  if (cart_count) {
    cart_count.innerText = count;
  }
};

// // 장바구니 아이콘에 카운트 업데이트 함수(4)
// const updateCartCount = () => {
//   const cart_count = document.querySelector(".cart_count");

//   if (cart_count) {
//     const count = storage.length; // storage 배열의 길이
//     cart_count.innerText = count; // 카운트를 표시
//     console.log("장바구니 아이콘 카운트:", count); // 로그 확인
//   } else {
//     console.log("장바구니 카운트 요소를 찾을 수 없습니다.");
//   }
// };
