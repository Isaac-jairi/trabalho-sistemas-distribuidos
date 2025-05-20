import { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import CobrancaForm from "@/components/forms/cobranca-form";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Novo Boleto | Sistema de Geração de Boletos",
  description: "Formulário para cadastro de novo Boleto",
};

export default function NovaCobrancaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Voltar para página inicial
          </Link>

          <h1 className="text-2xl font-bold text-slate-800 mt-4">
            Novo Boleto
          </h1>
          <p className="text-slate-600 mt-1">
            Preencha o formulário abaixo para registrar um novo Boleto.
          </p>
        </div>

        <CobrancaForm />
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
