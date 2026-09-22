/**
 * Testes para Money - Value Object
 */

import { describe, it, expect } from 'vitest';
import { Money } from '../../src/domain/money/Money';

describe('Money', () => {
  it('cria Money a partir de número', () => {
    const m = new Money(100.5);
    expect(m.amount).toBe(100.5);
  });

  it('cria Money a partir de string', () => {
    const m = new Money('50.25');
    expect(m.amount).toBe(50.25);
  });

  it('formata corretamente', () => {
    const m = new Money(1234.56);
    expect(m.formatted).toContain('1.234,56');
  });

  it('soma dois Money', () => {
    const m1 = new Money(100);
    const m2 = new Money(50);
    const result = m1.add(m2);
    expect(result.amount).toBe(150);
  });

  it('subtrai dois Money', () => {
    const m1 = new Money(100);
    const m2 = new Money(30);
    const result = m1.subtract(m2);
    expect(result.amount).toBe(70);
  });

  it('multiplica por fator', () => {
    const m = new Money(100);
    const result = m.multiply(2);
    expect(result.amount).toBe(200);
  });

  it('divide igualmente entre N partes', () => {
    const m = new Money(100);
    const parts = m.divideEvenly(3);

    expect(parts.length).toBe(3);
    expect(parts[0].amount).toBeCloseTo(33.33, 2);
    expect(parts[1].amount).toBeCloseTo(33.33, 2);
    expect(parts[2].amount).toBeCloseTo(33.34, 2); // Último recebe ajuste

    // Validar que está sem erros de arredondamento
    const sum = parts.reduce((acc, p) => acc.add(p), new Money(0));
    expect(sum.equals(m)).toBe(true);
  });

  it('identifica zero', () => {
    const zero = new Money(0);
    const nonZero = new Money(0.01);

    expect(zero.isZero()).toBe(true);
    expect(nonZero.isZero()).toBe(false);
  });

  it('identifica positivo/negativo', () => {
    const pos = new Money(100);
    const neg = new Money(-50);

    expect(pos.isPositive()).toBe(true);
    expect(pos.isNegative()).toBe(false);
    expect(neg.isPositive()).toBe(false);
    expect(neg.isNegative()).toBe(true);
  });

  it('serializa e desserializa corretamente', () => {
    const m = new Money(123.45);
    const json = m.toJSON();
    const restored = Money.fromJSON(json);

    expect(restored.amount).toBe(123.45);
  });

  it('trata centavos problemáticos', () => {
    // Problema clássico: 0.1 + 0.2 !== 0.3
    const m1 = new Money(0.1);
    const m2 = new Money(0.2);
    const result = m1.add(m2);

    expect(result.amount).toBeCloseTo(0.3, 10);
  });
});
