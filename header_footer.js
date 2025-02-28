// 헤더 호출 함수
// fetch: 서버와 통신을 하기 위한 비동기 함수
// HTTP 요청을 보내고, 그 응답을 받아오는 기능을 함
fetch("header.html") //
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("#header").innerHTML = data;

    // 장바구니에 담긴 아이템 수 카운팅 함수 (아래에 기재)
    updateCartCount();
  });

// 푸터 호출 함수
fetch("footer.html")
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    document.querySelector("#footer").innerHTML = data;
  });

// 알림창 표시
function alert_show() {
  alert("준비중입니다");
}

// 페이지 이동
const move_url = (type) => {
  let url;

  // 메인 페이지
  if (type === "index") {
    url = "http://127.0.0.1:5500/main_page.html";
  }
  // 장바구니 페이지
  if (type === "cart") {
    url = "http://127.0.0.1:5500/shopping_cart.html";
  }
  window.location.href = url;
};

// 클릭 시에는 작동하였으나 로드 시 작동하지 않는 오류(헤더를 불러들이지 못해서)가 생겨 헤더에 직접 넣으려고 만듦.
// localStorage의 length를 사용하여 장바구니 아이템 수 업데이트하기 위한 함수
function updateCartCount() {
  const cart_data = JSON.parse(window.localStorage.getItem("cart"));
  const cart_count = document.querySelector(".cart_count");
  cart_count.innerText = cart_data.length;
  if (cart_data !== null) {
    cart_count.innerText = cart_data.length;
  }
}
