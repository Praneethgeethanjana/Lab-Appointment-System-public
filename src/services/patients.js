import ApiService from "@src/services/api-service";

export async function getPatients(keyword,status) {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = true;
  apiObject.endpoint = `admin/user-list?keyword=${keyword}&status=${status}`;
  return await ApiService.callApi(apiObject);
}