import { CompilerPlugin } from '@/util/PatternCompiler/Plugin/CompilerPlugin';
import { DateFormatter } from '@/util/PatternCompiler/Plugin/DateFormatter';

export type UserTimezone = {
  timezone: string;
  locale: string;
};

export const timezonePlugin: CompilerPlugin<UserTimezone> = (
  handlebars,
  { timezone, locale }
) => {
  handlebars.registerHelper(
    'getZoneAdjustedWeekday',
    function (dateString: string) {
      return DateFormatter.getZoneAdjustedWeekday(dateString, {
        timezone: timezone,
        locale: locale,
      });
    }
  );

  handlebars.registerHelper(
    'getZoneAdjustedDate',
    function (dateString: string) {
      return DateFormatter.getZoneAdjustedDate(dateString, {
        timezone: timezone,
        locale: locale,
      });
    }
  );

  handlebars.registerHelper(
    'getZoneAdjustedTime',
    function (dateString: string) {
      return DateFormatter.getZoneAdjustedTime(dateString, {
        timezone: timezone,
        locale: locale,
      });
    }
  );
};
