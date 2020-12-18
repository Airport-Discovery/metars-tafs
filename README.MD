# metars-tafs

Get latest METARs and TAFs by ICAO code from [Aviation Weather Center](https://www.aviationweather.gov/)

## Installation

```
yarn add @airport-discovery/metars-tafs
```

## Usage

The module exposes two main functions, which accept an ICAO string or an array string of ICAOs

## `METARs`

```javascript
const airportDiscovery = require('@airport-discovery/metars-tafs');
const metars = await airportDiscovery.metars('LIMC'); // ICAO for Malpensa Airport (MXP)
```

## Output

```json
{
  "rawText": "LIMC 181720Z 28003KT 1500 BR BKN001 06/06 Q1027 NOSIG",
  "latitude": "45.62",
  "longitude": "8.72",
  "temperatureC": "6.0",
  "dewPointC": "6.0",
  "wind": {
    "directionDegrees": "280",
    "speedKt": "3"
  },
  "visibilityStatuteMi": "0.93",
  "altimInHg": "30.324802",
  "qualityControlFlags": {
    "no_signal": "TRUE"
  },
  "wxString": "BR",
  "skyCondition": {
    "skyCover": "BKN",
    "cloudBaseFtAgl": "100"
  },
  "flightCategory": "LIFR",
  "metarType": "METAR",
  "elevationM": "221.0"
}
```

Or multiple ICAO codes

```javascript
const airportDiscovery = require('@airport-discovery/metars-tafs');
const metars = await airportDiscovery.metars(['LIMC', 'LTFM']);
```

## Output

```json
[
  {
    "rawText": "LIMC 181750Z 32003KT 270V340 1100 R35R/P1500N R17L/P1500N R35L/P1500N BCFG BKN001 06/06 Q1027 BECMG 0800 FG",
    "latitude": "45.62",
    "longitude": "8.72",
    "temperatureC": "6.0",
    "dewPointC": "6.0",
    "wind": {
      "directionDegrees": "320",
      "speedKt": "3"
    },
    "visibilityStatuteMi": "0.68",
    "altimInHg": "30.324802",
    "qualityControlFlags": {},
    "wxString": "BCFG",
    "skyCondition": {
      "skyCover": "BKN",
      "cloudBaseFtAgl": "100"
    },
    "flightCategory": "LIFR",
    "metarType": "METAR",
    "elevationM": "221.0"
  },
  {
    "rawText": "LTFM 181750Z 36011KT 9999 SCT015 BKN025 07/04 Q1028 NOSIG RMK RWY17L 34010KT RWY34L 34010KT RWY16R 34008KT RWY36 35011KT RWY18 35011KT",
    "latitude": "41.27",
    "longitude": "28.75",
    "temperatureC": "7.0",
    "dewPointC": "4.0",
    "wind": {
      "directionDegrees": "360",
      "speedKt": "11"
    },
    "visibilityStatuteMi": "6.21",
    "altimInHg": "30.35433",
    "qualityControlFlags": {
      "no_signal": "TRUE"
    },
    "skyCondition": {},
    "flightCategory": "MVFR",
    "metarType": "METAR",
    "elevationM": "99.0"
  }
]
```

## `TAFs`

```javascript
const airportDiscovery = require('@airport-discovery/metars-tafs');
const tafs = await airportDiscovery.tafs('LIMC'); // ICAO for Malpensa Airport (MXP)
```

## Output

```json
{
  "rawText": "TAF LIMC 181700Z 1818/1924 VRB05KT 1500 BR BKN002 BKN050 PROB40 TEMPO 1821/1906 0600 FG BECMG 1907/1910 7000 SCT020 BKN040 BECMG 1918/1920 3000 BR",
  "issueTime": "2020-12-18T17:00:00Z",
  "bulletinTime": "2020-12-18T17:00:00Z",
  "validTimeFrom": "2020-12-18T18:00:00Z",
  "validTimeTo": "2020-12-20T00:00:00Z",
  "latitude": "45.62",
  "longitude": "8.72",
  "elevationM": "221.0",
  "forecast": [
    {
      "timeFrom": "2020-12-18T18:00:00Z",
      "timeTo": "2020-12-19T07:00:00Z",
      "wind": {
        "directinDegrees": "0",
        "speedKt": "5"
      },
      "visibilityStatuteMi": "0.93",
      "wxString": "BR",
      "skyCondition": {}
    },
    {
      "timeFrom": "2020-12-18T21:00:00Z",
      "timeTo": "2020-12-19T06:00:00Z",
      "changeIndicator": "TEMPO",
      "wind": {},
      "visibilityStatuteMi": "0.37",
      "wxString": "FG"
    },
    {
      "timeFrom": "2020-12-19T07:00:00Z",
      "timeTo": "2020-12-19T18:00:00Z",
      "changeIndicator": "BECMG",
      "timeBecoming": "2020-12-19T10:00:00Z",
      "wind": {
        "directinDegrees": "0",
        "speedKt": "5"
      },
      "visibilityStatuteMi": "4.35",
      "wxString": "BR",
      "skyCondition": {}
    },
    {
      "timeFrom": "2020-12-19T18:00:00Z",
      "timeTo": "2020-12-20T00:00:00Z",
      "changeIndicator": "BECMG",
      "timeBecoming": "2020-12-19T20:00:00Z",
      "wind": {
        "directinDegrees": "0",
        "speedKt": "5"
      },
      "visibilityStatuteMi": "1.86",
      "wxString": "BR",
      "skyCondition": {}
    }
  ]
}
```

Or multiple ICAO codes

```javascript
const airportDiscovery = require('@airport-discovery/metars-tafs');
const tafs = await airportDiscovery.tafs(['LIMC', 'LTFM']);
```

## Output

```json
[
  {
    "rawText": "TAF LIMC 181700Z 1818/1924 VRB05KT 1500 BR BKN002 BKN050 PROB40 TEMPO 1821/1906 0600 FG BECMG 1907/1910 7000 SCT020 BKN040 BECMG 1918/1920 3000 BR",
    "issueTime": "2020-12-18T17:00:00Z",
    "bulletinTime": "2020-12-18T17:00:00Z",
    "validTimeFrom": "2020-12-18T18:00:00Z",
    "validTimeTo": "2020-12-20T00:00:00Z",
    "latitude": "45.62",
    "longitude": "8.72",
    "elevationM": "221.0",
    "forecast": [
      {
        "timeFrom": "2020-12-18T18:00:00Z",
        "timeTo": "2020-12-19T07:00:00Z",
        "wind": {
          "directinDegrees": "0",
          "speedKt": "5"
        },
        "visibilityStatuteMi": "0.93",
        "wxString": "BR",
        "skyCondition": {}
      },
      {
        "timeFrom": "2020-12-18T21:00:00Z",
        "timeTo": "2020-12-19T06:00:00Z",
        "changeIndicator": "TEMPO",
        "wind": {},
        "visibilityStatuteMi": "0.37",
        "wxString": "FG"
      },
      {
        "timeFrom": "2020-12-19T07:00:00Z",
        "timeTo": "2020-12-19T18:00:00Z",
        "changeIndicator": "BECMG",
        "timeBecoming": "2020-12-19T10:00:00Z",
        "wind": {
          "directinDegrees": "0",
          "speedKt": "5"
        },
        "visibilityStatuteMi": "4.35",
        "wxString": "BR",
        "skyCondition": {}
      },
      {
        "timeFrom": "2020-12-19T18:00:00Z",
        "timeTo": "2020-12-20T00:00:00Z",
        "changeIndicator": "BECMG",
        "timeBecoming": "2020-12-19T20:00:00Z",
        "wind": {
          "directinDegrees": "0",
          "speedKt": "5"
        },
        "visibilityStatuteMi": "1.86",
        "wxString": "BR",
        "skyCondition": {}
      }
    ]
  },
  {
    "rawText": "TAF LTFM 181640Z 1818/1924 34012KT 9999 SCT015 BKN025 BECMG 1819/1821 27006KT TEMPO 1904/1908 4000 -RA BR BKN004 BKN020 BECMG 1909/1912 34010KT",
    "issueTime": "2020-12-18T16:40:00Z",
    "bulletinTime": "2020-12-18T17:00:00Z",
    "validTimeFrom": "2020-12-18T18:00:00Z",
    "validTimeTo": "2020-12-20T00:00:00Z",
    "latitude": "41.27",
    "longitude": "28.75",
    "elevationM": "99.0",
    "forecast": [
      {
        "timeFrom": "2020-12-18T18:00:00Z",
        "timeTo": "2020-12-18T19:00:00Z",
        "wind": {
          "directinDegrees": "340",
          "speedKt": "12"
        },
        "visibilityStatuteMi": "6.21",
        "skyCondition": {}
      },
      {
        "timeFrom": "2020-12-18T19:00:00Z",
        "timeTo": "2020-12-19T09:00:00Z",
        "changeIndicator": "BECMG",
        "timeBecoming": "2020-12-18T21:00:00Z",
        "wind": {
          "directinDegrees": "270",
          "speedKt": "6"
        },
        "visibilityStatuteMi": "6.21",
        "skyCondition": {}
      },
      {
        "timeFrom": "2020-12-19T04:00:00Z",
        "timeTo": "2020-12-19T08:00:00Z",
        "changeIndicator": "TEMPO",
        "wind": {},
        "visibilityStatuteMi": "2.49",
        "wxString": "-RA BR",
        "skyCondition": {}
      },
      {
        "timeFrom": "2020-12-19T09:00:00Z",
        "timeTo": "2020-12-20T00:00:00Z",
        "changeIndicator": "BECMG",
        "timeBecoming": "2020-12-19T12:00:00Z",
        "wind": {
          "directinDegrees": "340",
          "speedKt": "10"
        },
        "visibilityStatuteMi": "6.21",
        "skyCondition": {}
      }
    ]
  }
]
```

## License

MIT ©
