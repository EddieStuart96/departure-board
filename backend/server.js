import express from "express";
import fetch from "node-fetch";

const app = express();

const API_KEY = "";
const API_SECRET = "";

const getAuthToken = async () => {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", API_KEY);
  params.append("client_secret", API_SECRET);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      throw new Error(`Error: ${data.error_description}`);
    }
  } catch (error) {
    console.error(error);
  }
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Define a route to fetch flight data
app.get("/api/flights", async (req, res) => {
  const { airportCode, date } = req.query;

  try {
    const authToken = await getAuthToken();
    console.log("authToken", authToken);

    const response = await fetch(
      `https://test.api.amadeus.com/v1/flight-status/airport/JFK/departures?dateTime=2025-03-02T00:00:00Z`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("res", response);

    if (!response.ok) {
      throw new Error("Failed to fetch data from Amadeus API");
    }

    const data = await response.json();
    res.json(data);
    console.log("res", res);
  } catch (error) {
    console.log("error", error.message);

    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
