const dateFns = require('date-fns');
const dateFnsTz = require('date-fns-tz');

const date = new Date(Date.UTC(2024, 0, 1, 6));

console.log(
    getDaysInMonthInTimeZone(date, 'America/Los_Angeles') == 31,
    getDaysInMonthInTimeZone(date, 'America/Chicago') == 29,
    getDaysInMonthInTimeZone(date, 'America/Buenos_Aires') == 29
);

function getDaysInMonthInTimeZone(date, timeZone) {
    const lastDayOfMonth = endOfMonthInTimeZone(date, timeZone);
    const lastDayOfMonthAsString = dateFnsTz.formatInTimeZone(lastDayOfMonth, timeZone, 'yyyy-MM-dd');

    const daysInMonthAsString = dateFnsTz.formatInTimeZone(
        lastDayOfMonth,
        timeZone,
        'dd'
    );

    console.log({
        date,
        timeZone,
        lastDayOfMonth,
        lastDayOfMonthAsString,
        daysInMonthAsString
    });

    return parseInt(daysInMonthAsString, 10);
}

function endOfMonthInTimeZone(date, timeZone) {
    const timeZoneDate = dateFnsTz.utcToZonedTime(date, timeZone)
    const timeZoneStartOfMonth = dateFns.endOfMonth(timeZoneDate);
    return dateFnsTz.zonedTimeToUtc(timeZoneStartOfMonth, timeZone);
}