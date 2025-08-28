import { CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';

export const urlPlugin: CompilerPlugin<never> = (handlebars) => {
  handlebars.registerHelper('urlSafe', function (inputString: string) {
    return encodeURIComponent(String(inputString));
  });
};
