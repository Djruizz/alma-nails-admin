export const useBusiness = () => {
  const business = useState<Business | null>("business", () => null);
  const { setLoading } = useLoading();

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const res: Business = await $fetch("/api/business", {
        method: "GET",
      });
      business.value = res;
    } finally {
      setLoading(false);
    }
  };
  const updateBusiness = async (data: BusinessInfoFormSchema) => {
    try {
      setLoading(true);
      const res: Business = await $fetch("/api/business", {
        method: "PUT",
        body: data,
      });
      business.value = res;
    } finally {
      setLoading(false);
    }
  };

  return {
    business,
    fetchBusiness,
    updateBusiness,
  };
};
