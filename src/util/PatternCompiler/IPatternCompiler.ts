export type PatternView = Record<string | number, any>;

export type CompileFn = (source?: string | null, view?: PatternView) => string;

export interface IPatternCompiler {
  compile: CompileFn;
  keyToTemplate(key: string): string;
}
