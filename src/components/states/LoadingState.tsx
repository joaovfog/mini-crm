import { Loader2 } from "lucide-react";

interface Props {
  message: string;
}

export function LoadingState({ message }: Props) {
  return (
    <div className="flex items-center justify-center py-20 text-muted-foreground">
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      <span>{message}</span>
    </div>
  );
}
