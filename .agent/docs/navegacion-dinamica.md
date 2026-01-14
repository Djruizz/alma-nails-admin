# Navegación Dinámica con Slug

## Problema Resuelto

Los botones de navegación en el bottom navbar del layout admin estaban usando rutas estáticas (`/settings`, `/clients`, etc.) en lugar de rutas dinámicas con el slug del negocio (`/business/[slug]/settings`).

## Solución Implementada

### 1. Composable de Navegación Actualizado (`app/composables/useNavigation.ts`)

El composable ahora genera rutas dinámicas basadas en el slug actual de la ruta:

```typescript
export const useNavigation = () => {
  const route = useRoute();

  // Obtener el slug actual de la ruta
  const currentSlug = computed(() => {
    return (route.params.slug as string) || "";
  });

  // Generar la base de la ruta
  const baseRoute = computed(() => {
    return currentSlug.value ? `/business/${currentSlug.value}` : "";
  });

  // Los items ahora usan computed properties
  const items = computed<NavigationMenuItem>(() => ({
    dashboard: {
      label: "Inicio",
      to: baseRoute.value || "/",
      icon: "i-lucide-house",
    },
    // ... más items
  }));
};
```

**Características:**

- Reactivo: Se actualiza automáticamente cuando cambia el slug en la ruta
- Usa `computed` para recalcular las rutas dinámicamente
- Genera rutas en formato `/business/[slug]/[página]`

### 2. Componente BottomNavigation Mejorado

Se actualizó la función `isActive` para manejar correctamente las rutas dinámicas:

```typescript
const isActive = (path: string) => {
  const currentPath = route.path;

  // Si el path del item es exactamente igual a la ruta actual
  if (currentPath === path) {
    return true;
  }

  // Si el item apunta a la raíz del negocio y estamos en esa ruta exacta
  if (path.endsWith(`/business/${route.params.slug}`) && currentPath === path) {
    return true;
  }

  // Para otras rutas, verificar si la ruta actual comienza con el path del item
  if (
    !path.endsWith(`/business/${route.params.slug}`) &&
    currentPath.startsWith(path)
  ) {
    return true;
  }

  return false;
};
```

**También se corrigió:**

- Referencias a `mobileMenu.length` → `mobileMenu.value.length` (porque ahora es un computed)

### 3. Nuevas Páginas Creadas

Se crearon las páginas necesarias en el directorio `app/pages/business/[slug]/`:

- ✅ `clients.vue` - Página de clientes
- ✅ `services.vue` - Página de servicios
- ✅ `calendar.vue` - Página de agenda/calendario
- ✅ `settings.vue` - Ya existente
- ✅ `index.vue` - Dashboard principal (ya existente)

Todas las páginas:

- Usan el middleware `is-owner` para protección
- Usan el layout `admin`
- Tienen una estructura consistente con placeholder content

## Estructura de Rutas

```
/business/[slug]/
├── index          → Dashboard principal
├── clients        → Gestión de clientes
├── services       → Gestión de servicios
├── calendar       → Agenda y citas
└── settings       → Configuración del negocio
```

## Ejemplo de Navegación

Si un usuario está en el negocio con slug `"mi-salon"`, la navegación generará:

- **Inicio**: `/business/mi-salon`
- **Clientes**: `/business/mi-salon/clients`
- **Servicios**: `/business/mi-salon/services`
- **Agenda**: `/business/mi-salon/calendar`
- **Configuración**: `/business/mi-salon/settings`

## Flujo de Navegación

1. Usuario inicia sesión
2. Es redirigido a `/business/[su-slug]`
3. El composable `useNavigation` detecta el slug de la ruta
4. Los botones del bottom nav generan URLs dinámicas con ese slug
5. Al hacer clic, navega a `/business/[su-slug]/[página]`
6. El middleware `is-owner` verifica permisos
7. La página se renderiza correctamente

## Testing

Para probar que todo funciona:

1. Inicia sesión en la aplicación
2. Deberías ser redirigido a `/business/[tu-slug]`
3. Observa el bottom navigation bar
4. Haz clic en cada botón (Clientes, Servicios, Agenda, Configuración)
5. Verifica que la URL incluye el slug correcto
6. Verifica que el botón activo se resalta correctamente

## Ventajas de Esta Implementación

✅ **Reactivo**: Las rutas se actualizan automáticamente si cambia el slug  
✅ **Type-safe**: Usa TypeScript con tipos de Nuxt UI  
✅ **Mantenible**: Centralizado en un solo composable  
✅ **Escalable**: Fácil agregar nuevas rutas  
✅ **Consistente**: Todas las rutas siguen el mismo patrón

## Próximos Pasos

Si necesitas:

- Agregar más páginas: Crea un archivo en `app/pages/business/[slug]/nueva-pagina.vue`
- Agregar a la navegación: Añade el item en el composable `useNavigation.ts`
- Cambiar el orden: Modifica los arrays `desktopMenu` o `mobileMenu`
