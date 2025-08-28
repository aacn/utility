import Handlebars from 'handlebars';
import {
  type PatternView,
  IPatternCompiler,
} from '@/util/PatternCompiler/IPatternCompiler';

export class PatternCompiler implements IPatternCompiler {
  private handlebars: typeof Handlebars;

  constructor(
    private defaultView: PatternView,
    installPlugins: (handlebars: typeof Handlebars) => void
  ) {
    this.handlebars = Handlebars.create();

    installPlugins(this.handlebars);
  }

  compile(source?: string | null, partialView?: PatternView): string {
    if (!source) return '';

    const compiler = this.handlebars.compile(source);

    return compiler({
      ...this.defaultView,
      ...partialView,
    });
  }

  static keyToTemplate(key: string): string {
    return `{{${key}}}`;
  }

  keyToTemplate(key: string): string {
    return PatternCompiler.keyToTemplate(key);
  }
}
