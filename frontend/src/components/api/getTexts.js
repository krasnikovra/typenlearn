import settings from "./settings"

const getTextsRequest = (gameModeId) => {
  const url = `${settings.apiURL}gamemode/${gameModeId}/text/`
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  const opt = {
    method: "GET",
    headers: headers,
  }

  return {
    url: url,
    opt: opt,
  }
}

export default getTextsRequest;
