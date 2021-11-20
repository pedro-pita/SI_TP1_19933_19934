$(function() {
    const ctx = $('#myChart');
    
    let ajaxData = ajaxRequest('http://localhost/SI/SI_TP1_19933_19934/3_dataTratement/API/info/getPerStateDate.php', {});
    
    let labels = [];
    let datasets = [];
    
    $.each(ajaxData.info, function(key, value) {
        //console.log("key: " + key + " value: " + value.stateCode);

        /*labels.push(value.year + "-" + value.month + "-" + value.dayOfMonth);
        let info = {
            label: value.stateCode,
            data: [55, 124, 5, 9, 5, 6, 35],
            backgroundColor: Math.floor(Math.random()*16777215).toString(16)
        }
        datasets.push(info);*/
    });

    let countryData = [];
    $.each(ajaxData.dates, function(key, value) {
        labels.push(value.date);
        let dataDate = ajaxData.info.filter(function (entry) {
            return entry.dateKeyFK === value.dateKey;
        });
        //console.log(dataDate);
        let countryItem = 0;
        $.each(dataDate, function(index, value) {
            //console.log(value.currentCases);
            countryItem += parseInt(value.currentCases);
        });
        
        countryData.push(countryItem);
        //console.log(countryItem);
    });
    let countryDataChart = {
        type: 'line',
        label: 'USA',
        data: countryData,
        backgroundColor: getRandomColor()
    };
    datasets.push(countryDataChart);
    
    $.each(ajaxData.states, function(key, value) {
        let dataState = ajaxData.info.filter(function (entry) {
            return entry.stateCode === value.stateCode;
        });
        let dataStateDay = [];
        $.each(dataState, function(key, value) {
            dataStateDay.push(value.currentCases);
        });
        let item = {
            type: 'bar',
            label: value.stateCode,
            data: dataStateDay,
            backgroundColor: getRandomColor()
        };
        datasets.push(item);
    });

    /*var stateCodeAK = ajaxData.info.filter(function (entry) {
        return entry.stateCode === 'AK';
    });
    console.log(stateCodeAK);*/

    const DATA_COUNT = 7;

    //const labels = months(7);
    const data = {
        labels: labels,
        /*datasets: [
            {
                label: 'Dataset 1',
                data: [55, 124, 5, 9, 5, 6, 35],
                backgroundColor: '#ff0000',
            },
            {
                label: 'Dataset 2',
                data: [35, 12, 8, 4, 3, 34, 23],
                backgroundColor: '#00ff00',
            },
            {
                label: 'Dataset 3',
                data: [5, 10, 2, 40, 53, 54, 62],
                backgroundColor: '#0000ff',
            },
        ]*/
        datasets: datasets
    };
    
    const config = {
        data: data,
        options: {
            plugins: {
                title: {
                display: true,
                text: 'Current Cases'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                    y: {
                    stacked: false
                }
            }
        }
    };

    const actions = [
        {
            name: 'Randomize',
            handler(chart) {
                chart.data.datasets.forEach(dataset => {
                    dataset.data = [];
                    for (i = 0; i < 6; i++)
                        dataset.data.push(getRndInteger(-100, 100));
                });
                chart.update();
            }
        },
    ];

    const myChart = new Chart(ctx, config, actions);
});

/* This JavaScript function always returns a random number between min and max (both included) */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    
    return color;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function months(number) {
    let data = [];
    for (let i = 0 ; i < number; i++) {
        if (i > 12) {
            number -= 12;
            i = 0;
        }
        data.push(MONTHS[i]);
    }
    return data;   
}

/* 
    Verify if a value is set
*/
function isset(variable) {
    if(typeof(variable) != undefined && variable !== null && variable)
        return true;
    return false;
}

//verifica o tipo de notificação e chama a função que trata de mostrar a notificação
/*function configNotification(data) {
    if(data.status == "error")
        notification(data.status == "error" ? "danger" : "sucess", data.message);
    else
        notification("success", data.message);
}*/

function info(status, message, form){
    var html = '<div class="text-center mt-2">' + 
        '<div class="rounded-pill alert alert-' + ((status == "error") ? "danger" : "success") +'" role="alert">' + 
            message + 
        '</div>' + 
    '</div>';
    form.parent().append(html).children(':last').hide().fadeIn(2000).fadeOut(2000);
}

// Get form data
function getFormData(form, returnType = null){
    let formulario;
    switch (returnType) {
        case "object":
            formulario = JSON.stringify(form.serializeArray());
            break;
        case "array":
            formulario = form.serializeArray();
            break;
        default:
            formulario = form.serialize();
            break;
    }
    
    //let formulario = form.serialize();
    
    console.log(formulario);
    return formulario;
}

// Make an Ajax call
function ajaxRequest(url, data, type="POST") {
    var data;
    $.ajax(
        {
            url: url,
            type: type,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            data: data,
            /*processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType*/
            async: false,
            success:function(response) {
                //console.log(response);
                try {
                    data = JSON.parse(response);
                } catch(err) {
                    data = response;
                }

                console.log(data);
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText);
                console.log(status);
                console.log(error);
            }
        }
    );
    return data;
}