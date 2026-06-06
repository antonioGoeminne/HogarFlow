import { money } from '@/lib/format/money';

describe('money', () => {
  it('antepone el símbolo de peso', () => {
    expect(money(0)).toBe('$0');
  });

  it('agrupa los miles sin atarse al separador del runtime', () => {
    // toLocaleString('es-AR') depende del ICU del runtime (Node vs Hermes):
    // puede dar '1.234', '1,234' o '1234'. \D? acepta cualquiera de los tres.
    expect(money(1234)).toMatch(/^\$1\D?234$/);
  });

  it('agrupa millones en dos cortes', () => {
    expect(money(1234567)).toMatch(/^\$1\D?234\D?567$/);
  });
});
