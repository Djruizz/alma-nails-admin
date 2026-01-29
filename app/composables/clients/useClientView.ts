export const useClientView = () => {
  const { fetchClient, deleteClient, updateClient } = useClients();
  const route = useRoute();
  const { baseAdminRoute } = useNavigation();
  const clientId = route.params.id?.toString();
  const toast = useToast();
  if (!clientId) {
    toast.add({
      title: "Error",
      description: "ID de cliente no proporcionado",
      color: "error",
    });
    throw createError({
      statusCode: 404,
      statusMessage: "ID de cliente no proporcionado",
    });
  }

  const client = ref<ClientWithProfile | null>(null);

  const getClient = async () => {
    try {
      const data = await fetchClient(clientId);
      if (!data) {
        toast.add({
          title: "Error",
          description: "Cliente no encontrado",
          color: "error",
          icon: "i-lucide-x",
        });
      }
      client.value = data;
    } catch (e: any) {
      toast.add({
        title: "Error",
        description: "Error al obtener el cliente",
        color: "error",
        icon: "i-lucide-x",
      });
    }
  };

  const initialState = shallowRef<ClientUpdateSchema>({
    notes: "",
    is_active: false,
  });
  const fields: (keyof ClientUpdateSchema)[] = ["notes", "is_active"];
  const clientDataState = reactive<ClientUpdateSchema>(initialState.value);
  watch(client, (c) => {
    if (!c) return;
    const clientData: ClientUpdateSchema = {
      notes: c.notes || "",
      is_active: c.is_active || false,
    };
    Object.assign(clientDataState, clientData);
    initialState.value = structuredClone(toRaw(clientData));
  });

  const clientBirthday = computed(() => {
    if (!client.value?.born_date) return "Fecha no disponible";
    return formatDate(client.value.born_date, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  });

  const deleteClientById = async () => {
    try {
      await deleteClient(clientId);
      await navigateTo(`${baseAdminRoute.value}/clients`);
    } catch (e: any) {
      toast.add({
        title: "Error",
        description: "Error al eliminar el cliente",
        color: "error",
        icon: "i-lucide-x",
      });
    }
  };
  const hasChanges = computed(() => {
    if (!initialState.value) return false;
    return fields.some(
      (field) => clientDataState[field] !== initialState.value?.[field]
    );
  });
  const updateClientData = async () => {
    if (!hasChanges.value) return;
    try {
      await updateClient(clientId, clientDataState);
      initialState.value = structuredClone(toRaw(clientDataState));

      toast.add({
        title: "Cliente actualizado",
        description: "La información del cliente fue actualizada",
        color: "success",
        icon: "i-lucide-check",
      });
    } catch {
      toast.add({
        title: "Error",
        description: "Error al actualizar la información del cliente",
        color: "error",
        icon: "i-lucide-x",
      });
    }
  };
  const canceling = ref<boolean>(false);
  const reset = () => {
    canceling.value = true;
    setTimeout(() => {
      if (!initialState.value) return;
      Object.assign(
        clientDataState,
        structuredClone(toRaw(initialState.value))
      );
      canceling.value = false;
    }, 300);
  };

  getClient();

  return {
    client,
    hasChanges,
    clientDataState,
    clientBirthday,
    canceling,
    reset,
    deleteClientById,
    updateClientData,
    refresh: getClient,
  };
};
