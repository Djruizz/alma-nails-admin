export const useBusiness = () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const business = useState<Business | null>("business", () => null);
  const { setLoading } = useLoading();

  const fetchBusiness = async () => {
    if (!user.value) return;
    const { data, error } = await client
      .from("business_profiles")
      .select("*")
      .eq("owner_id", user.value.sub)
      .single();
    if (error)
      throw createError({
        message: "Error al obtener la información del negocio",
        status: 500,
        statusMessage: error.message,
      });
    business.value = data;
  };
  const updateBusiness = async (data: BusinessInfoFormSchema) => {
    if (!user.value) return;

    try {
      setLoading(true);
      const { data: businessData, error } = await client
        .from("business_profiles")
        .update(data)
        .eq("owner_id", user.value.sub)
        .single();
      if (error)
        throw createError({
          message: "Error al actualizar la información del negocio",
          status: 500,
          statusMessage: error.message,
        });
      business.value = businessData;
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
