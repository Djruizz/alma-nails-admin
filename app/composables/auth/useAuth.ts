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
  const signUp = async (data: RegisterSchema) => {
    console.log(data);
    const { data: user, error } = await client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
          phone: data.phone,
          role: 'admin',
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
  };
};
