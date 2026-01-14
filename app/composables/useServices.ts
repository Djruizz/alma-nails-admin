export const useServices = () => {
  const services = useState<Service[]>("services", () => []);
  const { setLoading } = useLoading();

  const fetchServices = async () => {
    if (services.value.length > 0) return;
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

  const updateService = async (id: number, data: ServiceUpdateSchema) => {
    try {
      setLoading(true);
      const res: Service = await $fetch("/api/services", {
        method: "PUT",
        body: {
          id,
          data,
        },
      });
      // Update the service in the array
      const index = services.value.findIndex((s) => s.id === id);
      if (index !== -1) {
        services.value[index] = res;
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: number) => {
    try {
      setLoading(true);
      await $fetch("/api/services", {
        method: "DELETE",
        query: { id },
      });
      // Remove the service from the array
      services.value = services.value.filter((s) => s.id !== id);
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    fetchServices,
    createService,
    updateService,
    deleteService,
  };
};
