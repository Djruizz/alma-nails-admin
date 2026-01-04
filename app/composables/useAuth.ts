export const useAuth = () => {
  const client = useSupabaseClient();
  const login = async (data: LoginSchema) => {
    const { data: user, error } = await client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw error;
    }
    return user;
  };
  const logout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      throw error;
    }
    navigateTo("/login");
  };

  return {
    login,
    logout,
  };
}