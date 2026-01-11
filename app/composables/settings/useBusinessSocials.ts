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
    try {
      setLoading(true);
      await updateSocialLinks(socialLinks.value);
      toast.add({
        title: "Redes Sociales",
        description: "Redes Sociales actualizadas correctamente",
        color: "success",
        icon: "i-lucide-check",
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
