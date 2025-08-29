import { CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';

export const urlPlugin: CompilerPlugin = (handlebars) => {
  handlebars.registerHelper('urlSafe', function (inputString: string) {
    return encodeURIComponent(String(inputString));
  });
};
