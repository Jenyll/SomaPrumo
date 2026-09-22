import { Money } from '../money/Money';
export function required(value: string, field: string): void {
  if (typeof value !== 'string' || !value.trim()) throw new Error(field + ': obrigatório');
}
export function positive(value: Money, field = 'Valor'): void {
  if (!(value instanceof Money) || !value.isPositive()) throw new Error(field + ': deve ser positivo');
}
export function nonnegative(value: Money, field = 'Valor'): void {
  if (!(value instanceof Money) || value.isNegative()) throw new Error(field + ': não pode ser negativo');
}
export function date(value: Date | string): Date {
  if (!(value instanceof Date) && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(value))) throw new Error('Data inválida');
  const result = new Date(value);
  if (!Number.isFinite(result.getTime())) throw new Error('Data inválida');
  if (typeof value === 'string') {
    const [year, month, day] = value.slice(0, 10).split('-').map(Number);
    if (month < 1 || month > 12 || day < 1 || day > new Date(Date.UTC(year, month, 0)).getUTCDate()) throw new Error('Data inválida');
  }
  return result;
}
export function period(month: number, year: number): void {
  if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 1900 || year > 9999) throw new Error('Competência inválida');
}
export function unique(ids: string[]): void {
  ids.forEach(id => required(id, 'ID'));
  if (new Set(ids).size !== ids.length) throw new Error('ID duplicado');
}
