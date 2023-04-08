import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todos from "./pages/Todos";

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/",
    element: <Home />,
    withAuth: false,
  },
  {
    id: 1,
    path: "/signup",
    element: <SignUp />,
    withAuth: false,
  },
  {
    id: 2,
    path: "/signin",
    element: <SignIn />,
    withAuth: false,
  },
  {
    id: 3,
    path: "/todos",
    element: <Todos />,
    withAuth: false,
  },
];

export const routers: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: router.element,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);
