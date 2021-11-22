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
var states = {states:[]};
//TRATAMENTO
for(var i in data) {
    states.states.push({
        stateCode: data[i]["state"],
        name: covertShortToName(data[i]["state"]),
        fips: data[i]["fips"],
        population: data[i]["population"],
        //locationIso2: data[i]["locationId"].split("#")[1].replaceAll("iso2:",""),
        countryCode: "US",
        countryName: "United States"
    });
}

function covertShortToName(short_state){
    let all_states = ["Alaska","Alabama","Arkansas","American Samoa","Arizona","California","Colorado","Connecticut","District of Columbia","Delaware","Florida","Georgia","Guam","Hawaii","Iowa","Idaho","Illinois","Indiana","Kansas","Kentucky","Louisiana","Massachusetts","Maryland","Maine","Michigan","Minnesota","Missouri","Mississippi","Montana","North Carolina"," North Dakota","Nebraska","New Hampshire","New Jersey","New Mexico","Nevada","New York","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Virginia","Virgin Islands","Vermont","Washington","Wisconsin","West Virginia","Wyoming"];
    let abv_states = [ "AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]
    for(var i = 0; i < all_states.length; i++)
        if(abv_states[i] == short_state)
            return all_states[i];
    return short_state;
}

//SAIDA
fs.writeFile('./TreatedData/states.json', JSON.stringify(states), (err, result) => console.log("done"));

/*
{
   "states":[
      {
        "stateCode": string,
        "name": string,
        "fips": int
        "population": int
        "countryCode": string
        "countryName": string
      },
      {
        "stateCode": string,
        "name": string,
        "fips": int
        "population": int
        "countryCode": string
        "countryName": string
      }
   ]
}
*/
