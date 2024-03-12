import { Button, Col, Input, Label, Row } from "reactstrap";
import IntlTelInput from "react-intl-tel-input";
import React, { useEffect, useState } from "react";
import moment from "moment";

import { Dropdown } from "semantic-ui-react";
import { notifyMessage } from "@src/utility/commun-func";
import { getMedicalTests } from "@src/services/statistics";
import Flatpickr from "react-flatpickr";
import { createAppointment } from "@src/services/appointment";
import Loader from "@components/spinner/Loader";
const DriverManage = ({  closeModal, updateHandler }) => {
  const [data, setData] = useState({});
  const [tests, setTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiLoader, setApiLoader] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedPaymentSlip, setSelectedPaymentSlip] = useState(null);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState([moment(new Date()).format("YYYY/MM/DD"),]);
  const [liveDate, setLiveDate] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTests();
  }, []);

  const getTests = async ()  => {
    setLoading(true);
    await getMedicalTests().then((res) => {
      if(res.success) {
        const testsArray = []
        console.log("tests",res.body)
        res.body && res.body.length > 0 && res.body.map((item) => {
          const obj = {
            key:item.id,
            text: item.testName,
            value: item.id,
          }
          testsArray.push(obj)
        });
        setTests(testsArray);
      } else {
        setTests([])
      }
    }).finally(()=> {
      setLoading(false);
    })
  }



  const manageHandler = async () => {

    if (selectedTests.length === 0)
      return notifyMessage("Please select test type", 0);
    if ((selectedDate == "" )|| (selectedDate === null))
      return notifyMessage("Preferred date can not be empty", 0);
    if (selectedPaymentSlip === null)
      return notifyMessage("Please upload payment slip", 0);


    setLoading(true)


    const formData = new FormData();
    formData.append("testIdList",selectedTests)
    formData.append("appointmentDate",selectedDate[0])
    formData.append("paymentSlipUrl",selectedPaymentSlip)
   if(selectedReceipt) formData.append("doctorReceiptUrl",selectedReceipt)
    formData.append("remark",note)



   await createAppointment(formData).then((res) => {
      if(res.success) {
        notifyMessage(res.message,1)
        if(updateHandler) updateHandler();
        closeModal();
      } else {
        notifyMessage(res.message,0)
      }
    }).finally(()=> {setLoading(false)});
  };




  const handleFileChange = (event,type) => {
    const file = event.target.files[0];
    if(type === 'payment') {
      setSelectedPaymentSlip(file);
    } else {
      setSelectedReceipt(file);
    }
  };



  return (
  <>
    {loading ? <Loader/> :
      <div className="manage-form">
        <Row>
          <Col md={12}>
            <div className={"text-wrapper tile-wrapper"}>
              <Label className={"required font-small-4"}>Select Medical Test Type</Label>
              <Dropdown
                disabled={false}
                placeholder="Type"
                className={"multi-dropdown"}
                fluid
                selection
                search={false}
                onChange={(e, { value }) => {
                  console.log('test value',value)
                  setSelectedTests(value)
                }}
                value={selectedTests}
                options={tests}
                selectOnBlur={false}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={"text-wrapper tile-wrapper mt-1"}>
              <Label className={"required font-small-4"}>Preferred Date</Label>
              <Flatpickr
                options={{
                  mode: "single",
                  maxDate: moment().add(3, "months").toDate(),
                  minDate: new Date(),
                  dateFormat: 'Y/m/d',
                }}
                className="form-control selected-date"
                placeholder={""}
                value={liveDate ? liveDate : selectedDate}
                onChange={(date) => {
                  setLiveDate(date);
                  setSelectedDate([moment(date[0]).format("YYYY/MM/DD")]);
                }}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className={"text-wrapper mb-1 mt-1 tile-wrapper"}>
              <Label className={"required font-small-4"}>Payment Slip</Label>
              <Input type="file" onChange={(e) => {handleFileChange(e,'payment')}}/>
            </div>
          </Col>

          <Col md={4}>
            {/*{!loading && (*/}
            <div className={"text-wrapper mb-1 mt-1 tile-wrapper"}>
              <Label className={" font-small-4"}>Doctor Receipt</Label>
              <Input type="file" onChange={handleFileChange} />
            </div>
            {/*)}*/}
          </Col>

          <Col md={12}>
            <div className={"text-wrapper mb-1 mt-1 tile-wrapper"}>
              <Label className={" font-small-4"}>Note</Label>
              <Input onChange={(e) => {setNote(e.target.value)}} style={{minHeight: '100px' }} type="textarea" />
            </div>
          </Col>

        </Row>

        <div className="d-flex justify-content-end">

          <button
            disabled={apiLoader}
            className="btn btn-primary mt-3"
            onClick={manageHandler}
          >
            Create Appointment
          </button>
        </div>
      </div>
    }
  </>
  );
};

export default DriverManage;
