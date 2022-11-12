const redirectToLogin = (navigate, location) => {
  navigate(`/login/?next=${location.pathname}`);
}

const zeroPad = (num, places) => String(num).padStart(places, '0')

const timeFormat = (milliseconds) => {
  return `${zeroPad(Math.floor(milliseconds / 1000 / 60) % 60, 2)}:
          ${zeroPad(Math.floor(milliseconds / 1000) % 60, 2)}.
          ${zeroPad(Math.floor(milliseconds) % 1000, 3)}
  `.replace(/\s+/g, '');;
}

const Utils = {
  redirectToLogin: redirectToLogin,
  timeFormat: timeFormat,
}

export default Utils;
