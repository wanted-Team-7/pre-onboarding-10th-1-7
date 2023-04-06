import SignUp from "./pages/SignUp";
import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth?: boolean;
}

const routerData: RouterElement[] = [
  {
    id: 0,
    path: "/signup",
    element: <SignUp />,
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
