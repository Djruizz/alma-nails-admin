export const useAuth = () => {
  const client = useSupabaseClient();
  const { setLoading } = useLoading();
  const login = async (data: LoginSchema) => {
    const { data: user, error } = await client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      throw createError({
        message: error.message,
        statusCode: error.status,
        statusMessage: error.message,
      });
    }
    return user;
  };
  const signUp = async (data: RegisterSchema) => {
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
      throw createError({
        message: error.message,
        statusCode: error.status,
        statusMessage: error.message,
      });
    }
    return user;
  };
  const logout = async () => {
    const { error } = await client.auth.signOut();
    if (error) {
      throw createError({
        message: error.message,
        statusCode: error.status,
        statusMessage: error.message,
      });
    }
    navigateTo("/login");
  };
  const updatePassword = async (data: SecurityFormSchema) => {
    setLoading(true);
    try {
      await $fetch("/api/auth/change-password", {
        method: "POST",
        body: data,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    signUp,
    updatePassword,
  };
};
