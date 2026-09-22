/** Valores em centavos inteiros; arredondamento decimal, metade para longe de zero. */
export class Money {
  private readonly cents: number;
  constructor(value: number | string) {
    const [numerator, denominator] = Money.decimal(value);
    this.cents = Money.safe(Money.round(numerator * 100n, denominator));
  }
  private static decimal(value: number | string): [bigint, bigint] {
    if (typeof value === 'number' && !Number.isFinite(value)) throw new Error('Money: valor inválido');
    if (typeof value !== 'number' && typeof value !== 'string') throw new Error('Money: valor inválido');
    const match = /^([+-]?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i.exec(String(value).trim());
    if (!match) throw new Error('Money: use um decimal completo com ponto, sem separador de milhares');
    const exponent = Number(match[4] || 0) - (match[3]?.length || 0);
    if (Math.abs(exponent) > 100 || match[2].length > 100) throw new Error('Money: valor fora do limite');
    let numerator = BigInt(match[2] + (match[3] || '')) * (match[1] === '-' ? -1n : 1n);
    if (exponent >= 0) numerator *= 10n ** BigInt(exponent);
    return [numerator, exponent < 0 ? 10n ** BigInt(-exponent) : 1n];
  }
  private static round(value: bigint, denominator: bigint): bigint {
    const sign = value < 0n ? -1n : 1n;
    return sign * ((value * sign + denominator / 2n) / denominator);
  }
  private static safe(value: bigint): number {
    const number = Number(value);
    if (!Number.isSafeInteger(number)) throw new Error('Money: centavos fora do limite seguro');
    return number;
  }
  get amount(): number { return this.cents / 100; }
  get formatted(): string {
    const reais = Math.floor(Math.abs(this.cents) / 100).toLocaleString('pt-BR');
    return (this.cents < 0 ? '-' : '') + 'R$ ' + reais + ',' + String(Math.abs(this.cents) % 100).padStart(2, '0');
  }
  add(other: Money): Money { return Money.fromCents(Money.safe(BigInt(this.cents) + BigInt(other.cents))); }
  subtract(other: Money): Money { return Money.fromCents(Money.safe(BigInt(this.cents) - BigInt(other.cents))); }
  multiply(factor: number): Money {
    const [numerator, denominator] = Money.decimal(factor);
    return Money.fromCents(Money.safe(Money.round(BigInt(this.cents) * numerator, denominator)));
  }
  divideEvenly(parts: number): Money[] {
    if (!Number.isSafeInteger(parts) || parts < 1 || parts > 10000) throw new Error('Money: quantidade de partes inválida');
    const base = Math.trunc(this.cents / parts);
    const remainder = this.cents - base * parts;
    return Array.from({ length: parts }, (_, i) => Money.fromCents(base + (i === parts - 1 ? remainder : 0)));
  }
  equals(other: Money): boolean { return this.cents === other.cents; }
  isZero(): boolean { return this.cents === 0; }
  isPositive(): boolean { return this.cents > 0; }
  isNegative(): boolean { return this.cents < 0; }
  toJSON(): number { return this.cents; }
  static fromJSON(cents: number): Money { return Money.fromCents(cents); }
  static fromCents(cents: number): Money {
    if (!Number.isSafeInteger(cents)) throw new Error('Money: centavos devem ser inteiros seguros');
    const value = new Money(0);
    Object.defineProperty(value, 'cents', { value: cents, writable: false });
    return value;
  }
}
