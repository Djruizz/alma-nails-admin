export const translateSupabaseError = (message: string): string => {
  const errors: Record<string, string> = {
    "Invalid login credentials": "Las credenciales son incorrectas",
    "User already registered": "El usuario ya está registrado",
    "Password should be at least 6 characters":
      "La contraseña debe tener al menos 6 caracteres",
    "Email not confirmed": "Correo electrónico no confirmado",
    "User not found": "Usuario no encontrado",
    "Invalid Refresh Token: Refresh Token Not Found":
      "La sesión ha expirado, por favor inicie sesión nuevamente",
    "New password should be different from the old password.":
      "La nueva contraseña debe ser diferente a la anterior",
  };

  return errors[message] || message;
};
