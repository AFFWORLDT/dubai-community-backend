import api from "@/utils/ApiUrl";

export const googleAuth = async (token: string) => {
  try {
    const res = await api.post("/api/v1/google/auth", { token });
    return res;
  } catch (error: any) {
    throw error;
  }
};

export const getGoogleAuthUrl = async () => {
  try {
    const res = await api.get("/api/v1/google/auth-url");
    return res;
  } catch (error: any) {
    throw error;
  }
};
