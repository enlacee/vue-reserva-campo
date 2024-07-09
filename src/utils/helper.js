/**
 * Get 24 hours format to printed
 * 
 * @param {integer} hour 
 * @returns string date in 24hours format
 */
export function get24HoursFormatFromNumber(hour){
    return hour.toString().padStart(2, '0') + ':00';
};