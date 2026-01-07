import type { Profile } from "@/types/profile.types";
import type { ProfileFormSchema } from "@/utils/schemas/ProfileFormSchema";

export const useProfile = () => {
  const user = useSupabaseUser();
  const profile = useState<Profile | null>("profile", () => null);
  const { setLoading } = useLoading();
  const fetchProfile = async () => {
    if (profile.value) return;
    try {
      setLoading(true);
      const res: Profile | null = await $fetch("/api/profile", {
        method: "GET",
      });
      profile.value = res;
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async (data: ProfileFormSchema) => {
    try {
      setLoading(true);
      const res: Profile = await $fetch("/api/profile", {
        method: "PUT",
        body: data,
      });
      profile.value = res;
    } finally {
      setLoading(false);
    }
  };
  watch(
    () => user.value?.id,
    (id) => {
      if (id) fetchProfile();
    },
    { immediate: true }
  );
  const firstName = computed(() => profile.value?.full_name?.split(" ")[0]);
  return {
    profile,
    firstName,
    fetchProfile,
    updateProfile,
  };
};
