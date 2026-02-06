export const useCreateClient = () => {
  const toast = useToast();
  const initialState: NewClientSchema = {
    internal_name: "",
    internal_phone: "",
    notes: "",
    is_active: true,
  };
  const newClientState = reactive({ ...initialState });
  const fields: (keyof NewClientSchema)[] = [
    "internal_name",
    "internal_phone",
    "notes",
    "is_active",
  ];
  const hasChanges = computed(() => {
    return fields.some(
      (field) => newClientState[field] !== initialState[field],
    );
  });
  const canceling = ref(false);
  const reset = () => {
    canceling.value = true;
    setTimeout(() => {
      Object.assign(newClientState, structuredClone(toRaw(initialState)));
      canceling.value = false;
    }, 300);
  };

  const { createClient, fetchClients } = useClients();
  const saveNewClient = async () => {
    if (!hasChanges.value) return;
    try {
      const res = await createClient(newClientState);
      toast.add({
        title: "Cliente creado",
        description: `El cliente: ${res.display_full_name} se creó correctamente`,
        icon: "i-lucide-circle-check",
        color: "success",
      });
      navigateTo(`/business/${useRoute().params.slug}/admin/clients`);
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Error al crear el cliente",
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  };

  return {
    newClientState,
    hasChanges,
    canceling,
    reset,
    saveNewClient,
  };
};
