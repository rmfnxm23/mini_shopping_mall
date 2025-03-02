# Wine shopping mall

와인을 주제로 한 쇼핑 웹사이트입니다.
</br>
로컬스토리지를 활용하여 상품을 관리하고, 사용자가 장바구니에 담은 상품을 처리하는 기능을 구현하였습니다.
</br>
</br>

## 프로젝트 목적 💪

"백엔드 없이 Javascript와 로컬스토리지를 활용해 데이터를 저장하고 관리하는 방법을 익히며, 효율적인 데이터 처리 및 사용자 경험을 제공하는 방법을 실습합니다."

</br>
</br>

## 개발 환경 🛠
<h4>기술 스택</h4>
<div style="display: flex; gap: 20px;">
<img src="https://img.shields.io/badge/html5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge" />
<img src="https://img.shields.io/badge/css3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS Badge" />
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

<br/>
<h4>개발 환경</h4>
<img src="https://img.shields.io/badge/visual%20studio%20code-%23007ACC.svg?&style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
<img src="https://img.shields.io/badge/git-%23F05032.svg?&style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/github-%23181717.svg?&style=for-the-badge&logo=github&logoColor=white" />
</div>

</br>
</br>

## 화면 구성 및 주요 기능 📺

1. ####  메인 페이지 ####
- 관리자 페이지에서 저장한 로컬스토리지의 데이터를 이용하여 메인 페이지의 상품을 표시
</br>

![Image](https://github.com/user-attachments/assets/72a53182-c9b9-4b17-9aca-23bb6b4bb5cd)

</br>

2. #### 상세 페이지 ####
- 장바구니 클릭 시 해당 상품 데이터를 로컬스토리지에 저장
- 상품 추가 시 헤더의 장바구니 아이콘에 담긴 상품 수량 증가
</br>

![Image](https://github.com/user-attachments/assets/4c2b9a84-0e71-47e3-bff1-d3badda707a9)

</br>

3. #### 장바구니 페이지 ####
- 상품 삭제 시 로컬스토리지에서 해당 상품 데이터 삭제
- 삭제는 개별 상품 적용, 전체 삭제는 모든 상품 삭제
- 장바구니에 담긴 상품의 수와 가격이 실시간 변동
</br>

![Image](https://github.com/user-attachments/assets/ddaed473-9d21-4d25-9daa-d9b905ab1a99)

</br>

 4. #### 관리자 페이지 ####
    ##### 1️⃣: 상품 등록 
    - 입력 값의 유효성 검사 및 아이디 중복 체크
    - 조건에 맞지 않으면 저장 버튼 비활성화
    - 등록 시 로컬스토리지에 데이터 저장 및 테이블 생성
    - 이미지 랜덤 등록
      
    ![Image](https://github.com/user-attachments/assets/6b16c1ce-d7ac-4155-911c-87410321ca6e)

    ##### 2️⃣: 상품 수정 및 삭제 
    - 버튼 클릭 시 해당 상품의 데이터 수정 및 삭제
      
    ![Image](https://github.com/user-attachments/assets/e73ca875-101e-4c8a-b4ad-1cda656e3fc5)
  

    ##### 3️⃣: CSV 다운로드
    - 상품 목록을 CSV 파일로 다운로드
      
    ![Image](https://github.com/user-attachments/assets/6630c89f-18a7-4574-b79e-cd2b0a95a8e4)

</br>

 6. #### 반응형 ####
- 화면 크기에 따라 css 전환 (각 페이지에 반응형 적용)
  
![Image](https://github.com/user-attachments/assets/dfcfdd39-2bb5-4518-855f-80dc0ce8e4eb)
