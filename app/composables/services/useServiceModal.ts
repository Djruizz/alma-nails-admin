export const useServiceModal = () => {
  const isOpen = useState<boolean>("service-modal-open", () => false);
  const isDeleteModalOpen = useState<boolean>(
    "service-delete-modal-open",
    () => false
  );
  const editingService = useState<Service | null>(
    "service-modal-editing",
    () => null
  );
  const deletingService = useState<Service | null>(
    "service-modal-deleting",
    () => null
  );
  const toast = useToast();

  const { createService, updateService, deleteService } = useServices();

  const initialState = {
    name: "",
    price: 0,
    duration_min: 30,
    is_active: true,
  };

  const serviceState = useState<ServiceSchema>("service-modal-state", () => ({
    ...initialState,
  }));

  const isEditing = computed(() => editingService.value !== null);

  const openCreateModal = () => {
    Object.assign(serviceState.value, initialState);
    editingService.value = null;
    isOpen.value = true;
  };

  const openEditModal = (service: Service) => {
    Object.assign(serviceState.value, {
      name: service.name,
      price: service.price,
      duration_min: service.duration_min,
      is_active: service.is_active,
    });
    editingService.value = service;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const saveService = async () => {
    try {
      closeModal();
      if (isEditing.value && editingService.value) {
        await updateService(editingService.value.id, serviceState.value);
        toast.add({
          title: "Servicio actualizado",
          description: "El servicio se actualizó correctamente",
          icon: "i-lucide-circle-check",
          color: "success",
        });
      } else {
        await createService(serviceState.value);
        toast.add({
          title: "Servicio creado",
          description: "El servicio se creó correctamente",
          icon: "i-lucide-circle-check",
          color: "success",
        });
      }
      editingService.value = null;
      Object.assign(serviceState, initialState);
    } catch (e: any) {
      toast.add({
        title: e.statusMessage || "Error",
        description:
          e.data?.message || e.message || "Error al guardar el servicio",
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  };

  const openDeleteModal = (service: Service) => {
    deletingService.value = service;
    isDeleteModalOpen.value = true;
  };

  const closeDeleteModal = () => {
    isDeleteModalOpen.value = false;
    setTimeout(() => {
      deletingService.value = null;
    }, 300);
  };

  const handleDelete = async () => {
    if (!deletingService.value) return;

    try {
      await deleteService(deletingService.value.id);
      toast.add({
        title: "Servicio eliminado",
        description: "El servicio se eliminó correctamente",
        icon: "i-lucide-circle-check",
        color: "success",
      });
      closeDeleteModal();
    } catch (e: any) {
      toast.add({
        title: e.statusMessage || "Error",
        description:
          e.data?.message || e.message || "Error al eliminar el servicio",
        icon: "i-lucide-circle-alert",
        color: "error",
      });
    }
  };

  return {
    isOpen,
    isDeleteModalOpen,
    serviceState,
    deletingService,
    isEditing,
    openCreateModal,
    openEditModal,
    closeModal,
    saveService,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  };
};
