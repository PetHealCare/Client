import React, { createContext, useState, useContext } from "react";
import { useEffect } from "react";

// Create a Context for the auth state
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize user state from local storage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update local storage whenever user state changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      console.log("check" , localStorage.setItem("user", JSON.stringify(user)));
    } else {
      sessionStorage.removeItem("user");
      console.log("check remove", localStorage.removeItem("user"));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function ManComponent() {
  const { user, setUser } = useAuth();

  const handleLogin = () => {
    setUser({ fullName: "exampleUser" });
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.fullName}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}