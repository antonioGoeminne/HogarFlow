/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  // Mock global del SDK de Supabase (ESM), que la cadena de imports arrastra.
  setupFiles: ['<rootDir>/jest/setup.ts'],
  // Jest no usa Metro, así que los alias de tsconfig (@/*) hay que mapearlos acá.
  moduleNameMapper: {
    // CSS primero: Jest no entiende CSS y la cadena theme.ts → global.css lo
    // arrastra. Debe ganar ANTES que la regla de alias, si no @/global.css
    // matchea '^@/(.*)$', resuelve a un .css real y vuelve a explotar.
    '\\.css$': '<rootDir>/jest/style-mock.js',
    // @/assets antes que @/: más específico, debe ganar primero.
    '^@/assets/(.*)$': '<rootDir>/assets/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
