import { z } from "zod";

// Helper function to validate Brazilian CEP format
const isCepValid = (cep: string) => /^\d{5}-?\d{3}$/.test(cep);

// Helper function to create a date string validator
const createDateValidator = (fieldName: string) =>
  z
    .string()
    .min(1, { message: `${fieldName} é obrigatório` })
    .refine(
      (date) => {
        // Basic date validation (YYYY-MM-DD)
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
      },
      { message: `${fieldName} deve estar no formato correto (AAAA-MM-DD)` }
    );

// Define the schema for the form
export const cobrancaFormSchema = z.object({
  // Sacado (Payer) Information
  nomeSacadoCobranca: z
    .string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  numeroInscricaoSacadoCobranca: z
    .string()
    .min(11, { message: "Número de inscrição inválido" }),
  textoEnderecoSacadoCobranca: z
    .string()
    .min(5, { message: "Endereço deve ter pelo menos 5 caracteres" }),
  nomeBairroSacadoCobranca: z
    .string()
    .min(2, { message: "Bairro deve ter pelo menos 2 caracteres" }),
  nomeMunicipioSacadoCobranca: z
    .string()
    .min(2, { message: "Município deve ter pelo menos 2 caracteres" }),
  siglaUnidadeFederacaoSacadoCobranca: z
    .string()
    .length(2, { message: "UF deve ter 2 caracteres" }),
  numeroCepSacadoCobranca: z
    .string()
    .min(8, { message: "CEP inválido" })
    .refine(isCepValid, { message: "Formato de CEP inválido" }),

  // Title/Invoice Information
  valorDescontoTitulo: z.coerce
    .number()
    .nonnegative({ message: "O valor de desconto não pode ser negativo" }),
  valorJuroMoraTitulo: z.coerce
    .number()
    .nonnegative({ message: "O valor de juros não pode ser negativo" }),
  numeroTituloCedenteCobranca: z
    .string()
    .min(1, { message: "Número do título é obrigatório" }),
  dataVencimentoTituloCobranca: createDateValidator("Data de vencimento"),
  dataEmissaoTituloCobranca: createDateValidator("Data de emissão"),

  // Payment Information
  codigoLinhaDigitavel: z
    .string()
    .min(47, { message: "Linha digitável deve ter pelo menos 47 caracteres" })
    .max(48, { message: "Linha digitável deve ter no máximo 48 caracteres" }),
  textoCodigoBarrasTituloCobranca: z
    .string()
    .min(44, { message: "Código de barras deve ter 44 caracteres" })
    .max(44, { message: "Código de barras deve ter 44 caracteres" }),
  valorOriginalTituloCobranca: z.coerce
    .number()
    .positive({ message: "O valor original deve ser maior que zero" }),

  // Additional Information
  numeroBoleto: z
    .string()
    .min(1, { message: "Número do boleto é obrigatório" }),
  numeroConvenio: z
    .string()
    .min(1, { message: "Número do convênio é obrigatório" }),
  nomeUsuarioSolicitante: z
    .string()
    .min(3, {
      message: "Nome do solicitante deve ter pelo menos 3 caracteres",
    }),
});

export type CobrancaFormValues = z.infer<typeof cobrancaFormSchema>;

// Define default values for the form
export const defaultValues: Partial<CobrancaFormValues> = {
  nomeSacadoCobranca: "",
  numeroInscricaoSacadoCobranca: "",
  textoEnderecoSacadoCobranca: "",
  nomeBairroSacadoCobranca: "",
  nomeMunicipioSacadoCobranca: "",
  siglaUnidadeFederacaoSacadoCobranca: "",
  numeroCepSacadoCobranca: "",
  valorDescontoTitulo: 0,
  valorJuroMoraTitulo: 0,
  numeroTituloCedenteCobranca: "",
  dataVencimentoTituloCobranca: "",
  dataEmissaoTituloCobranca: "",
  codigoLinhaDigitavel: "",
  textoCodigoBarrasTituloCobranca: "",
  valorOriginalTituloCobranca: 0,
  numeroBoleto: "",
  numeroConvenio: "",
  nomeUsuarioSolicitante: "",
};
