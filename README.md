# TrackerRadarApi-Redis
:boom: TrackerRadar REST Api With Redis DB :boom:<br><br>
## REST Example Data

Endpoint: /api/rest Returns a list of name that can be used to search in next endpoints

```JSON
   [
    "\"Agency of investigative reporters\" Company limited",
    "\"Begun\" JSC",
    "\"Buttinette\" Textil-Versandhaus GmbH",
    "\"CN-Software\" Ltd.",
    "\"Computing Forces\" CJSC",
    "\"Die Presse\" Verlags-Gesellschaft m.b.H. & Co KG",
    "\"Fashion Press\"",
    "\"Fin-Service 2000\", Inc.",
    "\"Gazeta.Ru\" JSC",
    "\"Group IB Service\" Ltd.",
    ...]
```

Endpoint: /api/rest/:name Returns information about given :name and domains :name has

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
      ...}
```

Endpoint: /api/rest/:name/domains Returns list of objects that store information about :name domains

```JSON
   [
    {
      "domain": {
        "domain": "0m66lx69dx.com"
      }
    },
    {
      "domain": {
        "domain": "1e100cdn.net"
      }
    },
    {
      "domain": {
        "domain": "2mdn.net",
        "owner": {
          "name": "Google LLC",
          "displayName": "Google",
          "privacyPolicy": "https://policies.google.com/privacy?hl=en&gl=us",
          "url": "http://google.com"
        },
        "source": [
          "DuckDuckGo"
        ]
      },
      ...]
```

Endpoint /api/rest/:name/combine Returns combined information of last two endpoints in one big object

```JSON
   {
    "name": "Google LLC",
    "displayName": "Google",
    "properties": [
      {
        "domain": {
          "domain": "0m66lx69dx.com"
        }
      },
      {
        "domain": {
          "domain": "2mdn.net",
          "owner": {
            "name": "Google LLC",
            "displayName": "Google",
            "privacyPolicy": "https://policies.google.com/privacy?hl=en&gl=us",
            "url": "http://google.com"
          },
          "source": [
            "DuckDuckGo"
          ],
        },
       ...}
```
