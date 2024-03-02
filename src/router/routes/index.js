// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import {
  APPOINTMENTS_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  DASHBOARD_ROUTE_PATH,
  FORGOT_PASSWORD_ROUTE, REPORTS_ROUTE,
  REGISTER_ROUTE, RESET_PASSWORD_ROUTE,
  ROUTE_LOGIN,
  ROUTES_ROUTE, VERIFY_ACCOUNT_ROUTE, USER_ROLE, ROLE_ADMIN, PATIENTS_ROUTE, TEST_ROUTE_PATH
} from "@configs/constant";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title


// ** Default Route
const DefaultRoute =   APPOINTMENTS_ROUTE ;

const Home = lazy(() => import("../../views/home"));

const Reports = lazy(() => import("../../views/test-reports/test-reports"));
const Appointments = lazy(() => import("../../views/appointment/appointments"));
const Patients = lazy(() => import("../../views/patient/patients"));
const MedicalTests = lazy(() => import("../../views/home/medical-tests"));

const Login = lazy(() => import("../../views/auth/login"));
const Register = lazy(() => import("../../views/auth/register"));
const ChangePassword = lazy(() => import("../../views/change-password"));
const ForgotPassword = lazy(() => import("../../views/auth/forgot-password"));
const ResetPassword = lazy(() => import("../../views/auth/reset-password"));
const VerifyAccount = lazy(() => import("../../views/auth/verify-account"));
const Error = lazy(() => import("../../views/error"));

// ** Merge Routes
const Routes = [
  {
    path:  "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: DASHBOARD_ROUTE_PATH,
    element: <Home />,
  },
  {
    path: TEST_ROUTE_PATH,
    element: <MedicalTests />,
  },
  {
    path: REPORTS_ROUTE,
    element: <Reports/>,
  },
  {
    path: APPOINTMENTS_ROUTE,
    element: <Appointments/>,
  },
  {
    path: PATIENTS_ROUTE,
    element: <Patients/>,
  },
  {
    path: ROUTE_LOGIN,
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: CHANGE_PASSWORD_ROUTE,
    element: <ChangePassword />,
  },
  {
    path: REGISTER_ROUTE,
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: RESET_PASSWORD_ROUTE,
    element: <ResetPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: VERIFY_ACCOUNT_ROUTE,
    element: <VerifyAccount />,
    meta: {
      layout: "blank",
    },
  },

  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, Routes, getRoutes };
