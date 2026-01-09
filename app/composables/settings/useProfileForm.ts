export const useProfileForm = (formRef: any) => {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const initialProfile = shallowRef<ProfileFormSchema>({
    full_name: "",
    phone: "",
  });
  const profileState = reactive<ProfileFormSchema>(initialProfile.value);
  const fields: (keyof ProfileFormSchema)[] = ["full_name", "phone"];

  watch(
    profile,
    (p) => {
      if (!p) return;
      const profileData: ProfileFormSchema = {
        full_name: p.full_name || "",
        phone: p.phone || "",
      };
      Object.assign(profileState, profileData);
      initialProfile.value = structuredClone(toRaw(profileData));
    },
    { immediate: true }
  );

  const hasChanges = computed(() => {
    if (!initialProfile.value) return false;
    return fields.some(
      (field) => profileState[field] !== initialProfile.value?.[field]
    );
  });
  const canceling = ref(false);
  const reset = () => {
    canceling.value = true;
    setTimeout(() => {
      if (!initialProfile.value) return;
      Object.assign(profileState, structuredClone(toRaw(initialProfile.value)));
      formRef?.value.clear();
      canceling.value = false;
    }, 300);
  };

  const saveProfile = async () => {
    if (!hasChanges.value) return;
    const result = profileFormSchema.safeParse(profileState);

    if (!result.success) return;

    try {
      await updateProfile(result.data);
      initialProfile.value = structuredClone(toRaw(profileState));
      toast.add({
        title: "Perfil actualizado",
        description: "Se han guardado los cambios en el perfil",
        icon: "i-lucide-circle-check",
        color: "primary",
      });
    } catch (e: any) {
      toast.add({
        title: e.statusMessage || "Error",
        description:
          e.data?.message || e.message || "Error al actualizar el perfil",
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  };

  return {
    profileState,
    hasChanges,
    canceling,
    reset,
    saveProfile,
  };
};
