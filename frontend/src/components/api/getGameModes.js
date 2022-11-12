import settings from "./settings"

const getGameModesRequest = () => {
  const url = `${settings.apiURL}gamemode/`
  const opt = {
    method: "GET",
    headers: settings.headers(),
  }

  return {
    url: url,
    opt: opt,
  }
}

export default getGameModesRequest;
