import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="w-full max-w-3xl">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-slate-800">
              Sistema de Gerador de Boletos
            </CardTitle>
            <CardDescription className="text-slate-500">
              Gerador de boletos em PDF
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <p className="mb-8 text-center text-slate-600 max-w-md">
              Bem-vindo ao sistema de geração de boletos. Utilize o formulário
              para registrar novos boletos e recebe-lo em PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/cobranca/nova" passHref>
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-medium shadow-md transition-all hover:shadow-lg"
                >
                  Novo Boleto
                </Button>
              </Link>
              <Link href="/cobranca/consultar" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-medium shadow-md transition-all hover:shadow-lg"
                >
                  Consultar Boleto
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
