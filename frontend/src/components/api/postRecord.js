import settings from "./settings"

const postRecordRequest = (text_id, gamemode_id, timems) => {
  const url = `${settings.apiURL}record/`
  const body = {
    record: {
      text_id: text_id,
      gamemode_id: gamemode_id,
      timems: timems,
    }
  }
  const opt = {
    method: "POST",
    headers: settings.headers(),
    body: JSON.stringify(body),
  }

  return {
    url: url,
    opt: opt,
  }
}

export default postRecordRequest;
