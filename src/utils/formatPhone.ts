export function formatPhone(value: string) {
  if (!value) return "";

  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  return value;
}
