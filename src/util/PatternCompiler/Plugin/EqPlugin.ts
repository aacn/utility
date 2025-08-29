import { CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';

export const eqPlugin: CompilerPlugin = (handlebars) => {
  handlebars.registerHelper('eq', function (a, b) {
    return a === b;
  });
};
