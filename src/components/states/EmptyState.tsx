interface Props {
  message?: string;
}

export function EmptyState({ message = "Nenhum cliente encontrado." }: Props) {
  return (
    <div className="py-20 text-center text-muted-foreground">{message}</div>
  );
}
