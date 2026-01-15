export const useClearState = () => {
  const clearAllState = () => {
    const { clearProfile } = useProfile();
    clearProfile();

    const { clearServices } = useServices();
    clearServices();

    const { clearBusiness } = useBusiness();
    clearBusiness();
  };

  return {
    clearAllState,
  };
};
