const arr = [{date: '10.01.2017'}, {date: '05.11.2016'}, {date: '21.13.2002'}];


/**
 * Sorting an array with date object in ascending or descending order
 * 
 * @param {{date: string}[]} dates - List of dates
 * @param {boolean} inAscendingOrder - Sort in ascending order ?
 */
function sortDates(dates, inAscendingOrder) {
    return dates
            .filter((date) => {
                const [ day, month, year ] = date.date.split('.').map((value) => +value);
                const newDate = new Date(year, month - 1, day);
            
                return day === newDate.getDate() && month === newDate.getMonth() + 1 && year === newDate.getFullYear();
            })
            .sort((a, b) => {
                const [ firstDay, firstMonth, firstYear ] = a.date.split('.').map((value) => +value);
                const firstDate = new Date(firstYear, firstMonth - 1, firstDay);
                const [ secondDay, secondMonth, secondYear ] = b.date.split('.').map((value) => +value);
                const secondDate = new Date(secondYear, secondMonth - 1, secondDay);

                return inAscendingOrder ? firstDate - secondDate : secondDate - firstDate;
            });
}