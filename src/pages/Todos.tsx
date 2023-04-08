import { useState, useEffect } from "react";

interface fetchDataType {
  email: string;
  password: string;
}
const Todos: React.FC = () => {
  const [todoItems, setTodoItems] = useState([]);
  useEffect(() => {
    // const { email, password } = JSON.parse(localStorage.getItem("'access_token'"));
    const getTodos = async () => {
      const response = await fetch(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          method: "get",
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      } else {
        const fetchedData = await response.json();
        setTodoItems(() => fetchedData);
      }
    };
    getTodos();
  }, []);
  console.log(todoItems);
  return (
    <section>
      <article></article>
    </section>
  );
};

export default Todos;
