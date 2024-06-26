export const ACCESS_TOKEN = "Y2VuLXBsYW5uZXItYWRtaW4tYWNjZXNzLXRva2Vu";
export const REFRESH_TOKEN = "Y2VuLXBsYW5uZXItYWRtaW4tcmVmcmVzaC10b2tlbg==";
export const SECRET_KEY = "dXNlcjo=";
export const ADMIN_SECRET_KEY = "YWRtaW46";
export const REFRESH_SECRET_KEY = "Y2V5ZW50cmE6";

export const SERVER_URL = "https://api.aise.lk/api";

export const USER_ROLE = localStorage.getItem("USER_ROLE")
export const ROLE_PATIENT = "PATIENT"
export const ROLE_ADMIN = "ADMIN"

//Routes
export const BASE_ROUTE_PATH = "/";
export const DASHBOARD_ROUTE_PATH = BASE_ROUTE_PATH + "home";
export const TEST_ROUTE_PATH = BASE_ROUTE_PATH + "medical-tests";
export const ROUTE_LOGIN = BASE_ROUTE_PATH + "login";
export const REGISTER_ROUTE = BASE_ROUTE_PATH + "register";
export const FORGOT_PASSWORD_ROUTE = BASE_ROUTE_PATH + "forgot-password";
export const RESET_PASSWORD_ROUTE = BASE_ROUTE_PATH + "reset-password";
export const VERIFY_ACCOUNT_ROUTE = BASE_ROUTE_PATH + "verify-account";
export const ROUTES_ROUTE = BASE_ROUTE_PATH + "routes";
export const APPOINTMENTS_ROUTE = BASE_ROUTE_PATH + "appointments";
export const APPOINTMENT_HISTORY_ROUTE = BASE_ROUTE_PATH + "appointment-history";
export const REPORTS_ROUTE = BASE_ROUTE_PATH + "test-reports";
export const PATIENTS_ROUTE = BASE_ROUTE_PATH + "patients";
export const CHANGE_PASSWORD_ROUTE = BASE_ROUTE_PATH + "change-password";
export const SOMETHING_WENT_WRONG_MSG = "Something went wrong";
