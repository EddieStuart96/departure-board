const API_BASE_URL = "/v2/schedule/flight-status";
const API_KEY = "";

export async function fetchFlightsForToday(airportCode) {
  const today = new Date().toISOString().split("T")[0];

  try {
    const response = await fetch(
      `http://localhost:8080/api/flights?date=${today}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch flight data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return null;
  }
}
