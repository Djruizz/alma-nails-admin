export const useBusinessInfoForm = (formRef: any) => {
  const { business, updateBusiness } = useBusiness();
  const toast = useToast();
  const initialState = shallowRef<BusinessInfoFormSchema>({
    name: "",
    phone: "",
    address: "",
    description: "",
    email: "",
  });
  const businessState = reactive<BusinessInfoFormSchema>(initialState.value);
  const fields: (keyof BusinessInfoFormSchema)[] = [
    "name",
    "phone",
    "address",
    "description",
    "email",
  ];

  watch(
    business,
    (b) => {
      if (!b) return;
      const businessData: BusinessInfoFormSchema = {
        name: b.name || "",
        phone: b.phone || "",
        address: b.address || "",
        description: b.description || "",
        email: b.email || "",
      };
      Object.assign(businessState, businessData);
      initialState.value = structuredClone(toRaw(businessData));
    },
    { immediate: true }
  );

  const hasChanges = computed(() => {
    if (!initialState.value) return false;
    return fields.some(
      (field) => businessState[field] !== initialState.value?.[field]
    );
  });

  const canceling = ref(false);
  const reset = () => {
    canceling.value = true;
    setTimeout(() => {
      if (!initialState.value) return;
      Object.assign(businessState, structuredClone(toRaw(initialState.value)));
      formRef?.value.clear();
      canceling.value = false;
    }, 300);
  };

  const saveBusiness = async () => {
    if (!hasChanges.value) return;
    const result = businessInfoFormSchema.safeParse(businessState);

    if (!result.success) return;

    try {
      await updateBusiness(result.data);
      initialState.value = structuredClone(toRaw(businessState));
      toast.add({
        title: "Negocio actualizado",
        description: "Se han guardado los cambios en el negocio",
        icon: "i-lucide-circle-check",
        color: "primary",
      });
    } catch (e: any) {
      toast.add({
        title: e.statusMessage || "Error",
        description:
          e.data?.message || e.message || "Error al actualizar el negocio",
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  };

  return {
    businessState,
    hasChanges,
    canceling,
    reset,
    saveBusiness,
  };
};
