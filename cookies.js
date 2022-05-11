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
  const cookies = document.cookie.split(" ");

  return cookies.find((each) => each.startsWith(`${cookieName}=`));
};

export const setCookie = (cookieName, value = "", days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${cookieName}=${value}${expires}`;
};

export const deleteCookie = (cookieName) => {
  const date = new Date();
  date.setTime(date.getTime() - 2000);
  document.cookie = `${cookieName}=""; expires=${date.toUTCString()}`;
};

export const nukeAllCookies = () => {
  const cookies = getCookies();
  Object.keys(cookies).forEach((cookie) => deleteCookie(cookie));
};
