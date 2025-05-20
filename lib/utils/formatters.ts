import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Format currency values to Brazilian Real
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// Format CEP with mask
export const formatCEP = (cep: string): string => {
  cep = cep.replace(/\D/g, '');
  if (cep.length <= 8) {
    cep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  return cep;
};

// Format document number (CPF/CNPJ)
export const formatDocumentNumber = (doc: string): string => {
  doc = doc.replace(/\D/g, '');
  
  if (doc.length <= 11) {
    // CPF format: XXX.XXX.XXX-XX
    return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    // CNPJ format: XX.XXX.XXX/XXXX-XX
    return doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
};

// Format date from ISO to local format
export const formatDate = (date: string): string => {
  if (!date) return '';
  
  try {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return date;
  }
};

// Parse local date format to ISO
export const parseDate = (date: string): string => {
  if (!date) return '';
  
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
};

// Format the readable line code
export const formatLinhaDigitavel = (code: string): string => {
  code = code.replace(/\D/g, '');
  return code.replace(/(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})/, '$1.$2.$3.$4.$5.$6.$7.$8');
};