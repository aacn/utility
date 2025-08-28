export type CompilerPlugin<T> = (
  handlebars: typeof Handlebars,
  data: T
) => void;
