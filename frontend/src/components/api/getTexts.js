import settings from "./settings"

const getTextsRequest = (gameModeId) => {
  const url = `${settings.apiURL}gamemode/${gameModeId}/text/`
  const opt = {
    method: "GET",
    headers: settings.headers(),
  }

  return {
    url: url,
    opt: opt,
  }
}

export default getTextsRequest;
