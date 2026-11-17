export type Place = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  timezone: string;
  defaultUnits: "metric" | "imperial";
  alerts: { label: string; url: string }[];
  forecastLinks: { label: string; url: string }[];
};

export const PLACES: Place[] = [
  {
    id: "shuswap",
    name: "Blind Bay / Shuswap",
    region: "British Columbia",
    lat: 50.888,
    lon: -119.357,
    timezone: "America/Vancouver",
    defaultUnits: "metric",
    alerts: [
      { label: "Environment Canada alerts for B.C.", url: "https://weather.gc.ca/warnings/index_e.html?prov=bc" },
      { label: "EmergencyInfoBC", url: "https://www.emergencyinfobc.gov.bc.ca/" },
      { label: "DriveBC road conditions", url: "https://www.drivebc.ca/" },
    ],
    forecastLinks: [{ label: "Environment Canada: Salmon Arm", url: "https://weather.gc.ca/en/location/index.html?coords=50.702,-119.272" }],
  },
  {
    id: "fmb",
    name: "Fort Myers Beach",
    region: "Florida",
    lat: 26.452,
    lon: -81.948,
    timezone: "America/New_York",
    defaultUnits: "imperial",
    alerts: [
      { label: "NWS alerts for Lee County", url: "https://alerts.weather.gov/search?area=FL&county=FLC071" },
      { label: "NWS marine forecast (Bonita Beach–Englewood)", url: "https://forecast.weather.gov/shmrn.php?mz=gmz856" },
      { label: "National Hurricane Center", url: "https://www.nhc.noaa.gov/" },
    ],
    forecastLinks: [{ label: "NWS forecast: Fort Myers Beach", url: "https://forecast.weather.gov/MapClick.php?lat=26.4517&lon=-81.9481" }],
  },
];
