export const useServices = () => {
  const services = useState<Service[]>("services", () => []);
  const { setLoading } = useLoading();

  const fetchServices = async (forceRefresh = false) => {
    // Skip fetch if services already loaded and not forcing refresh
    if (services.value.length > 0 && !forceRefresh) return;

    try {
      setLoading(true);
      const res: Service[] = await $fetch("/api/services", {
        method: "GET",
      });
      services.value = res;
    } finally {
      setLoading(false);
    }
  };

  const createService = async (data: ServiceSchema) => {
    try {
      setLoading(true);
      const res: Service = await $fetch("/api/services", {
        method: "POST",
        body: data,
      });
      // Add the new service to the beginning of the array
      services.value = [res, ...services.value];
      return res;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, data: ServiceUpdateSchema) => {
    try {
      setLoading(true);
      const res: Service = await $fetch(`/api/services/${id}`, {
        method: "PUT",
        body: data,
      });
      services.value = services.value.map((service) =>
        service.id === id ? res : service
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    try {
      setLoading(true);
      await $fetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      services.value = services.value.filter((service) => service.id !== id);
    } finally {
      setLoading(false);
    }
  };

  const clearServices = () => {
    services.value = [];
  };

  return {
    services,
    fetchServices,
    createService,
    updateService,
    deleteService,
    clearServices,
  };
};
