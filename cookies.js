export const getCookies = () => {
  const cookies = document.cookie.split(" ");
  const cookieObj = {};

  for (let i = 0; i < cookies.length; i++) {
    const splitCookie = cookies[i].split("=");
    cookieObj[splitCookie[0]] = splitCookie[1];
  }

  return cookieObj;
};

export const getCookie = (cookieName) => {
  const cookies = getCookies();

  return cookies[cookieName];
};

export const setCookie = (cookieName, value) => {
  document.cookie = `${cookieName}=${value}`;
};
