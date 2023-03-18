import path from 'path';

export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      include: ['**/src/modules/**/domain/use-cases/**/*.ts'],
      exclude: ['**/src/modules/**/domain/use-cases/**/*.spec.ts', '**/src/modules/**/domain/use-cases/**/*.dto.ts']
    },
  },
};
