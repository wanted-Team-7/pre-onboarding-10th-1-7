# 원티드 프리온보딩 프론트엔드 7팀 1주차 과제

- **프로젝트 기간:** 2023년 4월 25일 ~ 2023년 4월 28일
- **배포링크:** 

## 📚 과제
동료학습을 통해서 팀에서 생각한 원티드 프리온보딩 프론트엔드 [인턴십 선발 과제](https://github.com/walking-sunset/selection-task)의 Best Pratice를 만들고 제출해주세요.

> Best Practice란 팀원들이 각자의 구현방법을 설명하고 토론했을 때 팀 안에서 이 방법이 가장 효율적이라고 판단되는 것

## ⌨️  프로젝트 실행 방법

```bash
$ npm install
$ npm start
```

## ☑️ Code base 선택 근거
좋은 코드란 무엇인지에 대해 팀 회의를 거쳐 도출된 아래 기준을 토대로 Code base를 선정하였습니다.
- 코드를 읽었을 때 가독성이 좋다.
- 고유한 기능을 하는 독립적인 모듈로 분리된다.
- 유지보수가 쉽다.



## ☑️ Best Practice 채택 근거
### 1. 유효성 검사 기능
1. 유효성 검사 함수를 만들고 검사가 필요한 컴포넌트에서 함수를 불러와 관련된 로직을 처리
2. 유효성 검사 훅을 만들어 로직을 훅에서 처리. 훅이 반환한 검사 결과값과 결과 메시지를 컴포넌트에서 사용
3. input 훅을 만들어 input 데이터와 유효성검사 로직를 이 훅에서 한 번에 처리. 훅이 반환한 input value, input 이벤트 핸들러 함수, 검사 결과값 등을 컴포넌트에서 사용
<br />

- 효율적인 유지 보수를 고려하여 로직을 가능한 한 곳에서 다룰 수 있도록 코드를 구성하기로 하였습니다.
- 유효성 검사가 필요한 모든 컴포넌트에서 동일한 로직이 작성되기 때문에, 관련 로직을 한 곳에서 처리하고자 훅을 만들기로 결정하였습니다.
- 프로젝트에서 유효성 검사가 필요한 상황은 로그인/회원가입 외엔 없고, 항상 input 요소와 함께 상호작용하므로 input 훅을 생성하는 것으로 결정하였습니다.
- 이때 컴포넌트에서 따로 처리했던 검사 결과메시지는 유효성 검사 함수에서 처리하도록 수정하였습니다. 유효성 검사 함수가 결과값(boolean) 뿐만 아니라 결과메시지도 함께 반환하도록 수정하였습니다.
- 훅 이름 또한 인증과 관련된 input 요소를 처리하는 그 역할에 따라 가독성을 고려하여 useAuthInput으로 수정하였습니다.

<br />

```tsx
// validation function
const validateEmail = (email: string): [boolean, string | null] => {
  const isValid = email.trim().includes('@');
  return [isValid, isValid ? null : ERROR_MESSAGE.EMAIL];
};

const validatePassword = (password: string): [boolean, string | null] => {
  const isValid = password.trim().length >= 8;
  return [isValid, isValid ? null : ERROR_MESSAGE.PASSWORD];
};

// input & validation hook
const useAuthInput = (validator: (inputData: string) => [boolean, string | null]): UserInput => {
  const [inputData, setInputData] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const [inputDataValid, errorMessage] = validator(inputData);
  const inputInvalid = !inputDataValid && isTouched;

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputData(() => event.target.value);
  };

  const inputDataBlurHandler = (): void => {
    setIsTouched(true);
  };

  return {
    inputData,
    inputDataValid,
    inputInvalid,
    inputChangeHandler,
    inputDataBlurHandler,
    errorMessage,
  };
};
```
<br />

### 2. 리다이렉트 기능
1. 컴포넌트에서 useNavigate 훅을 사용하여 처리
2. 라우터 컴포넌트에서 처리 → 컴포넌트 내 naviage 등 라우팅 관련 로직 사용을 최소화하고, 라우팅 로직을 라우터 컴포넌트에서만 처리

- 논의 과정
  - 팀원들 대다수가 1번의 방식으로 구현하였으나 추후 리다이렉트 경로 변경 등 수정사항이 생길 때 모든 컴포넌트의 navigate를 수정해야하는 번거로움이 존재했습니다.
  - 2번의 방식은 라우터 컴포넌트에서만 리다이렉트 로직을 수정하면 되지만, 전역 상태 관리가 거의 필수적으로 동반되어야 하고, 리다이렉트 기능이 실제로 발생하는 컴포넌트에는 navigate 등 리다이렉트를 처리하는 코드가 존재하지 않아 로직을 이해하는데에 어려움이 있을 수 있습니다.

- 결론
  - 경로 수정 등의 문제는 navigate 함수에 전달하는 인자인 경로를 변수화하여 관리하면 해결할 수 있습니다. 
그리고 상태 관리와 가독성 등을 고려할 때 2번은 여러 문제를 낳을 수 있을 것 같다는 우려에 1번 방식과 같이 각 컴포넌트에서 useNavigate 훅을 사용하여 리다이렉트 기능을 구현하기로 하였습니다.
<br />

```tsx
// 경로 변수
const PATH_URL = {
  AUTH: `/auth`,
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  TODO: '/todo',
  TODOS: `/todos`,
};

// 로그인 여부에 따른 리다이렉트 처리
const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  withAuth,
  children,
}: GeneralLayoutProps) => {
  const isToken = getToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (withAuth && !isToken) {
      navigate(PATH_URL.SIGNIN);
    } else if (isToken && authRoutes.includes(location.pathname)) {
      navigate(PATH_URL.TODO);
    }
  }, [isToken, location.pathname, withAuth, navigate]);

  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
};

// 로그인 성공시 /todo로 리다이렉트하는 로직
  const inputDataSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailValid || !passwordValid) return;

    const { success, error } = await signin({ email, password });
    if (success) {
      alert('로그인에 성공하셨습니다.');
      navigate(PATH_URL.TODO);
    } else {
      alert(error);
    }
  };
```
<br />

### 3. To Do 반복되는 코드 함수로 분리
create, update, delete todo 시에 동일하게 작성되었던 코드를 onReadTodo 함수로 분리하여 관리했습니다.
- 변경 전

```tsx
useEffect(() => {
  // 아래 onCreateTodo onUpdateTodo onDeleteTodo 에서도 
  // 여러번 중복되는 fetchTodos 함수
    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      setTodoItems(() => fetchedTodos);
    };

    fetchTodos();
  }, []);

  const onCreateTodo = async (todo: string) => {
    await createTodo(todo);
    // 중복
    const updatedTodos = await getTodos();
    setTodoItems(() => updatedTodos);
  };

  const onUpdateTodo = async (todoId: number, todoText: string, isCompleted: boolean) => {
    await updateTodo(todoId, todoText, isCompleted);
    // 중복
    const updatedTodos = await getTodos();
    setTodoItems(() => updatedTodos);
  };

  const onDeleteTodo = async (todoId: number) => {
    await deleteTodo(todoId);
    // 중복
    const updatedTodos = await getTodos();
    setTodoItems(updatedTodos);
  };
```

- 변경 후

```tsx
useEffect(() => {
    onReadTodo();
  }, []);

// useEffect 밖으로 함수를 분리하고,
// 기능을 명확하게 하기 위해 fetchTodos -> onReadTodo 로 함수 이름을 변경했습니다. 
  const onReadTodo = async () => {
    const fetchedTodos = await getTodos();
    setTodoItems(fetchedTodos);
  };

  const onCreateTodo = async (todo: string) => {
    await createTodo(todo);
    onReadTodo();
  };

  const onUpdateTodo = async (todoId: number, todoText: string, isCompleted: boolean) => {
    await updateTodo(todoId, todoText, isCompleted);
    onReadTodo();
  };

  const onDeleteTodo = async (todoId: number) => {
    await deleteTodo(todoId);
    onReadTodo();
  };
```

<br />

### 4. 토큰 유무에 따른 fetch api header 옵션 중복 처리 문제 해결

- 문제 상황
  - fetch api 옵션 설정 부분에 토큰 유무에 따른 header 옵션을 중복으로 처리하고 있었습니다. 
  - 만약 header 옵션에 속성을 변경해야하는 상황이 발생한다면 모든  fetch api  함수의 옵션을  수정해줘야하는 상황이 발생합니다.

```tsx
export const getTodos = async (): Promise<TodoItem[]> => {
  try {
    const response = await fetch(TODO_BASE_URL, {
      method: 'get',
      headers: { authorization: `Bearer ${getToken()}` },
    });
    ...
  } catch (error: any) { ... }
};

export const createTodo = async (todo: string): Promise<void> => {
  try {
    const response = await fetch(TODO_BASE_URL, {
      method: 'post',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    });
    ...
  } catch (error: any) { ... }
};

export const updateTodo = async (
  todoId: number,
  todoText: string,
  isCompleted: boolean
): Promise<void> => {
  try {
    const response = await fetch(`${TODO_BASE_URL}/${todoId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoText,
        isCompleted,
      }),
    });
        ...
  } catch (error: any) { ... }
};
export const getTodos = async (): Promise<TodoItem[]> => {
  try {
    const response = await fetch(TODO_BASE_URL, {
      method: 'get',
      headers: { authorization: `Bearer ${getToken()}` },
    });
    ...
  } catch (error: any) { ... }
};

export const createTodo = async (todo: string): Promise<void> => {
  try {
    const response = await fetch(TODO_BASE_URL, {
      method: 'post',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ todo }),
    });
    ...
  } catch (error: any) { ... }
};

export const updateTodo = async (
  todoId: number,
  todoText: string,
  isCompleted: boolean
): Promise<void> => {
  try {
    const response = await fetch(`${TODO_BASE_URL}/${todoId}`, {
      method: 'put',
      headers: {
        authorization: `Bearer ${getToken()}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        todo: todoText,
        isCompleted,
      }),
    });
        ...
  } catch (error: any) { ... }
};
```

<br />

- 개선 방향
  - 개발 피로를 줄이고 효율적으로 유지보수를 할 수 있도록 fetchClient 함수를 만들었습니다.
  - 해당 함수에서 기존 fetch api로 구현된 함수에서 중복되는 header 옵션을 토큰의 유무에 따라 분기처리하는 로직을 구현했습니다.

```tsx
import { getToken } from '../utils/token';

export const fetchClient = (url: string, options: RequestInit): Promise<Response> => {
  const accessToken = getToken();
  if (accessToken) {
    const newOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return fetch(url, newOptions);
  }
  const newOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, newOptions);
};
```

<br />

- 적용 방법
  - 아래 코드와 같이 header를 제외한 나머지 api 옵션을 넣어주면 됩니다.

```tsx
export const getTodos = async (): Promise<TodoItemState[]> => {
  try {
    const response = await fetchClient(TODO_BASE_URL, { method: 'get' });
    ...
  } catch (error: any) { ... }
};

export const createTodo = async (todo: string): Promise<void> => {
  try {
    const response = await fetch(TODO_BASE_URL, {
      method: 'post',
      body: JSON.stringify({ todo }),
    });
    ...
  } catch (error: any) { ... }
};

export const updateTodo = async (
  todoId: number,
  todoText: string,
  isCompleted: boolean
): Promise<void> => {
  try {
    const response = await fetchClient(`${TODO_BASE_URL}/${todoId}`, {
      method: 'put',
      body: JSON.stringify({
        todo: todoText,
        isCompleted,
      }),
    });
    ...
  } catch (error: any) { ... }
};
```

<br />

### 5. To Do 관련 유효성검사 기능 분리
최초에 trim() === ' ' 이 부분을 읽었을 때 어떤 역할을 할지 가독성 측면에서 추론이 어렵기 때문에 isInputValid로 분리한 다음에 호출했습니다.

```tsx
  export const isInputValid = (value: string | undefined     | null) => {
  return !value || value.trim().length === 0;
  };

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = newTodoRef.current!.value;
    if (newTodo.trim() === '') return;
    if (!isInputValid(newTodo)) return;
```

<br />

### 6. 토글 함수 분리
기능상 토글에 가까운 setisUpdate(false)를 토글함수로 분리하였습니다.

```tsx
const handleToggle = () => {
    setIsUpdate(!isUpdate);
};
```

```tsx
// 변경 전
<button type='button' data-testid='delete-button' onClick={() => setIsUpdate(false)}>
// 변경 후
<button type='button' data-testid='delete-button' onClick={handleToggle}>
```

<br />

## 폴더 구조


```
📂 src
├──📂 api
│   ├── 📄 authApi.ts
│   ├── 📄 fetchClient.ts
│   └── 📄 todosApi.ts
├──📂 components
│   ├── 📄 Header.tsx
│   ├── 📄 NewTodo.tsx
│   ├── 📄 PageContent.tsx
│   └── 📄 TodoItem.tsx
├──📂 hooks
│   └── 📄 useInput.ts
├──📂 layout
│   └── 📄 GeneralLayout.tsx
├──📂 pages
│   ├── 📄 ErrorPage.tsx
│   ├── 📄 Home.tsx
│   ├── 📄 SignIn.tsx
│   ├── 📄 SignUp.tsx
│   └── 📄 Todos.tsx
├──📂 types
│   ├── 📄 todos.ts
│   └── 📄 user.ts
└──📂 utils
    ├── 📄 token.ts
    └── 📄 validator.ts

```


## 팀원
| 이지윤<br>(팀장) | 권민영 | 김희진 | 박정도 | 우상헌 | 이준용 | 유재형 | 정승연 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img alt="이지윤" src="https://avatars.githubusercontent.com/u/79697414?v=4" height="100" width="100"> | <img alt="권민영" src="https://avatars.githubusercontent.com/u/118191378?v=4" height="100" width="100"> | <img alt="김희진" src="https://avatars.githubusercontent.com/u/92916958?v=4" height="100" width="100"> | <img alt="박정도" src="https://avatars.githubusercontent.com/u/72500346?v=4" height="100" width="100"> | <img alt="우상헌" src="https://avatars.githubusercontent.com/u/98410418?v=4" height="100" width="100"> | <img alt="이준용" src="https://avatars.githubusercontent.com/u/49552804?v=4" height="100" width="100"> | <img alt="유재형" src="https://avatars.githubusercontent.com/u/83080505?v=4" height="100" width="100"> | <img alt="정승연" src="https://avatars.githubusercontent.com/u/102347529?v=4" height="100" width="100">
| [@1yoouoo](https://github.com/1yoouoo) |    [@minnyoung](https://github.com/minnyoung) | [@Jinnie-kim](https://github.com/Jinnie-kim) | [@jeongdopark](https://github.com/jeongdopark) | [@Withlaw](https://github.com/Withlaw) | [@leejy001](https://github.com/leejy001)| [@JwithYOU](https://github.com/JwithYOU) | [@xxyeon129](https://github.com/xxyeon129)


<br />

## 🔨 사용 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">

<br />

## 🔒 팀 코드 컨벤션
### git Flow
- branch : 기능별 작업
- commit message

| 커밋명 | 내용 |
| :---: | :--- |
| feat | 파일, 폴더, 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 형식, 정렬, 주석 등의 변경 |
| refactor | 코드 리팩토링 |
| test | 테스트 코드 추가 |
| comment | 파일을 삭제만 한 경우 |
| chore | 환경설정, 빌드 업무, 패키지 매니저 설정 등 |
| hotfix | 치명적이거나 급한 버그 수정 |

