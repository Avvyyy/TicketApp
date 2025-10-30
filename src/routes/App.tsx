import { Routes, Route } from "react-router-dom";
import { allRoutes } from "./app-routes";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

export const App = () => {
  // const location = useLocation();
  // const currentRoute = allRoutes.find((route) => route.path === location.pathname);

  return (
    <>
      <Routes>
        {allRoutes.map((route) => {
          if (route.isProtected) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <route.Component />
                  </ProtectedRoute>
                }

              />
            );
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                Component={route.Component}
              />
            );
          }
        })}
      </Routes>
    </>
  );
};