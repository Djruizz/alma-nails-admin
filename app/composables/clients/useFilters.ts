import type { DropdownMenuItem } from "@nuxt/ui";

export const useFilters = () => {
  const router = useRouter();
  const route = useRoute();

  const defaults = {
    sort: "created_at",
    direction: false, // false = desc
    status: "all",
    search: "",
  };

  // Global state for persistence
  const globalFilters = useState("clientFilters", () => ({ ...defaults }));

  // Initialize/Sync logic
  const syncFilters = () => {
    const hasQueryParams = Object.keys(route.query).length > 0;

    if (hasQueryParams) {
      // Priority: URL -> Global State
      globalFilters.value = {
        sort: (route.query.sort as string) || defaults.sort,
        direction: route.query.direction === "asc",
        status: (route.query.status as string) || defaults.status,
        search: (route.query.search as string) || defaults.search,
      };
    } else {
      // Priority: Global State -> URL (Restore)
      router.replace({
        query: {
          sort: globalFilters.value.sort,
          direction: globalFilters.value.direction ? "asc" : "desc",
          status: globalFilters.value.status,
          search: globalFilters.value.search || undefined,
        },
      });
    }
  };

  // Run sync immediately
  syncFilters();

  // Local state for UI editing (before apply)
  const clientFilters = ref({ ...globalFilters.value });
  const searchInput = ref(globalFilters.value.search);

  // Update query helper
  const updateQuery = () => {
    router.push({
      query: {
        sort: globalFilters.value.sort,
        direction: globalFilters.value.direction ? "asc" : "desc",
        status: globalFilters.value.status,
        search: globalFilters.value.search || undefined,
      },
    });
  };

  // Apply changes from local UI to global + URL
  const applyFilters = () => {
    globalFilters.value = {
      ...clientFilters.value,
      search: searchInput.value, // ensure search is synced
    };
    updateQuery();
  };

  // Search handling
  let timer: NodeJS.Timeout;
  watch(searchInput, (val) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      globalFilters.value.search = val;
      updateQuery();
    }, 700);
  });

  // Watch for external URL changes (e.g. back button) to update local UI
  watch(
    () => route.query,
    () => {
      // Sync URL -> Global -> Local
      // But avoid overwriting if we are currently editing?
      // Usually valid to sync if URL changes externally.
      const sort = (route.query.sort as string) || defaults.sort;
      const direction = route.query.direction === "asc";
      const status = (route.query.status as string) || defaults.status;
      const search = (route.query.search as string) || defaults.search;

      globalFilters.value = { sort, direction, status, search };
      clientFilters.value = { ...globalFilters.value };
      if (searchInput.value !== search) {
        searchInput.value = search;
      }
    },
  );

  const setOrderBy = (field: string) => {
    if (clientFilters.value.sort === field) {
      clientFilters.value.direction = !clientFilters.value.direction;
    } else {
      clientFilters.value = {
        sort: field,
        direction: false,
        status: clientFilters.value.status,
        search: clientFilters.value.search,
      };
    }
  };

  const setStatus = (value: string) => {
    clientFilters.value.status = value;
  };

  const checkedIconStyle = computed(() => {
    return clientFilters.value.direction ? "" : "rotate-180";
  });

  const makeCheckboxGroup = (items: any[], extra = {}): DropdownMenuItem[] =>
    items.map((i) => ({
      type: "checkbox" as const,
      ...extra,
      ...i,
    }));

  const sortByItems = computed<DropdownMenuItem[][]>(() => [
    [
      { label: "Ordenar por", type: "label" as const },
      ...makeCheckboxGroup(
        orderFields.map((f) => ({
          label: f.label,
          icon: f.icon,
          checked: clientFilters.value.sort === f.field,
          onUpdateChecked: () => setOrderBy(f.field),
          onSelect(e: Event) {
            e.preventDefault();
          },
        })),
      ),
    ],
    [
      { label: "Estado", type: "label" as const },
      ...makeCheckboxGroup(
        statusOptions.map((s) => ({
          label: s.label,
          icon: s.icon,
          color: s.color,
          checked: clientFilters.value.status === s.value,
          onUpdateChecked: () => setStatus(s.value),
          onSelect(e: Event) {
            e.preventDefault();
          },
        })),
        { slot: "status" },
      ),
    ],
    [
      {
        slot: "apply-actions",
      },
    ],
  ]);

  return {
    clientFilters,
    sortByItems,
    checkedIconStyle,
    searchInput,
    applyFilters,
  };
};

const orderFields = [
  { label: "Nombre", field: "display_full_name", icon: "i-lucide-user" },
  {
    label: "Edad",
    field: "born_date",
    icon: "i-lucide-cake",
  },
  {
    label: "Fecha de creación",
    field: "created_at",
    icon: "i-lucide-calendar",
  },
];

const statusOptions = [
  { label: "Todos", value: "all", icon: "i-lucide-circle-dot" },
  {
    label: "Activo",
    value: "active",
    icon: "i-lucide-circle-check",
    color: "success",
  },
  {
    label: "Inactivo",
    value: "inactive",
    icon: "i-lucide-circle-x",
    color: "error",
  },
];
