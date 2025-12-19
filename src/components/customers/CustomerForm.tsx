import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCustomers } from "@/hooks/useCustomers";
import type { Customer } from "@/types/customer";
import { formatPhone } from "@/utils/formatPhone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { FieldError } from "../FieldError";

const schema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive"], { message: "Status é obrigatório" }),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  customer?: Customer;
  onSuccess: () => void;
}

export function CustomerForm({ customer, onSuccess }: Props) {
  const { createCustomer, updateCustomer, isCreating, isUpdating } =
    useCustomers();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer?.name ?? "",
      email: customer?.email ?? "",
      phone: customer?.phone ?? "",
      status: customer?.status,
      notes: customer?.notes ?? "",
    },
  });

  const isEditing = Boolean(customer);

  const onSubmit = async (data: FormData) => {
    const action = isEditing ? updateCustomer : createCustomer;
    const payload = isEditing ? { ...customer, ...data } : data;

    await action(payload as Customer);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Nome" {...register("name")} />
      <FieldError message={errors.name?.message} />

      <Input placeholder="E-mail" {...register("email")} />
      <FieldError message={errors.email?.message} />

      <div className="flex gap-4">
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              placeholder="Telefone"
              {...field}
              onChange={(e) => field.onChange(formatPhone(e.target.value))}
            />
          )}
        />

        <div>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <div className={errors.status ? "mt-4" : "0"}>
            {errors.status && <FieldError message={errors.status.message} />}
          </div>
        </div>
      </div>

      <Textarea placeholder="Observações" {...register("notes")} />

      <div className="flex justify-end gap-2">
        <Button
          onClick={() => {
            reset();
            onSuccess();
          }}
          type="button"
          variant="outline"
          className="bg-foreground hover:bg-muted"
        >
          Cancelar
        </Button>
        <Button
          variant="secondary"
          type="submit"
          disabled={isCreating || isUpdating}
        >
          {isCreating || isUpdating ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
