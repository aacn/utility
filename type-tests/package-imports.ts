import {
  DateFormatter,
  HttpHandler,
  parseTemplate,
  type native,
} from '@native-systems/utility';
import {
  eqPlugin,
  PatternCompiler,
  type CompilerPlugin,
  type PatternView,
} from '@native-systems/utility/pattern';

const view: PatternView = { name: 'Native Systems' };
const compiler = new PatternCompiler(view, () => {});
const parsed = parseTemplate('/users/{id}').expand({ id: '42' });
const formatted = DateFormatter.formatFormal('2025-08-14T15:30:00Z');
const plugin: CompilerPlugin = eqPlugin;
declare const errorResponse: native.ErrorResponse;
declare const caughtError: unknown;

void compiler.compile('{{name}}');
void plugin;
void HttpHandler.error(errorResponse);
void HttpHandler.error(caughtError);
void parsed;
void formatted;
