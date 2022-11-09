import settings from "./settings"

const getGameModesRequest = () => {
  const url = `${settings.apiURL}gamemode/`
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

export default getGameModesRequest;
