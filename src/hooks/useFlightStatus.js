import { useState, useEffect } from "react";
import { fetchFlightsForToday } from "../services/amadeusService.js";

export function useFlightsForToday(airportCode) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!airportCode) return;

    setLoading(true);
    fetchFlightsForToday(airportCode)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [airportCode]);

  return { data, loading, error };
}
