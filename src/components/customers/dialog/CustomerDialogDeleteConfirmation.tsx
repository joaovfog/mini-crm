import { Button } from "@/components/ui/button";

interface Props {
  isDeleting: boolean;
  onCancel: () => void;
  handleDelete: () => void;
}

export function CustomerDialogDeleteConfirmation({
  isDeleting,
  onCancel,
  handleDelete,
}: Props) {
  return (
    <>
      <p className="text-sm text-muted-foreground">
        Tem certeza que deseja excluir este cliente?
        <br />
        Essa ação não pode ser desfeita.
      </p>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isDeleting}
          className="bg-foreground hover:bg-muted"
        >
          Cancelar
        </Button>

        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Excluindo..." : "Excluir Cliente"}
        </Button>
      </div>
    </>
  );
}
