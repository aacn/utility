export type CompilerPlugin<T = void> = (
  handlebars: typeof Handlebars,
  ...args: [T] extends [void] ? [] : [data: T]
) => void;
