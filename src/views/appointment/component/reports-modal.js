import { Button, Col, Input, Label, Row } from "reactstrap";
import IntlTelInput from "react-intl-tel-input";
import React, { useEffect, useState } from "react";
import moment from "moment";

import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import { getMedicalTests } from "@src/services/statistics";
import Flatpickr from "react-flatpickr";
import { createAppointment, getAppointmentForAdmin, getReportForAdmin, uploadReport } from "@src/services/appointment";
import Loader from "@components/spinner/Loader";
const ReportsModal = ({  closeModal, updateHandler , selectedData , patient}) => {
  const [data, setData] = useState({});
  const [tests, setTests] = useState([]);
  const [reportUrl, setReportUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedReport, setUploadedReport] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    setLoading(true);
    getReports();
  }, []);

  const getReports = async ()  => {
    setLoading(true);
    await getReportForAdmin(selectedData?.id,patient).then((res) => {
      if(res.success) {
        console.log("RES OF GET REPORT",res)
        if(res.body && res.body.length > 0) {
          setReportUrl(res.body[0].reportUrl)
          setNote(res.body[0].note)
        }
      }
    }).finally(()=> {
      setLoading(false);
    })
  }



  const manageHandler = async () => {
      if(reportUrl) {
        closeModal();
      } else {

        if (uploadedReport === null)
          return notifyMessage("Please upload report", 0);


        setLoading(true)

        const formData = new FormData();

        formData.append("report",uploadedReport)
        formData.append("note",note)


        await uploadReport(selectedData?.id,formData).then((res) => {
          if(res.success) {
            console.log("uploaded response",res)
            notifyMessage(res.message,1)
            if(updateHandler) updateHandler(selectedData?.id);
            closeModal();
          } else {
            notifyMessage(res.message,0)
          }
        }).finally(()=> {setLoading(false)});
      }
  };




  const handleFileChange = (event) => {
    const file = event.target.files[0];
      setUploadedReport(file);
  };



  return (
    <>
      {loading ? <Loader/> :
        <div className="manage-form">
          <Row>


            <Col md={12}>
              <div className={"text-wrapper  mt-1 tile-wrapper"}>
                <Label className={" font-small-4"}>Patient ID : {selectedData?.user?.userUniqueId}</Label>
              </div>
            </Col>
            <Col md={12}>
              <div className={"text-wrapper mb-1 tile-wrapper"}>
                <Label className={" font-small-4"}>Patient Name : {selectedData?.user?.firstName + " " + selectedData?.user?.lastName}</Label>
              </div>
            </Col>

            <Col md={12}>
              <div className={"text-wrapper mb-1 mt-1 tile-wrapper"}>
                <Label className={"required font-small-4"}>{selectedData?.appointmentDetails[0].medicalTest.testName} Report</Label>
                {reportUrl ? <div className="mb-1">
                  <a target={"_blank"} href={reportUrl}>View Report - {reportUrl}</a>
                </div> :  <Input placeholder={"Upload file"}  type="file" onChange={(e) => {handleFileChange(e)}}/>}

              </div>
            </Col>



            <Col md={12}>
              <div className={"text-wrapper mb-1 mt-1 tile-wrapper"}>
                <Label className={" font-small-4"}>Note</Label>
                {reportUrl ? (note !== "" ? note : <div><Label className={" font-small-4"}>N/A</Label></div>) : <Input onChange={(e) => {setNote(e.target.value)}} style={{minHeight: '100px' }} type="textarea" />}
              </div>
            </Col>

          </Row>

          <div className="d-flex justify-content-end">

            <button
              disabled={loading}
              className="btn btn-primary mt-3"
              onClick={manageHandler}
            >
              {reportUrl ? 'OK' : 'Upload Report'}
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default ReportsModal;
