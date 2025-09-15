import Handlebars from 'handlebars';

import { type CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';

export type MarkdownHelpers = {
  renderAndSanitize: (inp: string) => string;
};

/**
 * Example usage:
 * sanitizeHtml(renderMarkdown(markdownText), {
 *       allowedTags: [
 *         ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b'],
 *         ...['i', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'p', 'br'],
 *       ],
 *       allowedAttributes: {
 *         a: ['href', 'title', 'target'],
 *       },
 *       // enforce target="_blank" on links
 *       transformTags: {
 *         a: sanitizeHtml.simpleTransform('a', {
 *           target: '_blank',
 *           rel: 'noopener',
 *         }),
 *       },
 *     });
 * @param handlebars
 * @param renderAndSanitize
 */
export const markdownPlugin: CompilerPlugin<MarkdownHelpers> = (
  handlebars,
  { renderAndSanitize }
) => {
  handlebars.registerHelper('md', function (markdownText: string) {
    if (!markdownText) return '';

    const cleanHtml = renderAndSanitize(markdownText);

    return new Handlebars.SafeString(cleanHtml);
  });
};
