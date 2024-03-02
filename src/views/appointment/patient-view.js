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
import { ACCESS_TOKEN, ROUTE_LOGIN } from "../../configs/constant";
import Pagination from "../../@core/components/pagination";
import CreateAppointmentModal from "@src/views/appointment/component/create-appointment-modal";
import { getAppointmentForPatient } from "@src/services/appointment";


const AppointmentsForPatient = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [selectedDates, setSelectedDates] = useState([
    moment(new Date()).subtract(7, "days").format("YYYY/MM/DD"),
    moment(new Date()).format("YYYY/MM/DD"),
  ]);
  const [liveDate, setLiveDate] = useState(null);
  const [isAssignModal, setIsAssignModal] = useState(false);

  useEffect(() => {
     // setLoader(true);
    getMyAppointments();
  }, []);


const getMyAppointments = async (startDate,endDate, sts) => {

  await getAppointmentForPatient(startDate ?? selectedDates[0],endDate ?? selectedDates[1],sts ?? status).then((res) => {
    if(res.success) {
      console.log("get appointments",res)
      setAppointments(res.body)
    } else {
      notifyMessage(res.message,0)
      setAppointments([])
    }
  })
}


  return (
    <div>
      <Row className={"main-row"}>
        <div className="d-flex flex-wrap justify-content-between w-100 top-custom-wrapper">
          <Label className="font-medium-2 mt-1">APPOINTMENTS</Label>
          {!loader && (
            <button
              onClick={() => {
                setIsAssignModal(true);
              }}
              type="button"
              className="btn btn-primary"
            >
              <Plus size="15" />
              NEW APPOINTMENT
            </button>
          )}
        </div>

        <Col md={12}>
          <Row className="px-1">
            <div className="d-sm-flex justify-content-end d-block pb-2 p-1  filter-box rounded my-2">
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 px-sm-2">
                  <p className="mb-0">Status</p>
                  <Dropdown
                    disabled={false}
                    placeholder=""
                    className={"form-control"}
                    fluid
                    selection
                    search={false}
                    onChange={(e, { value }) => {
                      setStatus(value);
                      getMyAppointments(null,null,value)
                    }}
                    value={status}
                    options={[
                      { key: "ALL", text: "ALL", value: "ALL" },
                      { key: "PENDING", text: "PENDING", value: "PENDING" },
                      { key: "ACTIVE", text: "ACCEPTED", value: "ACTIVE" },
                      { key: "REJECTED", text: "REJECTED", value: "REJECTED" },
                    ]}
                    selectOnBlur={false}
                  />
                </div>
              </Col>
              <Col xs={12} sm={6} md={3}>
                <div className="px-0 mt-2 mt-sm-0 px-sm-2">
                  <p className="mb-0">Appoint Date</p>
                  <Flatpickr
                    options={{
                      mode: "range",
                      dateFormat: 'Y/m/d',
                    }}
                    className="form-control selected-date"
                    placeholder={"Select date range"}
                    value={liveDate ? liveDate : selectedDates}
                    onChange={(date) => {
                      setLiveDate(date);
                      setSelectedDates([
                        moment(date[0]).format("YYYY/MM/DD"),
                        moment(date[1]).format("YYYY/MM/DD"),
                      ]);
                      getMyAppointments( moment(date[0]).format("YYYY/MM/DD"),moment(date[1]).format("YYYY/MM/DD"),null)
                    }}
                  />
                </div>
              </Col>
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
                data={appointments}
                pointerOnHover
                highlightOnHover
                responsive
                columns={[
                  {
                    name: "APPOINTMENT ID",
                    selector: (row) => row["id"],
                    sortable: false,
                    minWidth: "100px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.id}
                      </p>
                    ),
                  },
                  {
                    name: "CREATED DATE",
                    selector: (row) => row["created"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.created ? row.created.split('T')[0] : "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "APPOINT DATE",
                    selector: (row) => row["appointmentDate"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.appointmentDate ? row.appointmentDate.split('T')[0] : "N/A"}
                      </p>
                    ),
                  },

                  // {
                  //   name: "Reports",
                  //   selector: (row) => row[""],
                  //   sortable: false,
                  //   minWidth: "80px",
                  //   cell: (row) => (
                  //     <div className={"mid-center"}>
                  //       <div
                  //         onClick={() => {
                  //           setIsOpen(true);
                  //           setOrder(row);
                  //           setPackages(null);
                  //         }}
                  //       >
                  //         <Eye size={25} color={"#365DE8"} />
                  //       </div>
                  //       {row.packageDetails &&
                  //         row.packageDetails.length > 0 && (
                  //           <div
                  //             onClick={() => {
                  //               setIsOpen(true);
                  //               setOrder(row);
                  //               setPackages(row.packageDetails);
                  //             }}
                  //           >
                  //             <Box
                  //               style={{ marginLeft: "10px" }}
                  //               size={25}
                  //               color={"#365DE8"}
                  //             />
                  //           </div>
                  //         )}
                  //     </div>
                  //   ),
                  // },

                  {
                    name: "PAYMENT SLIP",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "80px",
                    cell: (row) => (
                      <div className={"mid-center"}>
                        <div
                          onClick={() => {
                            window.open(row.paymentSlipUrl)
                          }}
                        >
                          <File size={25} color={"#365DE8"} />
                        </div>
                      </div>
                    ),
                  },
                  {
                    name: "DOCTOR RECEIPT",
                    selector: (row) => row[""],
                    sortable: false,
                    minWidth: "80px",
                    cell: (row) => (
                      <div className={"mid-center"}>
                        {row.doctorReceiptUrl ?
                          <div
                            onClick={() => {
                              window.open(row.doctorReceiptUrl)
                            }}
                          >
                            <File size={25} color={"#365DE8"} />
                          </div> : 'N/A'}
                      </div>
                    ),
                  },
                  {
                    name: "TOTAL FEE",
                    selector: (row) => row["total"],
                    sortable: false,
                    minWidth: "130px",
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.total ?  `Rs ${row.total}` : "N/A"}
                      </p>
                    ),
                  },
                  {
                    name: "STATUS",
                    selector: (row) => row["status"],
                    minWidth: "150px",
                    sortable: false,
                    cell: (row) => (
                      <p className="text-bold-500 text-truncate mb-0">
                        {row.status}
                      </p>
                    ),
                  },
                  {
                    name: "NOTE",
                    selector: (row) => row["remark"],
                    sortable: false,
                    minWidth: "200px",
                    cell: (row) => (
                      <p className="text-bold-500 mb-0">
                        {row.remark ?? "N/A"}
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

      <Modal
        size={'lg'}
        isOpen={isOpen || isAssignModal}
      >
        <ModalHeader
          toggle={() => {
            setIsOpen(false);
            setIsAssignModal(false);
          }}
          className={"selector-wrapper font-medium-2 inline-flex"}
        >
          {`Create New Appointment`}
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">

          {/*<OrderManage*/}
          {/*  packages={packages ?? false}*/}
          {/*  data={order}*/}
          {/*  closeModal={() => setIsOpen(false)}*/}
          {/*/>*/}

          <CreateAppointmentModal closeModal={() => {setIsAssignModal(false)}}/>

        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default AppointmentsForPatient;