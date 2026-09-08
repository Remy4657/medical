import { getProfile, updateProfile } from "@/services/profileService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useQueryProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
    refetchOnWindowFocus: false, // Nếu muốn tự kiểm tra thay đổi khi focus vào tab
    refetchOnReconnect: false, // Nếu muốn tự kiểm tra thay đổi khi kết nối lại
  });
export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileData: any) => updateProfile(profileData),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile"], updatedProfile);
      toast.success("Cập nhật thông tin cá nhân thành công");
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin cá nhân");
    },
  });
};
