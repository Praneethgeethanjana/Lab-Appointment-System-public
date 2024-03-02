import {
  Col,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
;
import {
  checkAMPM,
  downloadCSV,
  notifyMessage,
} from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import moment from "moment/moment";
import { Checkbox, Dropdown, Form } from "semantic-ui-react";
import Flatpickr from "react-flatpickr";
import { Box, Eye, Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, ROLE_PATIENT,  USER_ROLE } from "../../configs/constant";
import Pagination from "../../@core/components/pagination";
import AppointmentsForPatient from "@src/views/appointment/patient-view";
import AppointmentsForAdmin from "@src/views/appointment/admin-view";


const Appointments = () => {


  return (
    <div>
      {USER_ROLE === ROLE_PATIENT ? <AppointmentsForPatient/> : <AppointmentsForAdmin/>}
    </div>
  );
};

export default Appointments;
