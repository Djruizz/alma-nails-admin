import type { DropdownMenuItem } from "@nuxt/ui";

export const useSortBy = () => {
  const router = useRouter();
  const route = useRoute();
  const initialClientFilters = useState("clientFilters", () => ({
    sort: route.query.sort || "created_at",
    direction: route.query.direction === "asc",
    status: route.query.status || "all",
  }));
  const clientFilters = ref(initialClientFilters.value);

  const updateQuery = () => {
    router.push({
      query: {
        sort: clientFilters.value.sort,
        direction: clientFilters.value.direction ? "asc" : "desc",
        status: clientFilters.value.status,
      },
    });
  };
  updateQuery();
  const setOrderBy = (field: string) => {
    if (clientFilters.value.sort === field) {
      clientFilters.value.direction = !clientFilters.value.direction;
    } else {
      clientFilters.value = {
        sort: field,
        direction: false,
        status: clientFilters.value.status,
      };
    }
  };
  const setStatus = (value: string) => {
    clientFilters.value.status = value;
    updateQuery();
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
  const { sortClients } = useClients();
  const applyActions = () => {
    updateQuery();
    sortClients();
    clientFilters.value = initialClientFilters.value;
  };

  return {
    open,
    clientFilters,
    sortByItems,
    checkedIconStyle,
    setOrderBy,
    applyActions,
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
