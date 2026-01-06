export const formatDate = (
  date: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", options);
};
