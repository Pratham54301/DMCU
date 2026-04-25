const ADMIN_SESSION_KEY = "dmcu_admin_session";

const canUseStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const getStoredAdminSession = () => {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const value = window.localStorage.getItem(ADMIN_SESSION_KEY);

    if (!value) {
      return null;
    }

    const parsed = JSON.parse(value);

    if (!parsed?.token || !parsed?.admin) {
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
};

export const saveStoredAdminSession = (session) => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    ADMIN_SESSION_KEY,
    JSON.stringify({
      token: session.token,
      admin: session.admin
    })
  );
};

export const clearStoredAdminSession = () => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_KEY);
};
