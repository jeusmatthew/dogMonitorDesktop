    const data = null;

if(data == null){
    const chart = document.getElementById("myChart");
    //chart.hidden = "hidden";
}
//const { Chart } = require('electron-chartjs');
var ctx = document.getElementById('myChart');
console.log("setting chart");
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //     {
    //         label: 'Sensor1',
    //         yAxisID: 'A',
    //         borderColor: 'blue',
    //         data: [0, 10, 5],
    //         fill: false
    //     },
    //     {
    //         label: 'Sensor2',
    //         yAxisID: 'B',
    //         borderColor: 'red',
    //         data: [12, 10, 5, 9, 2, 12, 25],
    //         fill: false
    //     },
    //     {
    //         label: 'Sensor3',
    //         yAxisID: 'C',
    //         borderColor: 'green',
    //         data: [12, 22, 29, 39, 23, 12, 25],
    //         fill: false
    //     }

    // ]
    },

    // Configuration options go here
    options: {
        plugins:{
            zoom:{
                zoom:{
                    enabled:true,
                    wheel: {
                        enabled: true,
                    },
                }
            }
        },
        maintainAspectRatio:false,
        responsive: true,
        scales:{
            yAxes: 
            [
                {
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks:{
                        max:100,
                        min:-100,
                        fontColor:'blue'
                    },
                    borderColor: 'blue',
                },
                {
                    id: 'B',
                    type: 'linear',
                    position: 'left',
                    borderColor: 'red',

                ticks: {
                    fontColor:"red",
                    max: 500,
                    min: -500
                }
                },
                {
                    // grid: {
                    //     color: '#FF8000'
                    // },
                    id: 'C',
                    type: 'linear',
                    position: 'left',
                    borderColor: 'green',

                ticks: {
                    fontColor:"green",
                    max: 50,
                    min: -50
                }
                }
            ]
        },
        
    }
});

const resetZoom = function() {
        window.chart.resetZoom();
};

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                const 
            }
        }
    }
    rawFile.send(null);
}

const fileUploaded =async  function () {
    console.log("file uploaded...");
    const filePath =  document.getElementById("file_input").files[0];
    console.log("-------------",filePath);
    readTextFile("file:///"+filePath.path);
}