// 전역 변수 선언
// 값이 바뀌기 때문에 let 사용
let storage = [];

// 페이지 로드 완료 시 실행될 함수
window.onload = function () {
  const _data = JSON.parse(window.localStorage.getItem("shop_local_data"));

  if (_data.length === 0) {
    storage = [];
  } else {
    storage.push(..._data);
  }

  // 테이블 만들기
  const inputtable = document.querySelector(".main_wrap");
  inputtable.innerHTML = `
                        <div class="excel">
                          <button id="excelDownload">CSV 다운로드</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>이미지</th>
                                    <th>이름</th>
                                    <th>가격</th>
                                    <th>상세내용</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody class="tbody_table"></tbody>
                        </table>`;

  // tbody에 넣어 줄 데이터 태그 생성
  const tbody = document.querySelector(".tbody_table");
  const item_info = storage.map((x) => {
    return `<tr data-id="${x.id}">
                  <td><img src="${x.img}" alt="Random Image"/></td>
                  <td>${x.name}</td>
                  <td>${x.price}</td>
                  <td>${x.details}</td>
                  <td>
                    <button class="editButton" onclick="edit_btn_click('${x.id}')">수정</button>
                    <button class="deleteButton" onclick="delete_btn_click('${x.id}')">삭제</button>
                  </td>
                </tr>`;
  });
  tbody.innerHTML = item_info.join("");
};

// input 입력 실시간 체크 (중복, 입력하지 않았을 때 message 실시간으로 확인)
// id input 값 가져오기
const RT_id = document.querySelector("#id_input");

// 이벤트리스너 'input'으로 입력할 때 실시간 감지
RT_id.addEventListener("input", update_id);
function update_id() {
  const inputid = RT_id.value;
  const id_same = storage.filter((item) => item.id === inputid);

  if (inputid === "") {
    document.getElementById("text_id").innerText = "ID를 입력해주세요";
  } else if (id_same.length > 0) {
    document.getElementById("text_id").innerText = "이 ID는 이미 존재합니다.";
  } else {
    id_input_check = true;
    document.getElementById("text_id").innerText = "";
    check_button();
  }

  console.log(RT_id);
}

// 이름 input 값 가져오기
const RT_name = document.querySelector("#name_input");

RT_name.addEventListener("input", update_name);
function update_name() {
  const inputname = RT_name.value;
  if (inputname === "") {
    text_name.innerText = "이름을 입력해주세요.";
  } else {
    name_input_check = true;
    document.getElementById("text_name").innerText = "";
    check_button();
  }
}

// 가격 input 실시간 값 가져오기
const RT_price = document.querySelector("#price_input");

RT_price.addEventListener("input", update_price);
function update_price() {
  const inputprice = RT_price.value;
  if (inputprice === "") {
    text_price.innerText = "가격을 입력해주세요.";
  } else {
    price_input_check = true;
    document.getElementById("text_price").innerText = "";
    check_button();
  }
}

// 상세내용 input 실시간 값 가져오기
const RT_details = document.querySelector("#details_input");

RT_details.addEventListener("input", update_details);
function update_details() {
  const inputdetails = RT_details.value;
  if (inputdetails === "") {
    // 빈 값이면
    document.getElementById("text_details").innerText =
      "상세내용을 입력해주세요.";
    return;
  } else {
    details_input_check = true;
    document.getElementById("text_details").innerText = "";
    check_button();
  }
}

// 삭제 버튼 실행
function delete_btn_click(id) {
  // data-id 속성으로 tr 찾기
  const deleteRow = document.querySelector(`tr[data-id='${id}']`);
  if (deleteRow) {
    // 로컬스토리지에서 해당 ID 항목 삭제
    storage = storage.filter((item) => item.id !== id);
    localStorage.setItem("shop_local_data", JSON.stringify(storage)); // 갱신된 데이터 저장

    // 테이블에서 해당 행 삭제
    deleteRow.remove();
  }
}

// 수정 버튼 실행
// 1. 수정 버튼을 클릭하면 실행~~
// 2. 테이블의 이름, 나이, 커리어의 값을 input으로 열린다.
// 3. 수정 버튼일 때, 수정 완료 버튼으로 변경
// 4. 수정 완료 버튼일 때, 수정 버튼으로 변경
// 5. 수정 완료 버튼 클릭 시, 변경된 데이터 로컬에 저장
// 6. 로컬의 데이터를 테이블로 업데이트

// 수정 버튼 클릭 시  // 함수명과 변수명이 동일하면 실행 안 됨
function edit_btn_click(id) {
  const row = document.querySelector(`tr[data-id='${id}']`);
  const cells = row.querySelectorAll("td");
  const edit_btn = row.querySelector(".editButton");

  // 버튼의 텍스트가 "수정"일 때
  if (edit_btn.innerText === "수정") {
    // 기존 테이블 셀을 input으로 변경
    // 테이블에 들어가 있는 innerText의 값을 input의 값으로 넣어줌
    // input 태그 아래에 div를 만듦
    cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}" /><div id="text_name_${id}"></div>`; // Name
    cells[2].innerHTML = `<input type="number" value="${cells[2].innerText.replace(
      /,/g,
      ""
    )}" /><div id="text_price_${id}"></div>`; // Price
    cells[3].innerHTML = `<input type="text" value="${cells[3].innerText}" /><div id="text_details_${id}"></div>`; // Details

    // '수정완료' 버튼 활성화/비활성화 조건
    let input_name_check_btn = false;
    let input_price_check_btn = false;
    let input_details_check_btn = false;

    const edit_complete_btn = () => {
      if (
        input_name_check_btn === true &&
        input_price_check_btn === true &&
        input_details_check_btn === true
      ) {
        // 모두 true 일 때 '수정완료' 버튼 활성화
        edit_btn.disabled = false;
      } else {
        // 하나라도 false(조건에 만족하지 않으면)라면 '수정완료' 버튼 비활성화
        edit_btn.disabled = true;
      }
    };

    // * 테이블의 셀이 input으로 변경되어 수정할 때 입력값을 실시간 감지 *
    const input_update_name = cells[1].querySelector("input"); // 이름

    input_update_name.addEventListener("input", input_update_check_name);
    function input_update_check_name() {
      const inputname = input_update_name.value;
      const div_name = document.getElementById(`text_name_${id}`);
      if (inputname === "") {
        div_name.innerText = "이름을 입력해주세요.";
        input_name_check_btn = false;
        edit_complete_btn();
        // return;  // 버튼 활성화의 조건을 확인하기 위해 return 생략
      } else {
        input_name_check_btn = true;
        div_name.innerText = "";
        edit_complete_btn();
      }
    }

    const input_update_price = cells[2].querySelector("input"); // 가격

    input_update_price.addEventListener("input", input_update_check_price);
    function input_update_check_price() {
      const inputprice = input_update_price.value;
      const div_price = document.getElementById(`text_price_${id}`);
      if (inputprice === "") {
        div_price.innerText = "가격을 입력해주세요.";
        input_price_check_btn = false;
        edit_complete_btn();
        // return;  // 버튼 활성화의 조건을 확인하기 위해 return 생략
      } else {
        input_price_check_btn = true;
        div_price.innerText = "";
        edit_complete_btn();
      }
    }

    const input_update_details = cells[3].querySelector("input"); // 상세내용

    input_update_details.addEventListener("input", input_update_check_details);
    function input_update_check_details() {
      const inputdetails = input_update_details.value;
      const div_details = document.getElementById(`text_details_${id}`);
      if (inputdetails === "") {
        div_details.innerText = "경력을 입력해주세요.";
        input_details_check_btn = false;
        edit_complete_btn();
        // return;  // 버튼 활성화의 조건을 확인하기 위해 return 생략
      } else {
        input_details_check_btn = true;
        div_details.innerText = "";
        edit_complete_btn();
      }
    }

    // 수정완료 버튼 활성화 조건을 걸어준다.
    // 없으면 작동 안함...why??
    input_update_check_name();
    input_update_check_price();
    input_update_check_details();

    // 수정 완료 버튼으로 변경
    edit_btn.innerText = "수정완료";
  } else if (edit_btn.innerText === "수정완료") {
    // 수정 완료 버튼 클릭 시
    // 수정된 값으로 각 셀의 내용을 업데이트
    const updatedName = cells[1].querySelector("input").value;
    const updatedPrice = cells[2].querySelector("input").value;
    const updatedDetails = cells[3].querySelector("input").value;

    // 로컬 스토리지에서 해당 ID의 데이터를 찾아 수정된 항목만 업데이트
    storage = storage.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          // 수정된 값만 반영
          name: updatedName.trim(),
          price: Number(updatedPrice).toLocaleString().trim(),
          details: updatedDetails.trim(),
        };
      }
      return item; // 수정하지 않은 항목은 그대로 반환
    });

    // 로컬 스토리지에 수정된 데이터 저장
    localStorage.setItem("shop_local_data", JSON.stringify(storage));

    // 버튼 텍스트를 '수정'으로 변경
    edit_btn.innerText = "수정";

    // 테이블을 다시 렌더링하여 업데이트된 내용을 반영
    const item = storage.find((item) => item.id === id);
    renderRow(item, row); // 선택된 항목의 아이디에 해당하는 행만 다시 렌더링하는 함수
  }
}

// '수정 완료'된 행만 렌더링하는 함수
function renderRow(item, row) {
  row.innerHTML = `<tr data-id="${item.id}">
          <td><img src="${item.img}" alt="Random Image"/></td>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>${item.details}</td>
          <td>
            <button class="editButton" onclick="edit_btn_click('${item.id}')">수정</button>
            <button class="delButton" onclick="delete_btn_click('${item.id}')">삭제</button>
          </td>
        </tr>`;
}

// 저장 버튼 클릭 시 실행
const save_btn_click = () => {
  const id_input = document.querySelector("#id_input").value;
  const name_input = document.querySelector("#name_input").value;
  const price_input = document.querySelector("#price_input").value;
  const details_input = document.querySelector("#details_input").value;

  // 이미지 배열
  const images = [
    "ARRAS GRAND VINTAGE.png",
    "BANROCK STATION MOSCATO.png",
    "BLACK TOWER LOVELY DREAM RIESLING.png",
    "BLACK TOWER PINK BUBBLY SPARKKLING.png",
    "CHATEAU DE CHAMIREY MERCUREY LES CINQ '19.png",
    "DIABLO DEVIL`S BRUT_New Label.png",
    "DIABLO DEVIL`S CARNAVAL SAUVIGNON.png",
    "FREEMARK ABBEY SYCAMORE.png",
    "LOUIS BOUILLOT CREMANT DE BOURGOGNE ROSE.png",
    "LUC BELAIRE LUXE RARE BOUTEILLE.png",
    "PIERRE LURTON BORDEAUX WHITE.png",
    "REDIGAFFI.png",
    "Schlumberger Rose Special Brut.png",
    "VEUVE DU VERNAY BRUT ICE DEMI SEC.png",
    "VILLA M MIMI KISS ROSE.png",
    "ZUCCARDI FINCA PIEDRA GRAVASCAL.png",
  ];
  console.log(images);

  // 이미지 랜덤
  const random_image = images[Math.floor(Math.random() * images.length)];

  const shop_local_data = {
    id: id_input,
    img: `./images/${random_image}`,
    name: name_input,
    price: Number(price_input).toLocaleString(),
    details: details_input,
  };
  console.log(random_image);

  // 기본 값을 false로 하고 조건에 만족하면 true로 바꿔지도록 만든다.
  let id_input_check = false;
  let name_input_check = false;
  let price_input_check = false;
  let details_input_check = false;

  if (id_input === "") {
    document.getElementById("text_id").innerText = "ID를 입력해주세요";
    return;
  } else {
    // id가 중복 (filter로 뽑아내서 값 비교)
    const id_same = storage.filter((item) => item.id === id_input);

    if (id_same.length > 0) {
      document.getElementById("text_id").innerText = "이 ID는 이미 존재합니다.";
      return;
    } else {
      id_input_check = true;
      document.getElementById("text_id").innerText = "";
      check_button();
    }
  }

  if (name_input === "") {
    document.getElementById("text_name").innerText = "이름을 입력해주세요";
    return;
  } else {
    name_input_check = true;
    document.getElementById("text_name").innerText = "";
    check_button();
  }

  if (price_input === "") {
    document.getElementById("text_price").innerText = "가격을 입력해주세요";
    return;
  } else {
    price_input_check = true;
    document.getElementById("text_price").innerText = "";
    check_button();
  }

  if (details_input === "") {
    document.getElementById("text_details").innerText = "내용을 입력해주세요";
    return;
  } else {
    details_input_check = true;
    document.getElementById("text_details").innerText = "";
    check_button();
  }

  // 조건이 모두 참일 때, 스토리지에 저장 & 테이블 추가를 실행
  if (
    id_input_check === true &&
    name_input_check === true &&
    price_input_check === true &&
    details_input_check === true
  ) {
    storage.push(shop_local_data);

    localStorage.setItem("shop_local_data", JSON.stringify(storage));

    // 테이블 만들기
    const inputtable = document.querySelector(".main_wrap");
    inputtable.innerHTML = `
                        <div class="excel">
                          <button id="excelDownload">CSV 다운로드</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>이미지</th>
                                    <th>이름</th>
                                    <th>가격</th>
                                    <th>상세내용</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody class="tbody_table"></tbody>
                        </table>`;

    // tbody에 넣어 줄 데이터 태그 생성
    const tbody = document.querySelector(".tbody_table");
    const item_info = storage.map((x) => {
      return `<tr data-id="${x.id}">
                  <td><img src="${x.img}" alt="Random Image"/></td>
                  <td>${x.name}</td>
                  <td>${x.price}</td>
                  <td>${x.details}</td>
                  <td>
                    <button class="editButton" onclick="edit_btn_click('${x.id}')">수정</button>
                    <button class="deleteButton" onclick="delete_btn_click('${x.id}')">삭제</button>
                  </td>
                </tr>`;
    });
    tbody.innerHTML = item_info.join("");

    //   저장 후 input 칸 비우기
    document.getElementById("id_input").value = "";
    document.getElementById("name_input").value = "";
    document.getElementById("price_input").value = "";
    document.getElementById("details_input").value = "";
  }

  document.getElementById("save_button").setAttribute("disabled", true);
};

// 버튼 비활성화 || 활성화 (조건에 모두 만족할 때 활성화가 되도록)
let id_input_check = false;
let name_input_check = false;
let price_input_check = false;
let details_input_check = false;

const check_button = () => {
  if (
    id_input_check === true &&
    name_input_check === true &&
    price_input_check === true &&
    details_input_check === true
  ) {
    // 조건에 만족하면 disabled 속성을 제거
    document.getElementById("save_button").removeAttribute("disabled");
  } else {
    // 조건에 만족하지 않으면 disabled 속성을 추가
    document.getElementById("save_button").setAttribute("disabled", true);
  }
};

// CSV 다운로드 버튼 클릭 시
document.getElementById("excelDownload").addEventListener("click", () => {
  let filename = "ProductList.csv";
  getCSV(filename);
});

// CSV 생성 함수
const getCSV = (filename) => {
  let csv = [];
  let row = [];

  // 1열에는 컬럼명
  row.push("이름", "가격", "상세내용");
  csv.push(row.join(","));

  // 데이터 배열
  storage.map((x) => {
    row = [];
    row.push(`"${x.name}","${x.price}","${x.details}"`);
    csv.push(row.join(","));
  });

  //
  downloadCSV(csv.join("\n"), filename);
};

// CSV 다운로드 함수
const downloadCSV = (csv, filename) => {
  let csv_file;
  let download_link;

  //한글 처리를 위해 BOM 추가하기
  const BOM = "\uFEFF";
  const csvBOM = BOM + csv; // BOM을 포함한 CSV 데이터

  // CSV 파일 Blob 생성
  csv_file = new Blob([csvBOM], { type: "text/csv" });

  // 다운로드 링크 생성
  download_link = document.createElement("a");
  download_link.download = filename;
  download_link.href = window.URL.createObjectURL(csv_file);

  download_link.style.display = "none";
  document.body.appendChild(download_link);

  // 다운로드 클릭
  download_link.click();

  // URL 해제
  window.URL.revokeObjectURL(download_link.href);
};
