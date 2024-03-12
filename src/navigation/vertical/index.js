import {
  Activity,
  Box,
  FileText,
  Crosshair,
  Map,
  MessageSquare,
  Users, Book, CheckSquare, FolderPlus
} from "react-feather";
import {
  APPOINTMENT_HISTORY_ROUTE, APPOINTMENTS_ROUTE,
  REPORTS_ROUTE, USER_ROLE, ROLE_ADMIN, ROLE_PATIENT, PATIENTS_ROUTE, DASHBOARD_ROUTE_PATH, TEST_ROUTE_PATH
} from "../../configs/constant";


 const navigationItems = [
   {
     id: "home",
     title: "Medical Tests",
     icon: <FolderPlus size={20} />,
     navLink: TEST_ROUTE_PATH,
     roles:[ROLE_PATIENT]
   },
  {
    id: "appointments",
    title: "Appointments",
    icon: <FileText size={20} />,
    navLink: APPOINTMENTS_ROUTE,
    roles:[ROLE_PATIENT,ROLE_ADMIN]
  },
  // {
  //   id: "reports",
  //   title: "Test Reports",
  //   icon: <Activity size={20} />,
  //   navLink: REPORTS_ROUTE,
  //   roles:[ROLE_PATIENT,ROLE_ADMIN]
  // },
   {
     id: "patients",
     title: "Patients",
     icon: <Users size={20} />,
     navLink: PATIENTS_ROUTE,
     roles:[ROLE_ADMIN]
   },
];

const userRole = USER_ROLE;

export default navigationItems.filter(item => {
  if (!item.roles || item.roles.includes(userRole)) {
    return true;
  }
  return false;
});