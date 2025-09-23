import decolectaClient from "../api/decolecta.client.js";

export async function getSunatByRuc(ruc) {
  const { data } = await decolectaClient.get(`/sunat/ruc/${ruc}`);
  return data;
}

export async function getReniecByDni(dni) {
  const { data } = await decolectaClient.get(`/reniec/dni/${dni}`);
  return data;
}
