# Guía de Autenticación y Rutas

## Cambios Realizados

### 1. Middleware de Autenticación Global (`app/middleware/auth.global.ts`)

Este middleware verifica que el usuario esté autenticado antes de permitir el acceso a rutas protegidas.

**Funcionalidad:**

- Permite el acceso libre a rutas públicas (`/`, `/login`)
- Redirige a `/login` si el usuario no está autenticado
- Guarda la ruta destino en el query `?redirect=` para redirigir después del login

**Ejemplo:**
Si un usuario no autenticado intenta acceder a `/business/mi-negocio/settings`, será redirigido a `/login?redirect=/business/mi-negocio/settings`.

### 2. Middleware de Verificación de Propietario (`app/middleware/is-owner.ts`)

Este middleware verifica que el usuario tenga permisos para acceder a rutas específicas de un negocio.

**Funcionalidad:**

- Verifica que el usuario esté autenticado
- Busca el negocio por su slug
- Verifica que el usuario sea miembro del negocio
- Verifica que el usuario tenga el rol "owner"
- Incluye mejor manejo de errores con console.error/warn

### 3. Composable de Negocio del Usuario (`app/composables/business/useUserBusiness.ts`)

Este composable proporciona funciones útiles para trabajar con el negocio del usuario.

**Funciones disponibles:**

```typescript
const {
  getUserBusiness,
  hasBusiness,
  getBusinessSlug,
  navigateToBusinessDashboard,
} = useUserBusiness();

// Obtener información completa del negocio
const business = await getUserBusiness();

// Verificar si el usuario tiene un negocio
const hasOne = await hasBusiness();

// Obtener solo el slug
const slug = await getBusinessSlug();

// Navegar al dashboard del negocio
await navigateToBusinessDashboard();
```

### 4. Mejoras en el Login (`app/composables/auth/useLoginForm.ts`)

**Funcionalidad mejorada:**

- Al iniciar sesión, verifica si hay una ruta de redirección en el query
- Si existe `?redirect=`, navega a esa ruta
- Si no existe, busca el negocio del usuario y lo redirige a su dashboard
- Si no tiene negocio, lo envía a la página principal

## Flujo de Autenticación

### Escenario 1: Usuario intenta acceder a una ruta protegida sin autenticarse

1. Usuario navega a `/business/mi-negocio/settings`
2. El middleware global detecta que no hay usuario
3. Redirige a `/login?redirect=/business/mi-negocio/settings`
4. Usuario inicia sesión
5. El sistema redirige automáticamente a `/business/mi-negocio/settings`
6. El middleware `is-owner` verifica permisos
7. Si tiene permisos, accede a la página
8. Si no, es redirigido apropiadamente

### Escenario 2: Usuario inicia sesión directamente

1. Usuario navega a `/login`
2. Ingresa credenciales
3. El sistema busca su negocio
4. Redirige a `/business/[slug-del-negocio]`
5. Si no tiene negocio, redirige a `/`

## Uso en el Código

### Proteger una ruta

```vue
<script setup lang="ts">
definePageMeta({
  middleware: "is-owner", // Solo propietarios pueden acceder
  layout: "admin",
});
</script>
```

### Navegar al negocio del usuario

```vue
<script setup lang="ts">
const { navigateToBusinessDashboard } = useUserBusiness();

const goToDashboard = async () => {
  await navigateToBusinessDashboard();
};
</script>
```

### Verificar si el usuario tiene un negocio

```vue
<script setup lang="ts">
const { hasBusiness, getBusinessSlug } = useUserBusiness();

const checkBusiness = async () => {
  const hasOne = await hasBusiness();
  if (hasOne) {
    const slug = await getBusinessSlug();
    console.log(`El negocio del usuario es: ${slug}`);
  }
};
</script>
```

## Debugging

El middleware incluye logs para ayudar con el debugging:

- `console.error("Error al obtener el negocio:", error)` - Error al buscar el negocio
- `console.error("Error al obtener el miembro:", error)` - Error al verificar membresía
- `console.error("El usuario no es miembro de este negocio")` - Usuario no es miembro
- `console.warn("El usuario no tiene permisos suficientes")` - Usuario no tiene role "owner"

Revisa la consola del navegador para ver estos mensajes en caso de problemas.

## Próximos Pasos

Si necesitas:

- Agregar más roles (admin, editor, etc.), modifica el array `allowedRoles` en `is-owner.ts`
- Crear un middleware diferente para otros roles
- Agregar más rutas públicas, actualiza el array `publicRoutes` en `auth.global.ts`
