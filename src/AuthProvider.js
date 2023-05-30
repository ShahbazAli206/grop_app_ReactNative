import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        login: (email, password) => {
          axios
            .post("/api/sanctum/token", {
              email,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              console.log("gggg sir ggg ********* ");

              if (response) {
                // console.log(
                //   "\n\nall data from response ********* \n",
                //   response.data
                // );

                const userResponse = {
                  email: response.data.user.email,
                  email_verified: response.data.user.email_verified_at,
                  token: response.data.token,
                  id: response.data.user.id,
                  role: response.data.user.role,
                  name: response.data.user.name,
                  profile: response.data.user.profile_photo_path,
                  phone: response.data.user.ph_no,
                };
                setUser(userResponse);
                console.log("This is theee User --> ", userResponse);
                SecureStore.setItemAsync("user", JSON.stringify(userResponse));
              }
            })
            .catch((error) => {
              if (error && error.response && error.response.data) {
                const key = Object.keys(error.response.data.errors)[0];
                setError(error.response.data.errors[key][0]);
                console.log(error, response);
              }
            });
        },
        logout: () => {
          console.log("hiii logout functin is called");
          setUser(null);
          SecureStore.deleteItemAsync("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
