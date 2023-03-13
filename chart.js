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
                const jsonData =  JSON.parse(allText);
                let timeArray = jsonData.imu.map((log)=>log.sampled_at);
                var unique = [];
                timeArray.forEach(element => {
                    if (!unique.includes(element)) {
                        unique.push(element);
                    }
                });
                const imuHeadData = jsonData.imu.filter((sample)=>sample.type == "head");
                const imuTailData = jsonData.imu.filter((sample)=>sample.type == "tail");
                const imuHeadXSamples = imuHeadData.map((sample) => sample.a_x);
                const imuHeadYSamples = imuHeadData.map((sample) => sample.a_y);
                const imuHeadZSamples = imuHeadData.map((sample) => sample.a_z);
                const imuTailXSamples = imuTailData.map((sample) => sample.a_x);
                const imuTailYSamples = imuTailData.map((sample) => sample.a_y);
                const imuTailZSamples = imuTailData.map((sample) => sample.a_z);
                var ctx = document.getElementById('myChart');
                
    console.log("setting chart");
    var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: unique,
        datasets: [
        {
            label: 'Imu head acl X',
            yAxisID: 'A',
            borderColor: 'blue',
            data:imuHeadXSamples,
            fill: false
        },
        {
            label: 'Imu head acl Y',
            yAxisID: 'B',
            borderColor: 'red',
            data: imuHeadYSamples,
            fill: false
        },
        {
            label: 'Imu head acl z',
            yAxisID: 'C',
            borderColor: 'green',
            data: imuHeadZSamples,
            fill: false
        },
        {
            label: 'Imu tail acl X',
            yAxisID: 'D',
            borderColor: 'pink',
            data:imuTailXSamples,
            fill: false
        },
        {
            label: 'Imu tail acl Y',
            yAxisID: 'E',
            borderColor: 'yellow',
            data: imuTailYSamples,
            fill: false
        },
        {
            label: 'Imu tail acl z',
            yAxisID: 'F',
            borderColor: 'gray',
            data: imuTailZSamples,
            fill: false
        }

     ]
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
                        max:2,
                        min:-2,
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
                    max: 2,
                    min: -2
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
                    max: 2,
                    min: -2
                }
                },
                {
                    id: 'D',
                    type: 'linear',
                    position: 'left',
                    ticks:{
                        max:2,
                        min:-2,
                        fontColor:'pink'
                    },
                    borderColor: 'pink',
                },
                {
                    id: 'E',
                    type: 'linear',
                    position: 'left',
                    borderColor: 'yellow',

                ticks: {
                    fontColor:"yelow",
                    max: 2,
                    min: -2
                }
                },
                {
                    // grid: {
                    //     color: '#FF8000'
                    // },
                    id: 'F',
                    type: 'linear',
                    position: 'left',
                    borderColor: 'gray',

                ticks: {
                    fontColor:"gray",
                    max: 2,
                    min: -2
                }
                }
            ]
        },
        
    }
});

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