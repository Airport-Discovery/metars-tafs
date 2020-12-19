const axios = require('axios');
const parser = require('xml2json');

const getServiceURL = (icaos, service) =>
  `https://www.aviationweather.gov/adds/dataserver_current/httpparam?datasource=${service}&requesttype=retrieve&format=xml&hoursBeforeNow=1.25&mostRecentForEachStation=constraint&stationString=${icaos}`;

const METARS_SERVICE = 'metars';
const TAFS_SERVICE = 'tafs';

const getSingleMetar = metar => ({
  stationId: metar.stationId,
  rawText: metar.raw_text,
  observationTime: metar.observationTime,
  latitude: metar.latitude,
  longitude: metar.longitude,
  temperatureC: metar.temp_c,
  dewPointC: metar.dewpoint_c,
  wind: {
    directionDegrees: metar.wind_dir_degrees,
    speedKt: metar.wind_speed_kt
  },
  visibilityStatuteMi: metar.visibility_statute_mi,
  altimInHg: metar.altim_in_hg,
  qualityControlFlags: {
    ...metar.quality_control_flags
  },
  wxString: metar.wx_string,
  skyCondition: metar.sky_condition
    ? {
        skyCover: metar.sky_condition.sky_cover,
        cloudBaseFtAgl: metar.sky_condition.cloud_base_ft_agl
      }
    : undefined,
  flightCategory: metar.flight_category,
  metarType: metar.metar_type,
  elevationM: metar.elevation_m
});

const convertMetarsResponse = rawResponse => {
  const metarsObject = parser.toJson(rawResponse, { object: true });

  if (
    metarsObject &&
    metarsObject.response &&
    metarsObject.response.data &&
    metarsObject.response.data.METAR
  ) {
    const { response } = metarsObject;

    const { data } = response;
    const { METAR: metar } = data;

    if (Array.isArray(metar)) {
      return metar.map(singleMetar => getSingleMetar(singleMetar));
    }

    return getSingleMetar(metar);
  }

  return undefined;
};

const metars = async icaos => {
  if (Array.isArray(icaos)) {
    icaos = icaos.join(',');
  }

  const response = await axios.get(getServiceURL(icaos, METARS_SERVICE));

  if (response && response.data) {
    return convertMetarsResponse(response.data);
  }

  return undefined;
};

const getSingleForecast = forcst => {
  return {
    timeFrom: forcst.fcst_time_from,
    timeTo: forcst.fcst_time_to,
    changeIndicator: forcst.change_indicator,
    timeBecoming: forcst.time_becoming,
    wind: {
      directinDegrees: forcst.wind_dir_degrees,
      speedKt: forcst.wind_speed_kt
    },
    visibilityStatuteMi: forcst.visibility_statute_mi,
    wxString: forcst.wx_string,
    skyCondition: forcst.sky_condition
      ? {
          skyCover: forcst.sky_condition.sky_cover,
          cloudBaseFtAgl: forcst.sky_condition.cloud_base_ft_agl
        }
      : undefined
  };
};

const getSingleTaf = taf => {
  let forecast;

  if (taf.forecast) {
    if (Array.isArray(taf.forecast)) {
      forecast = taf.forecast.map(forcst => getSingleForecast(forcst));
    } else {
      forecast = getSingleForecast(taf.forecast);
    }
  }

  return {
    stationId: taf.station_id,
    rawText: taf.raw_text,
    issueTime: taf.issue_time,
    bulletinTime: taf.bulletin_time,
    validTimeFrom: taf.valid_time_from,
    validTimeTo: taf.valid_time_to,
    latitude: taf.latitude,
    longitude: taf.longitude,
    elevationM: taf.elevation_m,
    forecast
  };
};

const convertTafsResponse = rawResponse => {
  const tafsObject = parser.toJson(rawResponse, { object: true });

  if (
    tafsObject &&
    tafsObject.response &&
    tafsObject.response.data &&
    tafsObject.response.data.TAF
  ) {
    const { response } = tafsObject;
    const { data } = response;
    const { TAF: taf } = data;

    if (Array.isArray(taf)) {
      return taf.map(singleTag => getSingleTaf(singleTag));
    }

    return getSingleTaf(taf);
  }

  return undefined;
};

const tafs = async icaos => {
  if (Array.isArray(icaos)) {
    icaos = icaos.join(',');
  }

  const response = await axios.get(getServiceURL(icaos, TAFS_SERVICE));

  if (response && response.data) {
    return convertTafsResponse(response.data);
  }

  return undefined;
};

module.exports = {
  metars,
  tafs
};
