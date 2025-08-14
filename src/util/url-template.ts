function encodeReserved(str: string) {
  return str
    .split(/(%[0-9A-Fa-f]{2})/g)
    .map(function (part) {
      if (!/%[0-9A-Fa-f]/.test(part)) {
        part = encodeURI(part).replace(/%5B/g, '[').replace(/%5D/g, ']');
      }
      return part;
    })
    .join('');
}

function encodeUnreserved(str: string) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(
  operator: string | null,
  value: string,
  key?: string | null
) {
  value =
    operator === '+' || operator === '#'
      ? encodeReserved(value)
      : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + '=' + value;
  } else {
    return value;
  }
}

function isDefined<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator: string | null): boolean {
  return operator === ';' || operator === '&' || operator === '?';
}

function getValues(
  context: Record<string, unknown>,
  operator: string | null,
  key: string,
  modifier: string
): string[] {
  let value: any = context[key],
    result: string[] = [];

  if (isDefined(value) && value !== '') {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      value = value.toString();

      if (modifier && modifier !== '*') {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(
        encodeValue(operator, value, isKeyOperator(operator) ? key : null)
      );
    } else {
      if (modifier === '*') {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value: unknown) {
            result.push(
              encodeValue(
                operator,
                String(value),
                isKeyOperator(operator) ? key : null
              )
            );
          });
        } else if (typeof value === 'object' && value !== null) {
          Object.keys(value).forEach(function (k) {
            if (isDefined((value as Record<string, unknown>)[k])) {
              result.push(
                encodeValue(
                  operator,
                  String((value as Record<string, unknown>)[k]),
                  k
                )
              );
            }
          });
        }
      } else {
        let tmp: string[] = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value: unknown) {
            tmp.push(encodeValue(operator, String(value)));
          });
        } else if (typeof value === 'object' && value !== null) {
          Object.keys(value).forEach(function (k) {
            if (isDefined((value as Record<string, unknown>)[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(
                encodeValue(
                  operator,
                  String((value as Record<string, unknown>)[k])
                )
              );
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + '=' + tmp.join(','));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(','));
        }
      }
    }
  } else {
    if (operator === ';') {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === '' && (operator === '&' || operator === '?')) {
      result.push(encodeUnreserved(key) + '=');
    } else if (value === '') {
      result.push('');
    }
  }
  return result;
}

export function parseTemplate(template: string) {
  const operators = ['+', '#', '.', '/', ';', '?', '&'] as const;

  return {
    expand: function (context: Record<string, unknown>) {
      return template.replace(
        /\{([^{}]+)}|([^{}]+)/g,
        function (_: string, expression: string, literal: string) {
          if (expression) {
            let operator: string | null = null,
              values: string[] = [];

            if (
              operators.indexOf(
                expression.charAt(0) as (typeof operators)[number]
              ) !== -1
            ) {
              operator = expression.charAt(0);
              expression = expression.substring(1);
            }

            expression.split(/,/g).forEach(function (variable: string) {
              const tmp = /([^:*]*)(?::(\d+)|(\*))?/.exec(variable);
              if (tmp) {
                values.push.apply(
                  values,
                  getValues(context, operator, tmp[1], tmp[2] || tmp[3])
                );
              }
            });

            if (operator && operator !== '+') {
              let separator = ',';

              if (operator === '?') {
                separator = '&';
              } else if (operator !== '#') {
                separator = operator;
              }
              return (
                (values.length !== 0 ? operator : '') + values.join(separator)
              );
            } else {
              return values.join(',');
            }
          } else {
            return encodeReserved(literal);
          }
        }
      );
    },
  };
}
