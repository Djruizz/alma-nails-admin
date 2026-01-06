export const useLoading = () => {
  const isLoading = useState("isLoading", () => false);
  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };
  return { isLoading, setLoading };
};