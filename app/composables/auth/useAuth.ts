export const useAuth = () => {
  const client = useSupabaseClient();
  const { setLoading } = useLoading();
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
  const signUp = async (data: RegisterSchema) => {
    console.log(data);
    const { data: user, error } = await client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
          phone: data.phone,
          role: "admin",
        },
      },
    });
    if (error) {
      console.error(error.message);
      console.error(error);
      throw error;
    }
    return user;
  };
  const updateUser = async (data: { email?: string; phone?: string }) => {
    const { data: user, error } = await client.auth.updateUser({
      email: data.email,
      phone: data.phone,
    });
    if (error) {
      throw error;
    }
    return user;
  };
  const updatePassword = async (password: string) => {
    setLoading(true);
    const { data: user, error } = await client.auth.updateUser({
      password,
    });
    if (error) {
      throw error;
    }
    setLoading(false);
    console.log(user);
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
    signUp,
    updateUser,
    updatePassword,
  };
};
