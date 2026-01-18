export const useClients = () => {
  const clients = useState<Client[]>("clients", () => []);
  const { setLoading } = useLoading();

  const fetchClients = async (forceRefresh = false, searchTerm?: string) => {
    // Skip fetch if clients already loaded and not forcing refresh and no search term
    if (clients.value.length > 0 && !forceRefresh && !searchTerm) return;

    try {
      setLoading(true);
      const url = searchTerm
        ? `/api/clients?search=${encodeURIComponent(searchTerm)}`
        : "/api/clients";
      const res: Client[] = await $fetch(url, {
        method: "GET",
      });
      clients.value = res;
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (data: ClientSchema) => {
    try {
      setLoading(true);
      const res: Client = await $fetch("/api/clients", {
        method: "POST",
        body: data,
      });
      // Add the new client to the beginning of the array
      clients.value = [res, ...clients.value];
      return res;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id: string, data: ClientUpdateSchema) => {
    try {
      setLoading(true);
      const res: Client = await $fetch(`/api/clients/${id}`, {
        method: "PUT",
        body: data,
      });
      clients.value = clients.value.map((client) =>
        client.id === id ? res : client
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      setLoading(true);
      await $fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });
      clients.value = clients.value.filter((client) => client.id !== id);
    } finally {
      setLoading(false);
    }
  };

  const clearClients = () => {
    clients.value = [];
  };

  return {
    clients,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
    clearClients,
  };
};
