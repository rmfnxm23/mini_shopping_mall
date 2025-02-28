// 전역 변수 선언
// 값이 바뀌기 때문에 let 사용
let storage = [];

// 페이지 로드 완료 시 실행될 함수
window.onload = function () {
  // 1. localStorage에서 데이터 가져오기
  // localStorage에서 'shop_local_data' 키로 저장된 데이터를 가져와 파싱
  const _data = JSON.parse(window.localStorage.getItem("shop_local_data"));

  // 2. 데이터 처리
  if (_data.length === 0) {
    // 가져온 데이터가 비어 있으면 storage를 빈 배열로 초기화
    storage = [];
  } else {
    // 데이터가 있으면 storage 배열에 추가
    // spread 연산자 (...) 사용하여 배열의 모든 요소를 개별적으로 추가
    storage.push(..._data);
  }

  // 3. HTML 요소 선택
  const main_product = document.querySelector(".main_product");

  // 4. HTML 생성 및 삽입
  // map()은 배열을 순회하면서 기존 배열은 변경되지 않고 새로운 배열을 반환한다.
  // 제품 클릭 시 상세 페이지로 이동하도록 링크를 만듭니다.
  // 해당 제품의 고유 ID를 URL 파라미터로 사용
  main_product.innerHTML = storage
    .map((x) => {
      return `
      <div class="product_card">
      <a href="detail_page.html?product_id=${x.id}">
          <img src="${x.img}" alt="card_image" /></a>
          <div class="product_info">
            <div class="product_name">${x.name}</div>
            <div class="product_price">${x.price} 원</div>
          </div>
        </div>`;
    })
    .join("");
};
