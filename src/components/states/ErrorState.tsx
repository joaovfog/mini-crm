import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  onRetry?: () => void;
}

export function ErrorState({ onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-red-600">
      <AlertTriangle className="mb-2 h-6 w-6" />
      <p className="mb-4">
        Não foi possível carregar os clientes. Tente novamente.
      </p>

      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
