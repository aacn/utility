import Handlebars from 'handlebars';
import sanitizeHtml, { simpleTransform } from 'sanitize-html';
import MarkdownIt from 'markdown-it';

import { type CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';

const mdParser = new MarkdownIt();

export const markdownPlugin: CompilerPlugin = (handlebars) => {
  handlebars.registerHelper('md', function (markdownText: string) {
    if (!markdownText) return '';

    const cleanHtml = sanitizeHtml(mdParser.render(markdownText), {
      allowedTags: [
        ...['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b'],
        ...['i', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'p', 'br'],
      ],
      allowedAttributes: {
        a: ['href', 'title', 'target'],
      },
      // enforce target="_blank" on links
      transformTags: {
        a: simpleTransform('a', {
          target: '_blank',
          rel: 'noopener',
        }),
      },
    });

    return new Handlebars.SafeString(cleanHtml);
  });
};
