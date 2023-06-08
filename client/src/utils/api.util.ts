import { User, UserSet } from "../app/contracts/user.contract";
import { AuthStrategy } from "../enums/authStrategy.enum";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

const handleLogout = () => {
  localStorage.removeItem("@user");
  localStorage.removeItem("@token");
};

export const api = {
  async createUser(username: string, authStrategy: AuthStrategy) {
    try {
      const response = await axios.post("/users", {
        username,
        authStrategy,
      });

      const token = response.data as string;

      return token;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },

  async updateUser(
    token: string,
    username: string,
    authStrategy: AuthStrategy
  ) {
    try {
      const response = await axios.put(
        `/users/${username}`,
        {
          authStrategy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newToken = response.data as string;

      return newToken;
    } catch (error: any) {
      if (error?.message === "Request failed with status code 401") {
        handleLogout();
        console.warn("logout");
      }
      console.error(error);
      throw error;
    }
  },

  async getUser(token: string, username: string) {
    try {
      console.warn("→→→→→ ", token, username);
      const response = await axios.get(`/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data as User;

      return user;
    } catch (error: any) {
      if (error?.message === "Request failed with status code 401") {
        handleLogout();
        console.warn("logout");
      }
      console.warn(error);
      throw error;
    }
  },

  async authenticateUser(username: string, secret: string) {
    try {
      const response = await axios.post(`/auth/${username}`, {
        secret,
      });

      const token = response.data as string;

      return token;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },

  async getAuthenticationUserSet(username: string) {
    try {
      const response = await axios.get(`/auth/${username}`);

      const userSet = response.data as UserSet;

      return userSet;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  },

  logout: handleLogout,
};
