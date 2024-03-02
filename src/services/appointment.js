
import ApiService from "@src/services/api-service";

export async function createAppointment(obj) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.endpoint = "user/appointment";
  apiObject.body = obj;
  apiObject.multipart = true;
  return await ApiService.callApi(apiObject);
}

export async function getAppointmentForPatient(fromDate,toDate,status) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = `user/appointment?fromDate=${fromDate}&toDate=${toDate}&status=${status}`;
  return await ApiService.callApi(apiObject);
}