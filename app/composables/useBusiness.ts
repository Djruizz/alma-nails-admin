export const useBusiness = () => {
  const business = useState<BusinessState>("business_context", () => ({
    data: null,
    role: null,
    hasBusiness: false,
  }));
  const { setLoading } = useLoading();

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const res = await $fetch<BusinessApiResponse>("/api/business", {
        method: "GET",
      });
      business.value = {
        data: res.business,
        role: res.role,
        hasBusiness: res.hasBusiness,
      };
    } finally {
      setLoading(false);
    }
  };
  const updateBusiness = async (data: BusinessInfoFormSchema) => {
    try {
      setLoading(true);
      const res = await $fetch("/api/business", {
        method: "PUT",
        body: { data: data },
      });
      business.value.data = res;
    } finally {
      setLoading(false);
    }
  };
  const updateSocialLinks = async (data: BusinessSocialSchema[]) => {
    try {
      setLoading(true);
      const res: Business = await $fetch("/api/business/social-links", {
        method: "PUT",
        body: data,
      });
      business.value.data = res;
    } finally {
      setLoading(false);
    }
  };

  const clearBusiness = () => {
    business.value = {
      data: null,
      role: null,
      hasBusiness: false,
    };
  };

  return {
    business,
    fetchBusiness,
    updateBusiness,
    updateSocialLinks,
    clearBusiness,
  };
};
