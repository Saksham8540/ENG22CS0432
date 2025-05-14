// services/stockService.js
const axios = require('axios');

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

// Replace this with your actual Bearer token string
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MjA0OTkyLCJpYXQiOjE3NDcyMDQ2OTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ2ZDQxYjJmLTQ4ZDgtNGU4NS04ZDdkLWUyZGZhZGZlNmE3NiIsInN1YiI6InNha3NoYW1iYW5zYWw0NjFAZ21haWwuY29tIn0sImVtYWlsIjoic2Frc2hhbWJhbnNhbDQ2MUBnbWFpbC5jb20iLCJuYW1lIjoic2Frc2hhbSBiYW5zYWwiLCJyb2xsTm8iOiJlbmcyMmNzMDQzMiIsImFjY2Vzc0NvZGUiOiJDdnRQY1UiLCJjbGllbnRJRCI6ImQ2ZDQxYjJmLTQ4ZDgtNGU4NS04ZDdkLWUyZGZhZGZlNmE3NiIsImNsaWVudFNlY3JldCI6Ilh6c2pzZWFQU3FzQlFyTm4ifQ.153xYj3P7syeBVbljGO1p6EgJ4b653b6cpXC7SepEZk';

exports.fetchStockPrices = async (ticker, minutes) => {
  const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
  console.log("Requesting:", url);
  console.log("Using token:", TOKEN);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: TOKEN
      }
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.status, error.response?.data);
    throw new Error("External API call failed");
  }
};