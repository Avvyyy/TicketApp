import GetStarted from "../components/auth/get-started";
import Login from "../components/auth/login";
import { Dashboard } from "../pages/dashboard";
import HomePage from "../pages/home-page";
import Tickets from "../pages/tickets";

type Route = {
    path: string;
    Component: React.FC;
    isProtected?: boolean;
}

const allRoutes: Route[] = [
    {
        path: "/",
        Component: HomePage,
        isProtected: false,
    },
    {
        path: "/login",
        Component: Login,
        isProtected: false,
    },
    {
        path: "/get-started",
        Component: GetStarted,
        isProtected: false,
    },
    {
        path: "/dashboard",
        Component: Dashboard,
        isProtected: true,
    },
        {
        path: "/tickets",
        Component: Tickets,
        isProtected: true,
    },
]

export { allRoutes };