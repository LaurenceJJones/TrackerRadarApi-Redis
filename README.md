# TrackerRadarApi-Redis
:boom: TrackerRadar REST Api based on DuckDuckGo Tracker-Radar With Redis DB :boom:
<br>
<br>
### Full Atrribution For The Source Data Goes To DuckDuckGo [#Link](https://github.com/duckduckgo/tracker-radar)
<br>

## REST Example Data

Endpoint: /api/rest Returns a list of name that can be used to search in next endpoints

```JSON
[
  "Bpost",
  "THE ARIZONA CONSERVATIVE",
  "Transport for NSW",
  "Lockheed Martin Corporation",
  "Digital Squad",
  "publis.de",
  "Swyrich Corp",
  "State of Illinois/Illinois Century Network",
  "Omroep Brabant Mediafaciliteiten",
...]
```

Endpoint: /api/rest/:name Returns information about given :name and domains :name has

```JSON
{
  "name": "Google LLC",
  "displayName": "Google",
  "properties": [
    "0m66lx69dx.com",
    "1e100cdn.net",
    "1emn.com",
    "1enm.com",
    "2enm.com",
    "2mdn.net",
    "8d1f.com",
    "accurateshooter.net",
    "adgoogle.net",
    "admeld.com",
    "admob.com",
    "adsense.com",
   ...],
  "prevalence": {
    "tracking": 0.81,
    "nonTracking": 0.0712,
    "total": 0.881
  }
}
```

Endpoint: /api/rest/:name/domains Returns list of objects that store information about :name domains

```JSON
[
  {
    "domain": "0m66lx69dx.com"
  },
  {
    "domain": "1e100cdn.net"
  },
  {
    "domain": "1emn.com"
  },
  {
    "domain": "2mdn.net",
    "owner": {
      "name": "Google LLC",
      "displayName": "Google",
      "privacyPolicy": "https://policies.google.com/privacy?hl=en&gl=us",
      "url": "http://google.com"
    },
    "source": [
      "DuckDuckGo-NO"
    ],
...]
```

Endpoint /api/rest/:name/combine Returns combined information of last two endpoints in one big object

```JSON
{
  "name": "Google LLC",
  "displayName": "Google",
  "properties": [
    {
      "domain": "0m66lx69dx.com"
    },
    {
      "domain": "1e100cdn.net"
    },
    {
      "domain": "1emn.com"
    },
    {
      "domain": "1enm.com"
    },
    {
      "domain": "2enm.com"
    },
    {
      "domain": "2mdn.net",
      "owner": {
        "name": "Google LLC",
        "displayName": "Google",
        "privacyPolicy": "https://policies.google.com/privacy?hl=en&gl=us",
        "url": "http://google.com"
      },
      "source": [
        "DuckDuckGo-NO"
      ],
  ...},
  "prevalence": {
    "tracking": 0.81,
    "nonTracking": 0.0712,
    "total": 0.881
  }
```
