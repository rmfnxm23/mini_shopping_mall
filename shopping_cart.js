let storage = [];

// 만약 헤더와 푸터를 각각의 페이지에서 쓰고싶다면 아래와 같은 방식으로 사용하면 된다.(단 모든 js에 넣어주어야 함.)
// fetch가 비동기 방식이라 먼저 읽어주게 하기 위해서 async와 await을 사용하면 된다.
// window.onload = async function() {
window.onload = function () {
  // // 헤더 호출 함수
  // fetch("header.html")
  //   .then((response) => {
  //     return response.text();
  //   })
  //   .then((data) => {
  //     document.querySelector("#header").innerHTML = data;
  //   });

  // // 푸터 호출 함수
  // fetch("footer.html")
  //   .then((response) => {
  //     return response.text();
  //   })
  //   .then((data) => {
  //     document.querySelector("#footer").innerHTML = data;
  //   });

  // // 로드시 장바구니 카트 카운팅이 되지 않았던 문제 발생
  // // fetch는 비동기 방식이라 읽는데 시간이 걸려 넘어가서 cart_count의 값이 계속 null로 나타남. => 해결방법 (async와 await을 사용)
  // const headerRes = await fetch("header.html");
  // const headerData = await headerRes.text();
  // document.querySelector("#header").innerHTML = headerData;

  // // 푸터도 같은 방식으로 나타내면 됨.
  //   const footerRes = await fetch("footer.html");
  // const footerData = await footerRes.text();
  // document.querySelector("#footer").innerHTML = footerData;

  // const cart_data = JSON.parse(window.localStorage.getItem("cart")) || [];
  // if (cart_data !== null) {
  //   // const count = storage.length;
  //   const count = cart_data.length;
  //   const cart_count = document.querySelector(".cart_count");
  //   console.log(count);
  //   console.log(cart_count);
  //   // if (cart_count) {
  //   cart_count.innerText = count;
  //   // }
  // }

  const _data = JSON.parse(window.localStorage.getItem("cart"));
  if (_data.length === 0) {
    storage = [];
  } else {
    storage.push(..._data);
  }

  const cart_table = document.querySelector("#cart_table");
  cart_table.innerHTML = `
                          <table>
                              <thead>
                                  <tr>
                                      <th>상품정보</th>
                                      <th>이름</th>
                                      <th>수량</th>
                                      <th>가격</th>
                                      <th>삭제</th>
                                  </tr>
                              </thead>
                              <tbody class="tbody_table"></tbody>
                          </table>`;

  const tbody_table = document.querySelector(".tbody_table");
  // if ((storage = [])) {
  //   tbody_table.innerHTML = `<tr><td colspan="5">장바구니가 비어있습니다.</td></tr>`;
  // } else {
  const item_info = storage.map((x) => {
    return `<tr data-id="${x.id}">
                    <td><img src="${x.img}" alt="Random Image"/></td>
                    <td>${x.name}</td>
                    <td>${x.quantity || 1}</td>
                    <td>${x.price}</td>
                    <td>
                      <button class="deleteButton" onclick="delete_btn_click('${
                        x.id
                      }')">삭제</button>
                    </td>
                  </tr>`;
  });
  tbody_table.innerHTML = item_info.join("");
  if (storage.length === 0) {
    tbody_table.innerHTML = `<tr><td colspan="5">장바구니가 비어있습니다.</td></tr>`;
  }
  // 장바구니 추가 삭제 => 로컬스토리지 길이를 카운팅 (처음에는 클릭 숫자만 카운팅하게 했었지만 개선)
  // 클릭 시 카운팅은 됨! 하지만 여전히 새로고침하면 카운팅 사라짐!
  // const cart2 = JSON.parse(window.localStorage.getItem("cart"));
  // // console.log("1", cart2);
  // // console.log(storage.length);
  // const count = storage.length;
  // const cart_count = document.querySelector(".cart_count");

  // console.log(typeof cart_count);
  // console.log(typeof count);
  // console.log(cart_count.innerText);
  // cart_count.innerText = count;

  // const count = storage.length;
  // const cart_count = document.querySelector(".cart_count");
  // if (cart_count) {
  //   cart_count.innerText = count;
  // }
  // updateCartCount();
  calculate_total_price();
};

// 총 결제 금액 계산 함수
function calculate_total_price() {
  let total_price = 0;

  // 각 아이템의 가격 * 수량을 합산
  storage.forEach((item) => {
    const item_total = item.price * (item.quantity || 1); // 수량이 없으면 1로 계산
    total_price += item_total;
  });

  // 합산된 금액을 #cal_price에 표시
  const cal_price = document.querySelector("#cal_price");
  if (cal_price) {
    cal_price.innerText = total_price.toLocaleString(); // 천 단위로 구분하여 표시
  }
}

const cart_table = document.querySelector("#cart_table");
cart_table.innerHTML = `
                          <table>
                              <thead>
                                  <tr>
                                      <th>상품정보</th>
                                      <th>이름</th>
                                      <th>수량</th>
                                      <th>가격</th>
                                      <th>삭제</th>
                                  </tr>
                              </thead>
                              <tbody class="tbody_table"></tbody>
                          </table>`;

const tbody_table = document.querySelector(".tbody_table");
const item_info = storage.map((x) => {
  return `<tr data-id="${x.id}">
                    <td><img src="${x.img}" alt="Random Image"/></td>
                    <td>${x.name}</td>
                    <td>${x.quantity || 1}</td>
                    <td>${x.price}<</td>
                    <td>
                      <button class="delete_button" onclick="delete_btn_click('${
                        x.id
                      }')">삭제</button>
                    </td>
                  </tr>`;
});
tbody_table.innerHTML = item_info.join("");

// 삭제 버튼
function delete_btn_click(id) {
  // data-id 속성으로 tr 찾기
  const deleteRow = document.querySelector(`tr[data-id='${id}']`);
  if (deleteRow) {
    // 로컬스토리지에서 해당 ID 항목 삭제
    // storage = storage.find((item) => item.id !== id);

    // 로컬스토리지에서 해당 index 항목 찾기
    // 배열에서 조건에 맞는 첫 번째 항목만 찾아서 그 인덱스를 반환
    const find_index = storage.findIndex((item) => item.id === id);
    // 만약 조건에 맞는 항목이 있으면 그 항목의 인덱스를 반환합니다. 만약 조건에 맞는 항목이 없으면 -1을 반환합니다.
    // 만약 -1이 아니라면 (조건에 맞는 항목이 배열에 존재한다)
    if (find_index !== -1) {
      // 로컬스토리지에서 해당 index 제거 (1 : 제거할 항목의 갯수)
      storage.splice(find_index, 1);

      localStorage.setItem("cart", JSON.stringify(storage)); // 갱신된 데이터 저장
    }
    // 테이블에서 해당 행 삭제
    deleteRow.remove();
    // console.log(deleteRow);

    const count = storage.length;
    const cart_count = document.querySelector(".cart_count");
    if (cart_count) {
      cart_count.innerText = count;
    }
  }

  calculate_total_price();
}

// 전체 삭제 버튼 실행
function delete_all_click() {
  localStorage.removeItem("cart");
  // localStorage.clear("cart"); // 차이?
  storage = [];
  const tbody_table = document.querySelector(".tbody_table");
  tbody_table.innerHTML = `<tr><td colspan=5>장바구니가 비어있습니다.</td></tr>`;

  calculate_total_price();
}
