const fs = require('fs');

//1º Perceber qual é a estrutura dos dados
/*
fips
country
state
county
level
lat
locationId
long
population
metrics
riskLevels
cdcTransmissionLevel
actuals
annotations
lastUpdatedDate
url
metricsTimeseries (per day)
    {
        testPositivityRatio: 0.054,
        caseDensity: 5.1,
        contactTracerCapacityRatio: 0.27,
        infectionRate: 1.07,
        infectionRateCI90: 0.1,
        icuCapacityRatio: null,
        date: '2020-05-14'
    }
actualsTimeseries (per day)
    {
        cases: 514353,
        deaths: 10638,
        positiveTests: 527609,
        negativeTests: 3775491,
        contactTracers: 404,
        hospitalBeds: { capacity: 15299, currentUsageTotal: 10386, currentUsageCovid: 411 },
        icuBeds: { capacity: 1620, currentUsageTotal: 1238, currentUsageCovid: 119 },
        newCases: 109,
        newDeaths: 1,
        vaccinesDistributed: 2892950,
        vaccinationsInitiated: 1248029,
        vaccinationsCompleted: 711596,
        vaccinesAdministered: 1864857,
        vaccinesAdministeredDemographics: null,
        vaccinationsInitiatedDemographics: null,
        date: '2021-04-05'
    }
riskLevelsTimeseries (per day)
    { 
        overall: 1, 
        caseDensity: 1, 
        date: '2021-04-05' 
    }
cdcTransmissionLevelTimeseries (per day)
    { 
        date: '2021-04-05', 
        cdcTransmissionLevel: 1 
    }
*/
//ENTRADA
var data = JSON.parse(fs.readFileSync('./ExportedData/data_US_counties_daily.json'));
var information = {information: {}};
//TRATAMENTO
for(var i in data) {
    var stateDate = Object();
    for(var j in data[i]["actualsTimeseries"]){
        var aux = data[i]["actualsTimeseries"][j];
        var date = aux["date"];
        stateDate[date] = {
            dateKeyFK: date.replaceAll("-",""),
            stateCodeFK: data[i]["state"],
            transmissionLevelFK: data[i]["cdcTransmissionLevel"],
            riskLevelFK: data[i]["riskLevels"]["overall"],
            currentCases: checkValue(aux["cases"]),
            currentDeaths: checkValue(aux["deaths"]),
            newCases: checkValue(aux["newCases"]),
            newDeaths: checkValue(aux["newDeaths"]),
            contactTracers: checkValue(aux["contactTracers"]),
            testsPositives: checkValue(aux["positiveTests"]),
            testsNegatives: checkValue(aux["negativeTests"]),
            vaccinesDistributed: checkValue(aux["vaccinesAdministered"]),
            vaccinesAdministered: checkValue(aux["vaccinesAdministered"]),
            vaccinesCompleted: checkValue(aux["vaccinationsCompleted"]),
            hospitalCapacity: checkValue(aux["hospitalBeds"]["capacity"]),
            hospitalCurrentUsageTotal: checkValue(aux["hospitalBeds"]["currentUsageTotal"]),
            hospitalCurrentUsageCovid: checkValue(aux["hospitalBeds"]["currentUsageCovid"])
        }
    }
    information.information[data[i]["state"]] = stateDate;
}

function checkValue($value){
    if($value == null || $value === undefined || $value === ""){
        return null;
    }
    return $value;
}
//SAIDA
fs.writeFile('./TreatedData/information.json', JSON.stringify(information), (err, result) => console.log("done"));

/*
{
   "information":{
        "AK":{
            "2020-01-21":{
                "current_cases":"int",
                "current_deaths":"int",
                "positiveTests":"int",
                "negativeTests":"int",
                "newCases":"int",
                "newDeaths":"int",
                "contactTracers":"int",
                "testsPositives":"int",
                "testsNegatives":"int",
                "vaccinesDistributed":"int",
                "vaccinesAdministered":"int",
                "vaccinesCompleted":"int",
                "hospitalCapacity":"int",
                "hospitalCurrentUsageTotal":"int",
                "hospitalCurrentUsageCovid":"int",
                "dateKeyFK":"int",
                "stateCodeFK":"string",
                "trasmissionLevelFK":"int",
                "riskLevelFK":"int"
            },
            "2020-01-22":{
                "current_cases":"int",
                "current_deaths":"int",
                "positiveTests":"int",
                "negativeTests":"int",
                "newCases":"int",
                "newDeaths":"int",
                "contactTracers":"int",
                "testsPositives":"int",
                "testsNegatives":"int",
                "vaccinesDistributed":"int",
                "vaccinesAdministered":"int",
                "vaccinesCompleted":"int",
                "hospitalCapacity":"int",
                "hospitalCurrentUsageTotal":"int",
                "hospitalCurrentUsageCovid":"int",
                "dateKeyFK":"int",
                "stateCodeFK":"string",
                "trasmissionLevelFK":"int",
                "riskLevelFK":"int"
            }
        }
   }
}
*/
