function splitCamelCase(value: string): string[] {
  return value.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+/g) ?? [];
}

function sanitizeFallback(fallback?: string): string {
  const cleaned = (fallback ?? 'org').toLowerCase().replace(/[^a-z0-9-]/g, '');

  return cleaned.length > 0 ? cleaned : 'org';
}

function buildPrefixFromSegments(
  segments: string[],
  useShortSuffixRule: boolean
): string {
  if (segments.length === 0) return '';

  if (useShortSuffixRule && segments.length === 2) {
    const [first, second] = segments;

    if (second.length <= 2 && first.length >= 2) {
      return `${first[0]}${first[1]}${second[0]}`.toLowerCase();
    }
  }

  return segments
    .map((segment) => segment[0])
    .join('')
    .toLowerCase();
}

function generatePrefix(name: string, fallback?: string): string {
  const safeFallback = sanitizeFallback(fallback);

  if (!name) return safeFallback;

  const words = name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return safeFallback;

  if (words.length === 1) {
    const lettersOnly = words[0].replace(/[^a-zA-Z]/g, '');

    if (!lettersOnly) return safeFallback;

    if (lettersOnly === lettersOnly.toLowerCase()) {
      return lettersOnly;
    }

    if (lettersOnly === lettersOnly.toUpperCase()) {
      return lettersOnly.toLowerCase();
    }

    const segments = splitCamelCase(lettersOnly);
    const prefix = buildPrefixFromSegments(segments, true);
    return prefix.length > 0 ? prefix : safeFallback;
  }

  const segments = words.flatMap((word) => {
    const lettersOnly = word.replace(/[^a-zA-Z]/g, '');
    if (!lettersOnly) return [];
    return splitCamelCase(lettersOnly);
  });

  const prefix = buildPrefixFromSegments(segments, false);
  return prefix.length > 0 ? prefix : safeFallback;
}

export { generatePrefix };
