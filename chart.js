//const { Chart } = require('electron-chartjs');
var ctx = document.getElementById('myChart');
let jsonData=null;
console.log("setting chart");
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
    responsive:false,
    maintainAspectRatio:false,
    // The data for our dataset
    data: {
    },
    // Configuration options go here
    options: {
        plugins:{
            zoom:{
                zoom:{
                    enabled:true,
                    wheel: {
                        modifierKey:"ctrl",
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

const setModifiers = function(){
    const minTimeInput = document.getElementById("min_time");
    const maxTimeInput = document.getElementById("max_time");
    console.log(minTimeInput.value);
    console.log(maxTimeInput.value);
    let timeArray = jsonData.imu.map((log)=>log.sampled_at);
    var unique = [];
    console.log(jsonData);
    timeArray.forEach(element => {
        if (!unique.includes(element)) {
            unique.push(element);
        }
    });
    if(minTimeInput.value && maxTimeInput.value){
        if(parseInt(minTimeInput.value)>parseInt(maxTimeInput.value)){
            alert("Valor minimo de tiempo debe ser menor al valor maximo de tiempo")
        }
    }
    
    let timeValues = unique;
    if(minTimeInput.value){
        timeValues = timeValues.filter(time => parseInt(time) >= parseInt(minTimeInput.value))
    }
    console.log("mayores a :",minTimeInput.value," ",timeValues);
    if(maxTimeInput.value){
        timeValues = timeValues.filter(time => parseInt(time) <= parseInt(maxTimeInput.value))
    }
    console.log("menores a :",maxTimeInput.value," ",timeValues);

    // filter values
    const imuHeadData = jsonData.imu.filter((sample)=>sample.type == "head");
    const imuTailData = jsonData.imu.filter((sample)=>sample.type == "tail");
    const imuHeadValidData = imuHeadData.filter((sample)=> (parseInt(sample.sampled_at) > parseInt(minTimeInput.value)) && (parseInt(sample.sampled_at) < parseInt(maxTimeInput.value)) == true)
    const imuTailValidData = imuTailData.filter((sample)=> (parseInt(sample.sampled_at) > parseInt(minTimeInput.value)) && (parseInt(sample.sampled_at) < parseInt(maxTimeInput.value)) ==true)
    console.log("imu head valid data:",imuHeadValidData);
    const imuHeadXSamples = imuHeadValidData.map((sample) => sample.a_x);
    const imuHeadYSamples = imuHeadValidData.map((sample) => sample.a_y);
    const imuHeadZSamples = imuHeadValidData.map((sample) => sample.a_z);
    const imuTailXSamples = imuTailValidData.map((sample) => sample.a_x);
    const imuTailYSamples = imuTailValidData.map((sample) => sample.a_y);
    const imuTailZSamples = imuTailValidData.map((sample) => sample.a_z);
    chart.data.labels = timeValues;
    console.log(imuHeadXSamples);
    chart.data.datasets =  [
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

     ];
    chart.update();

}

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
                jsonData =  JSON.parse(allText);
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
                
                let imuHeadAllValues = [];
                imuHeadAllValues = imuHeadAllValues.concat(imuHeadXSamples)
                imuHeadAllValues = imuHeadAllValues.concat(imuHeadYSamples)
                imuHeadAllValues = imuHeadAllValues.concat(imuHeadZSamples)

                let imuTailAllValues = [];
                imuTailllValues = imuTailAllValues.concat(imuTailXSamples)
                imuTailAllValues = imuTailAllValues.concat(imuTailYSamples)
                imuTailAllValues = imuTailAllValues.concat(imuTailZSamples)
                const allValues = imuHeadAllValues.concat(imuTailAllValues);
                console.log("all :",allValues);
                const maxValue = Math.max(...allValues);
                console.log("max: ",maxValue);
                const minValue = Math.min(...allValues);
                console.log("min: ",minValue);
                
                console.log(minValue,maxValue);

                var ctx = document.getElementById('myChart');
                console.log(ctx.value);
                chart.data.labels =unique;
                chart.data.datasets =  [
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
                    
                         ];
                chart.options = {
                            animation:false,
                            plugins:{
                                zoom:{
                                    zoom:{
                                        enabled:true,
                                        wheel: {
                                            modifierKey:"ctrl",
                                            enabled: true,
                                            speed:0.9
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
                                            max:maxValue,
                                            min:minValue,
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
                                        max: maxValue,
                                        min:    minValue
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
                                        max: maxValue,
                                        min: minValue
                                    }
                                    },
                                    {
                                        id: 'D',
                                        type: 'linear',
                                        position: 'left',
                                        ticks:{
                                            max:maxValue,
                                            min:minValue,
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
                                        max:maxValue,
                                        min:minValue
                                    }
                                    },
                                    {
                                        id: 'F',
                                        type: 'linear',
                                        position: 'left',
                                        borderColor: 'gray',
                    
                                    ticks: {
                                        fontColor:"gray",
                                        max: maxValue,
                                        min: minValue
                                    }
                                    }
                                ]
                            }
                        }
                            
                    chart.update();             
    console.log("setting chart");
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