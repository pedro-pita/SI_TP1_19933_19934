$(function() {
    const ctx = $('#myChart');
    
    let ajaxData = ajaxRequest('../../API/info/getPerStateDate.php', {});
    console.log(ajaxData);

    const DATA_COUNT = 7;

    const labels = months(7);
    const data = {
        labels: labels,
        datasets: [
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
        ]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                    y: {
                    stacked: true
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