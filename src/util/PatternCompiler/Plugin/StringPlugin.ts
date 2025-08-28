import { CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';
import Handlebars from 'handlebars';

export const stringPlugin: CompilerPlugin<never> = (handlebars) => {
  handlebars.registerHelper(
    'subString',
    function (passedString: string | null, start: number, end: number) {
      const theString = passedString?.substring(start, end);
      return new Handlebars.SafeString(theString ?? '');
    }
  );
};
