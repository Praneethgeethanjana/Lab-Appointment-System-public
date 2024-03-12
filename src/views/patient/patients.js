import {
  Col, Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";

import {
  checkAMPM,
  downloadCSV,
  notifyMessage,
} from "@src/utility/commun-func";
import Loader from "@components/spinner/Loader";
import moment from "moment/moment";
import { Checkbox, Dropdown, Form } from "semantic-ui-react";
import Flatpickr from "react-flatpickr";
import { Box, Eye, File, Plus } from "react-feather";
import { useNavigate } from "react-router-dom";
import CreateAppointmentModal from "@src/views/appointment/component/create-appointment-modal";
import { getAppointmentForAdmin, getAppointmentForPatient } from "@src/services/appointment";
import { getPatients } from "@src/services/patients";


const Patients = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [patients, setPatients] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [keyword, setKeyword] = useState("");



  useEffect(() => {
    setLoader(true);
    getAllPatients();
  }, [keyword]);


  const getAllPatients = async (search, sts) => {
    setLoader(true);
    await getPatients(search ?? keyword ,sts ?? status).then((res) => {
      if(res.success) {
        const filtered = res.body.filter((item) => item.userRole !== "ADMIN");
        setPatients(filtered)
      } else {
        notifyMessage(res.message,0)
        setPatients([])
      }
    }).finally(() => {setLoader(false);})
  }


  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">PATIENTS</Label>
        </div>

        <Col md={12}>
          <Row className="px-1">
            <div className="d-sm-flex justify-content-end d-block pb-2 p-1  filter-box rounded my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Search</p>
                  <Input placeholder={'Search by patient'}  onChange={(e)=> {setKeyword(e.target.value)}} />
                </div>
              </Col>
              {/*<Col xs={12} sm={6} md={3}>*/}
              {/*  <div className="px-0 px-sm-2">*/}
              {/*    <p className="mb-0">Status</p>*/}
              {/*    <Dropdown*/}
              {/*      disabled={false}*/}
              {/*      placeholder=""*/}
              {/*      className={"form-control"}*/}
              {/*      fluid*/}
              {/*      selection*/}
              {/*      search={false}*/}
              {/*      onChange={(e, { value }) => {*/}
              {/*        setStatus(value);*/}
              {/*        getAllPatients(null,null,value)*/}
              {/*      }}*/}
              {/*      value={status}*/}
              {/*      options={[*/}
              {/*        { key: "ALL", text: "ALL", value: "ALL" },*/}
              {/*        { key: "PENDING", text: "PENDING", value: "PENDING" },*/}
              {/*        { key: "ACTIVE", text: "ACCEPTED", value: "ACTIVE" },*/}
              {/*        { key: "REJECTED", text: "REJECTED", value: "REJECTED" },*/}
              {/*      ]}*/}
              {/*      selectOnBlur={false}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</Col>*/}
            </div>
          </Row>
        </Col>

        {loader ? (
          <Loader />
        ) : (
          <Col xs={12} className={"datatable-main-wrapper mt-2"}>
            <div>
              <DataTable
                className="dataTable-custom light-table"
                data={patients}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "PATIENT ID",
                    selector: (row) => row["userUniqueId"],
                    sortable: false,
                    minWidth: "150px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.userUniqueId}
                      </p>
                    ),
                  },
                  {
                    name: "USERNAME",
                    selector: (row) => row["userName"],
                    sortable: false,
                    minWidth: "220px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row?.userName}
                      </p>
                    ),
                  },
                  {
                    name: "NAME",
                    selector: (row) => row["user"],
                    sortable: false,
                    minWidth: "200px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row?.firstName + ' ' + row?.lastName}
                      </p>
                    ),
                  },
                  {
                    name: "MOBILE",
                    selector: (row) => row["mobile"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.mobile ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "ADDRESS",
                    selector: (row) => row["address"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.address ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "COUNTRY",
                    selector: (row) => row["country"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.country ?? "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "VERIFICATION STATUS",
                    selector: (row) => row["account_verify_status"],
                    sortable: false,
                    minWidth: "180px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.account_verify_status ?? "N/A"}
                      </p>
                    ),
                  },

                ]}
                noHeader={true}
              />
            </div>
          </Col>
        )}
      </Row>

    </div>
  );
};

export default Patients;
