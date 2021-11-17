const fs = require('fs');

//ENTRADA
let data = JSON.parse(fs.readFileSync('./ExportedData/data_US_counties_daily.json'));
let dates = {dates:[]};
let end_date = new Date(data[49]["actualsTimeseries"][data[49]["actualsTimeseries"].length-1]["date"]);
let start_date = new Date(data[49]["actualsTimeseries"][0]["date"]);
let diffDays = Math.ceil(Math.abs(end_date - start_date) / (1000 * 60 * 60 * 24)); 
let current_date = start_date;
let locale = "en-US";
//TRATAMENTO
for(var i = 0; i < diffDays; i++){
    if(current_date.getTime() != end_date.getTime())
        dates.dates.push({
            dateKey: current_date.toISOString().split('T')[0].replaceAll("-",""),
            date: current_date.toISOString().split('T')[0],
            year: current_date.getFullYear(),
            month: current_date.getMonth() + 1,
            monthName: current_date.toLocaleString(locale, { month: 'long' }),
            dayOfMonth: current_date.getDate(),
            dayOfWeek: current_date.getDay(),
            dayOfWeekName: current_date.toLocaleDateString(locale, { weekday: 'long' })
        });
    else
        break;
    current_date = new Date(current_date.getTime()+1000*60*60*24);
}
//console.log(dates)
//SAIDA
console.log(end_date)
fs.writeFile('./TreatedData/dates.json', JSON.stringify(dates), (err, result) => console.log("done"));

/*
{
   "dates":[
      {
        "dateKey": int,
        "date": date,
        "year": int,
        "month": int,
        "monthName": string,
        "dayOfMonth": int,
        "dayOfWeek": int,
        "dayName": string
      },
      {
        "dateKey": int,
        "date": date,
        "year": int,
        "month": int,
        "monthName": string,
        "dayOfMonth": int,
        "dayOfWeek": int,
        "dayName": string
      }
   ]
}
*/
