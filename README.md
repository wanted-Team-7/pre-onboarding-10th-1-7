# 원티드 프리온보딩 프론트엔드 인턴십 과제

## 배포된 사이트

<https://https://wanted-preonboarding-daedaem.netlify.app//>

## 프로젝트 실행 방법

### Install

```bash
npm install
```

### Start

```bash
npm start
```

## 요구사항 구현

### 회원가입 및 로그인

1. 공통사항

- 페이지 안에 이메일 input, 비밀번호 input, 제출 button이 포함된 형태로 구성

  - 이메일 input에 `data-testid="email-input"` 속성을 부여
  - 패스워드 input에 `data-testid="password-input"` 속성을 부여
  - 회원가입 페이지에는 회원가입 button에 `data-testid="signup-button"` 속성을 부여
  - 로그인 페이지에는 로그인 button에 `data-testid="signin-button"` 속성을 부여

- 유효성 검사

  - 이메일 조건: @ 포함
  - 비밀번호 조건: 8자 이상
  - 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여

- 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 todo 경로로 리다이렉트 시켜주세요
- 로컬 스토리지에 토큰이 없는 상태로 `/todo` 페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

2. 회원가입

   - `/signup` 회원가입 기능 구현
   - 회원가입 성공 시, `/signin` 경로로 이동

3. 로그인
   - 로그인 성공 시, JWT을 로컬 스토리지 저장
   - 로그인 성공 시, /todo 경로로 이동

### ToDo LIST

- `/todo`경로에 접속하면 투두 리스트의 목록 확인
- TODO 내용 및 완료 여부 표시
  - TODO의 완료 여부는 `<input type="checkbox" />`를 통해 표현
- TODO는 `<li>` tag를 이용

- 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button

- TODO 입력 input에는 `data-testid="new-todo-input"` 속성을 부여

- TODO 추가 button에는 `data-testid="new-todo-add-button"` 속성을 부여

- 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가

- TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에서 확인 가능
- TODO의 체크박스를 통해 완료 여부를 수정 가능
- TODO 우측에 수정버튼과 삭제 버튼

  - 수정 버튼에는 `data-testid="modify-button"` 속성을 부여
  - 삭제 버튼에는 `data-testid="delete-button"` 속성을 부여

- 투두 리스트의 삭제 기능을 구현
  - 두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제
- 투두 리스트의 수정 기능을 구현해주세요
  - TODO 우측의 수정 버튼을 누르면 수정모드가 활성화
  - 수정모드에서는 TODO의 내용을 변경 가능
  - 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경
  - 수정 input창에는 `data-testid="modify-input"` 속성을 부여
  - 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시
  - 제출버튼에는 `data-testid="submit-button"` 속성을 부여
  - 취소버튼에는 `data-testid="cancel-button"` 속성을 부여
  - 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트
  - 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화
