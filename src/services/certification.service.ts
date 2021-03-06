import { ENDPOINT } from "@static/constants";
import http from "@utils/http";
import notification from "@utils/notification.util";

export const axGetFarmersWithLastReportByCC = async (ccCode) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CERTIFICATION}/inspection/all/ccCode`, {
      params: { ccCode },
    });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axGetFarmerWithLastReportByFarmerId = async (farmerId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CERTIFICATION}/inspection/farmer/latest`, {
      params: { farmerId },
    });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetInspectionReportsByCCIds = async (params) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CERTIFICATION}/sync/all/ccCode`, { params });
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: [] };
  }
};

export const axGetInspectionReportById = async (reportId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.CERTIFICATION}/inspection/${reportId}`, {
      headers: { unauthorized: true },
    });
    return { success: true, data };
  } catch (e) {
    // notification(e.message);
    return { success: false, data: {} };
  }
};

export const axSaveICSInspectionReport = async (body) => {
  try {
    const { data } = await http.post(`${ENDPOINT.CERTIFICATION}/inspection/ics/sign`, body);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};

export const axGetFarmerInfoByFarmerId = async (farmerId) => {
  try {
    const { data } = await http.get(`${ENDPOINT.USER}/farmer/${farmerId}`);
    return { success: true, data };
  } catch (e) {
    notification(e.message);
    return { success: false, data: {} };
  }
};
