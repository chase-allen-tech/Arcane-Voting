import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

import MainLayout from "layouts";
import Loading from "components/Loading";
import AdminGuard from "guards/AdminGuard";
import Roadmappage from "pages/Roadmappage";
import Aboutpage from "pages/Aboutpage";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Homepage /> },
        { path: "/id/:id", element: <DetailPage /> },
        { path: "/submit", element: <SubmitPage /> },
        { path: "/roadmap", element: <Roadmappage /> },
        { path: "/about", element: <Aboutpage /> },

        { path: "/edit/:id", element: <SubmitPage /> },
        {
          path: "/admin",
          element: (
            <AdminGuard>
              <AdminPage />
            </AdminGuard>
          ),
        },
      ],
    },
  ]);
}

// IMPORT COMPONENTS

const Homepage = Loadable(lazy(() => import("pages/Homepage")));
const SubmitPage = Loadable(lazy(() => import("pages/Submitpage")));
const AdminPage = Loadable(lazy(() => import("pages/Adminpage")));
const DetailPage = Loadable(lazy(() => import("pages/Detailpage")));
