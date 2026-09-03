import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { z } from "zod";

type RequiredFormProps<TValues extends FieldValues> = Omit<
  React.ComponentProps<"form">,
  "children" | "noValidate" | "onSubmit"
> & {
  children: (form: UseFormReturn<TValues>) => ReactNode;
  defaultValues: DefaultValues<TValues>;
  onSubmit?: SubmitHandler<TValues>;
  schema: z.ZodType<TValues>;
};

function RequiredForm<TValues extends FieldValues>({
  children,
  defaultValues,
  onSubmit = () => undefined,
  schema,
  ...props
}: RequiredFormProps<TValues>) {
  const form = useForm<TValues>({
    defaultValues,
    resolver: zodResolver(schema) as Resolver<TValues>,
  });

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} {...props}>
      {children(form)}
    </form>
  );
}

export { RequiredForm };
