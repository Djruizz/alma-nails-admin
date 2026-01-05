import type { Profile } from "@/types/profile.types";

export const useProfile = () => {
  const profile = useState<Profile | null>("profile", () => null);
  const fetchProfile = async () => {
    try {
      const res: Profile | null = await $fetch("/api/profile", {
        method: "GET",
      });
      profile.value = res;
    } catch (e) {}
  };
  return { profile, fetchProfile };
};
