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
        message: translateSupabaseError(error.message),
        statusCode: error.status,
        statusMessage: "Error de inicio de sesión",
      });
    }
    return user;
  };
  const signUp = async (data: RegisterSchema) => {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: data,
    });
  };
  const logout = async () => {
    setLoading(true);
    const { clearAllState } = useClearState();
    clearAllState();

    const { error } = await client.auth.signOut();
    if (error) {
      throw createError({
        message: error.message,
        statusCode: error.status,
        statusMessage: "Error de cierre de sesión",
      });
    }
    setLoading(false);
    navigateTo("/login");
  };
  const updatePassword = async (data: ChangePasswordSchema) => {
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
