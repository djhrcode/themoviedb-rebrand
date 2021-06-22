import dayjs from "dayjs";
import CalendarPlugin from "dayjs/plugin/calendar"

dayjs.extend(CalendarPlugin);

/**
 * @typedef {string|number|Date} DateValue
 */

/**
 * @param {DateValue} date
 */
export const formatDate = (date) => dayjs(date).format("MMMM D, YYYY");

/**
 * @param {DateValue} date
 */
export const resolveDateYear = (date) => dayjs(date).year();
