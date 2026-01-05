import type { Profile } from "@/types/profile.types";

export const useProfile = () => {
  const user = useSupabaseUser();
  const profile = useState<Profile | null>("profile", () => null);
  
  const fetchProfile = async () => {
    if (profile.value) return;
    try {
      const res: Profile | null = await $fetch("/api/profile", {
        method: "GET",
      });
      profile.value = res;
    } catch (e) {}
  };
  watch(
    () => user.value?.id,
    (id) => {
      if (id) fetchProfile();
      else profile.value = null;
    },
    { immediate: true }
  );
  const firstName = computed(() => profile.value?.full_name?.split(" ")[0]);
  return { profile, fetchProfile, firstName };
};
