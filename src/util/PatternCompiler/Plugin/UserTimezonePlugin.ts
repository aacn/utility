import { CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';
import { DateFormatter } from '@/util/PatternCompiler/Plugin/DateFormatter';
import { UserTimezone } from '@/util/PatternCompiler/Plugin/TimezonePlugin';

type Hash<T> = {
  hash?: T;
};

export const userTimezonePlugin: CompilerPlugin<UserTimezone> = (
  handlebars,
  { timezone, locale }
) => {
  // https://handlebarsjs.com/guide/block-helpers.html#hash-arguments
  handlebars.registerHelper(
    'getUserZoneAdjustedWeekday',
    function (dateString: string, options: Hash<Partial<UserTimezone>>) {
      return DateFormatter.getZoneAdjustedWeekday(dateString, {
        timezone: options?.hash?.timezone ?? timezone,
        locale: options?.hash?.locale ?? locale,
      });
    }
  );

  handlebars.registerHelper(
    'getUserZoneAdjustedDate',
    function (dateString: string, options: Hash<Partial<UserTimezone>>) {
      return DateFormatter.getZoneAdjustedDate(dateString, {
        timezone: options?.hash?.timezone ?? timezone,
        locale: options?.hash?.locale ?? locale,
      });
    }
  );

  handlebars.registerHelper(
    'getUserZoneAdjustedTime',
    function (dateString: string, options: Hash<Partial<UserTimezone>>) {
      return DateFormatter.getZoneAdjustedTime(dateString, {
        timezone: options?.hash?.timezone ?? timezone,
        locale: options?.hash?.locale ?? locale,
      });
    }
  );
};
