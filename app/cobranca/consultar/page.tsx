"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SearchIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const consultaBoletoSchema = z.object({
  numeroBoleto: z
    .string()
    .min(1, { message: "Número do boleto é obrigatório" }),
});

type ConsultaBoletoValues = z.infer<typeof consultaBoletoSchema>;

export default function ConsultarBoleto() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultaBoletoValues>({
    resolver: zodResolver(consultaBoletoSchema),
    defaultValues: {
      numeroBoleto: "",
    },
  });

  async function onSubmit(values: ConsultaBoletoValues) {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/cobranca/consultar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch boleto");
      }

      // Get the PDF blob from the response
      const pdfBlob = await response.blob();

      // Create a URL for the blob
      const url = window.URL.createObjectURL(pdfBlob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = `boleto-${values.numeroBoleto}.pdf`;

      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL
      window.URL.revokeObjectURL(url);

      toast.success("Boleto encontrado com sucesso!");
    } catch (error) {
      console.error("Error fetching boleto:", error);
      toast.error(
        "Erro ao consultar boleto. Verifique o número e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <CardTitle className="text-xl font-medium">
            Consultar Boleto
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="numeroBoleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do Boleto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o número do boleto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between border-t bg-slate-50/50 p-6 rounded-b-lg">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[140px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Consultando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Consultar
                    </span>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
