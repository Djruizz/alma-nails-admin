import { serverSupabaseClient } from "#supabase/server";
import { getBusinessId } from "@@/server/utils/protectRoute";

export default defineEventHandler(
  async (event): Promise<{ ok: boolean; message: string }> => {
    const businessId = await getBusinessId(event);

    const clientId = getRouterParams(event).id;
    if (!clientId) {
      throw createError({
        statusCode: 400,
        statusMessage: "Datos invalidos",
        message: "No se proporciono un ID de cliente",
      });
    }
    const client = await serverSupabaseClient<Database>(event);

    // Verificar citas
    const { data: appointments, error: appointmentsError } = await client
      .from("appointments")
      .select("*")
      .eq("client_id", clientId)
      .eq("business_id", businessId);

    if (appointmentsError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al eliminar el cliente",
        message: translateSupabaseError(appointmentsError.message),
      });
    }

    // Verificar si el cliente esta registrado
    const { data: clientData, error: clientError } = await client
      .from("business_clients_with_profiles")
      .select("is_registered")
      .eq("id", clientId)
      .eq("business_id", businessId)
      .single();

    if (clientError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al eliminar el cliente",
        message: translateSupabaseError(clientError.message),
      });
    }
    // Si el cliente tiene citas, no se puede eliminar
    if (appointments.length > 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No puedes eliminar clientes con citas programadas",
        message: "El cliente tiene citas programadas",
      });
    }

    // Si el cliente esta registrado, desactivarlo
    if (clientData.is_registered) {
      const { error } = await client
        .from("business_clients")
        .update({ is_active: false })
        .eq("id", clientId)
        .eq("business_id", businessId);
      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: "Error al desactivar el cliente",
          message: translateSupabaseError(error.message),
        });
      }
      return {
        ok: false,
        message: "El cliente fue desactivado, no se puede eliminar",
      };
    }

    const { error } = await client
      .from("business_clients")
      .delete()
      .eq("id", clientId)
      .eq("business_id", businessId);

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: "Error al eliminar el cliente",
        message: translateSupabaseError(error.message),
      });
    }

    return { ok: true, message: "El cliente fue eliminado" };
  },
);
