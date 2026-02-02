export const useClients = () => {
  const clients = useState<ClientWithProfile[]>("clients", () => []);
  const { setLoading } = useLoading();

  const getFilters = () => {
    const route = useRoute();
    const sort = route.query.sort as string | undefined;
    const direction = route.query.direction as string | undefined;
    const status = route.query.status as string | undefined;
    if (status === "all" || !status) {
      return { sort, direction };
    }
    return { sort, direction, isActive: status === "active" };
  };

  const fetchClients = async (forceRefresh = false) => {
    // Skip fetch if clients already loaded and not forcing refresh and no search term
    const { sort, direction, isActive } = getFilters();
    if (clients.value.length > 0 && !forceRefresh) return;

    try {
      setLoading(true);
      const { data } = await useFetch<ClientWithProfile[]>("/api/clients", {
        query: {
          sort,
          direction,
          isActive,
        },
      });
      clients.value = data.value ?? [];
    } finally {
      setLoading(false);
    }
  };
  const sortClients = async () => {
    const { sort, direction, isActive } = getFilters();
    try {
      setLoading(true);
      const res = await $fetch<ClientWithProfile[]>("/api/clients", {
        method: "GET",
        query: {
          sort,
          direction,
          isActive,
        },
      });
      clients.value = res;
    } finally {
      setLoading(false);
    }
  };

  const fetchClient = async (id: string): Promise<ClientWithProfile | null> => {
    const existing = clients.value.find((c) => c.id === id);
    if (existing) return existing;

    try {
      setLoading(true);
      const { data } = await useAsyncData<ClientWithProfile>(
        `client-${id}`,
        () => $fetch<ClientWithProfile>(`/api/clients/${id}`),
      );
      return data.value ?? null;
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (data: ClientSchema) => {
    try {
      setLoading(true);
      const res: ClientWithProfile = await $fetch("/api/clients", {
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
      const res: ClientWithProfile = await $fetch(`/api/clients/${id}`, {
        method: "PUT",
        body: data,
      });
      clients.value = clients.value.map((client) =>
        client.id === id ? { ...client, ...res } : client,
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      setLoading(true);
      const res = await $fetch(`/api/clients/${id}`, {
        method: "DELETE",
      });
      await fetchClients(true);
      if (!res.ok) {
        throw createError({
          statusCode: 400,
          statusMessage: res.message,
          message: res.message,
        });
      }
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
    sortClients,
    fetchClient,
    createClient,
    updateClient,
    deleteClient,
    clearClients,
  };
};
