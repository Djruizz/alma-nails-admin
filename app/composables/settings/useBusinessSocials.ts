import z from "zod";

export const useBusinessSocials = () => {
  const { business, updateSocialLinks } = useBusiness();
  const { setLoading } = useLoading();
  const toast = useToast();

  const socialLinks = useState<SocialLink[]>("socialLinks", () => []);
  const originalSocialLinks = shallowRef<SocialLink[]>([]);
  watch(
    business,
    () => {
      if (business.value?.social_links) {
        const rawLinks = business.value.social_links as SocialLink[];
        socialLinks.value = structuredClone(toRaw(rawLinks));
        originalSocialLinks.value = structuredClone(toRaw(rawLinks));
      }
    },
    { immediate: true }
  );

  const addSocialLink = (socialNetwork: SocialNetwork) => {
    socialLinks.value.push({
      ...socialNetwork,
      id: crypto.randomUUID(),
      position: socialLinks.value.length,
    });
  };
  const deleteSocialLink = async (id: string) => {
    const index = socialLinks.value.findIndex((link) => link.id === id);
    if (index !== -1) {
      socialLinks.value.splice(index, 1);
    }
  };
  const saveSocialLinks = async () => {
    // const validatedLinks = socialLinks.value.map((link) => {
    //   try {
    //     return businessSocialSchema.parse(link);
    //   } catch (error: any) {
    //     toast.add({
    //       title: "Redes Sociales",
    //       description: "Algún campo inválido/faltante",
    //       color: "error",
    //       icon: "i-lucide-alert-octagon",
    //     });
    //     throw createError({
    //       statusMessage: "Algun campo inválido/faltante",
    //       statusCode: 400,
    //       message: error.message,
    //     });
    //   }
    // });
    try {
      const validatedLinks = z
        .array(businessSocialSchema)
        .parse(socialLinks.value);
      if (!validatedLinks) {
        return;
      }
      setLoading(true);
      await updateSocialLinks(validatedLinks);
      toast.add({
        title: "Redes Sociales",
        description: "Redes Sociales actualizadas correctamente",
        color: "success",
        icon: "i-lucide-check",
      });
    } catch (error) {
      toast.add({
        title: "Redes Sociales",
        description: "Algún campo inválido/faltante",
        color: "error",
        icon: "i-lucide-alert-octagon",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasChanges = computed(
    () =>
      JSON.stringify(socialLinks.value) !==
      JSON.stringify(originalSocialLinks.value)
  );
  const isCanceling = ref(false);
  const reset = () => {
    isCanceling.value = true;
    setTimeout(() => {
      socialLinks.value = structuredClone(toRaw(originalSocialLinks.value));
      isCanceling.value = false;
    }, 300);
  };
  return {
    socialLinks,
    hasChanges,
    isCanceling,
    addSocialLink,
    saveSocialLinks,
    deleteSocialLink,
    reset,
  };
};
