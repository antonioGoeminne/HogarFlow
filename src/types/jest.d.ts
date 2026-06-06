// Aporta los globals de Jest (describe/it/expect) al type-check.
// Vía aditiva: a diferencia de poner "types": ["jest"] en tsconfig, esto NO
// desactiva la auto-inclusión del resto de @types. Hace falta porque el layout
// estricto de pnpm rompe la auto-inclusión de @types/jest de TypeScript.
/// <reference types="jest" />
