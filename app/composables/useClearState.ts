export const useClearState = () => {
  const clearAllState = () => {
    const { clearProfile } = useProfile();
    clearProfile();

    const { clearServices } = useServices();
    clearServices();

    const { clearClients } = useClients();
    clearClients();

    const { clearBusiness } = useBusiness();
    clearBusiness();
  };

  return {
    clearAllState,
  };
};
