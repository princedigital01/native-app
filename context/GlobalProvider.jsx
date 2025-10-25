import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

// 🔐 SecureStore helpers
const saveSecureItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to SecureStore:", e);
  }
};

const getSecureItem = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result ? JSON.parse(result) : null;
  } catch (e) {
    console.error("Error reading from SecureStore:", e);
    return null;
  }
};

const deleteSecureItem = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.error("Error deleting from SecureStore:", e);
  }
};

export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load stored data when app starts
  useEffect(() => {
    (async () => {
      const storedUser = await getSecureItem("user");
      const storedUsers = await getSecureItem("users");

      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
      if (storedUsers) {
        setUsers(storedUsers);
      }
    })();
  }, []);

  // 🔹 Login
  const useLogin = async (data) => {
    if (!data.email || !data.password) {
      return { ok: false, message: "Fill all fields" };
    }

    const found = users.find((u) => u.email === data.email);
    if (!found) {
      return { ok: false, message: "Email does not exist" };
    }

    const log = users.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (!log) {
      return { ok: false, message: "Password incorrect" };
    }

    setUser(log);
    setIsLoggedIn(true);
    await saveSecureItem("user", log);
    return { ok: true, message: "Login successful" };
  };

  // 🔹 Logout
  const useLogout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    await deleteSecureItem("user");
    return { ok: true, message: "Logged out successfully" };
  };

  // 🔹 Clear all data
  const useClearData = async () => {
    setUser(null);
    setUsers([]);
    await deleteSecureItem("user");
    await deleteSecureItem("users");
    return { ok: true, message: "All data cleared" };
  };

  // 🔹 Create account
  const useCreate = async (newUser) => {
    if (!newUser.email || !newUser.password || !newUser.username) {
      return { ok: false, message: "Fill all fields" };
    }

    const exists = users.find((u) => u.email === newUser.email);
    if (exists) {
      return { ok: false, message: "Email already exists" };
    }

    setUser(newUser);
    setUsers((prevUsers) => [newUser, ...prevUsers]);
    setIsLoggedIn(true);

    await saveSecureItem("user", newUser);
    await saveSecureItem("users", [newUser, ...users]);

    return { ok: true, message: "Account created successfully" };
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        users,
        isLoggedIn,
        useLogin,
        useCreate,
        useLogout,
        useClearData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
