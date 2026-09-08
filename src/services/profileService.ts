import api from "@/lib/api";

export const getProfile = async () => {
  try {
    const response = await api.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
export const updateProfile = async (profileData: any) => {
  try {
    const response = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      profileData,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
