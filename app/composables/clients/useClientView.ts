export const useClientView = () => {
  const { fetchClient, deleteClient } = useClients();
  const route = useRoute();
  const { baseRoute } = useNavigation();
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

  onMounted(() => {
    getClient();
  });

  const clientNotes = computed(() => client.value?.notes ?? "Sin notas");

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
      await navigateTo(`${baseRoute.value}/clients`);
    } catch (e: any) {
      toast.add({
        title: "Error",
        description: "Error al eliminar el cliente",
        color: "error",
        icon: "i-lucide-x",
      });
    }
  };

  return {
    client,
    clientNotes,
    clientBirthday,
    deleteClientById,
    refresh: getClient,
  };
};
