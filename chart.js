//const { Chart } = require('electron-chartjs');
var ctx = document.getElementById("myChart");
let jsonData = null;
console.log("setting chart");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",
  // The data for our dataset
  data: {},
  // Configuration options go here
  options: {
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            parser: "mm:ss.SSS",
            tooltipFormat: "mm:ss.SSS",
            displayFormats: {
              millisecond: "mm:ss.SSS",
            },
          },
          ticks: {
            autoSkip: true,
            source: "labels",
            // maxRotation: 0,
            // autoSkipPadding: 10,
          },
        },
      ],
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "y",
        },
        zoom: {
          enabled: true,
          mode: "y",
          wheel: {
            modifierKey: "ctrl",
            enabled: true,
            speed: 0.9,
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: false,
  },
});

const resetZoom = function () {
  window.chart.resetZoom();
};

const setModifiers = function () {
  const minTimeInput = document.getElementById("min_time");
  const maxTimeInput = document.getElementById("max_time");
  console.log(minTimeInput.value);
  console.log(maxTimeInput.value);
  let timeArray = jsonData.imu.map((log) => log.sampled_at);
  let timeValues = [];
  console.log(jsonData);

  //Inserta las marcas de tiempo sin repetirlas
  timeArray.forEach((element) => {
    if (!timeValues.includes(element)) {
      timeValues.push(element);
    }
  });

  //Filtrado de head y tail
  let imuHeadData = jsonData.imu.filter((sample) => sample.type == "head");
  let imuTailData = jsonData.imu.filter((sample) => sample.type == "tail");

  // Verifica si existen los valores a filtrar
  if (minTimeInput.value && maxTimeInput.value) {
    if (parseInt(minTimeInput.value) > parseInt(maxTimeInput.value)) {
      alert("Valor minimo de tiempo debe ser menor al valor maximo de tiempo");
      return;
    }

    // Se filtra a si mismo
    timeValues = timeValues.filter(
      (time) => parseInt(time) >= parseInt(minTimeInput.value)
    );
    timeValues = timeValues.filter(
      (time) => parseInt(time) <= parseInt(maxTimeInput.value)
    );
    console.log("mayores a :", minTimeInput.value, " ", timeValues);
    console.log("menores a :", maxTimeInput.value, " ", timeValues);

    imuHeadData = imuHeadData.filter(
      (sample) =>
        parseInt(sample.sampled_at) >= parseInt(minTimeInput.value) &&
        parseInt(sample.sampled_at) <= parseInt(maxTimeInput.value) == true
    );
    imuTailData = imuTailData.filter(
      (sample) =>
        parseInt(sample.sampled_at) >= parseInt(minTimeInput.value) &&
        parseInt(sample.sampled_at) <= parseInt(maxTimeInput.value) == true
    );
  }

  console.log("imu head valid data:", imuHeadData);
  //Samples de head
  const imuHeadXSamples = imuHeadData.map((sample) => sample.a_x);
  const imuHeadYSamples = imuHeadData.map((sample) => sample.a_y);
  const imuHeadZSamples = imuHeadData.map((sample) => sample.a_z);
  //Samples de tail
  const imuTailXSamples = imuTailData.map((sample) => sample.a_x);
  const imuTailYSamples = imuTailData.map((sample) => sample.a_y);
  const imuTailZSamples = imuTailData.map((sample) => sample.a_z);
  chart.data.labels = timeValues;
  console.log(imuHeadXSamples);
  chart.data.datasets = [
    {
      label: "Imu head acl X",
      borderColor: "blue",
      data: imuHeadXSamples,
      fill: false,
    },
    {
      label: "Imu head acl Y",
      borderColor: "red",
      data: imuHeadYSamples,
      fill: false,
    },
    {
      label: "Imu head acl z",
      borderColor: "green",
      data: imuHeadZSamples,
      fill: false,
    },
    {
      label: "Imu tail acl X",
      borderColor: "pink",
      data: imuTailXSamples,
      fill: false,
    },
    {
      label: "Imu tail acl Y",
      borderColor: "yellow",
      data: imuTailYSamples,
      fill: false,
    },
    {
      label: "Imu tail acl z",
      borderColor: "gray",
      data: imuTailZSamples,
      fill: false,
    },
  ];
  chart.update();
  resetZoom(); //Ajusta el zoom respecto a los nuevos datos
};

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        jsonData = JSON.parse(allText);
        let timeArray = jsonData.imu.map((log) => log.sampled_at);
        var unique = [];
        timeArray.forEach((element) => {
          if (!unique.includes(element)) {
            unique.push(element);
          }
        });
        const imuHeadData = jsonData.imu.filter(
          (sample) => sample.type == "head"
        );
        const imuTailData = jsonData.imu.filter(
          (sample) => sample.type == "tail"
        );

        // los datos se almacenan como coordenadas, donde 'x' son los milisegundos cuando se capturó y 'y' son los datos del sensor
        const imuHeadXSamples = imuHeadData.map((sample) => ({
          x: sample.sampled_at,
          y: sample.a_x,
        }));
        const imuHeadYSamples = imuHeadData.map((sample) => ({
          x: sample.sampled_at,
          y: sample.a_y,
        }));
        const imuHeadZSamples = imuHeadData.map((sample) => ({
          x: sample.sampled_at,
          y: sample.a_z,
        }));
        const imuTailXSamples = imuTailData.map((sample) => ({
          x: sample.sampled_at,
          y: sample.a_x,
        }));
        const imuTailYSamples = imuTailData.map((sample) => ({
          x: sample.sampled_at,
          y: sample.a_y,
        }));
        const imuTailZSamples = imuTailData.map((sample) => ({
          x: sample.sampled_at,
          y: sample.a_z,
        }));

        var ctx = document.getElementById("myChart");
        console.log(ctx.value);
        // chart.data.labels = unique;
        chart.data.labels = labelGenerator(0, Math.max(...unique));
        chart.data.datasets = [
          {
            label: "Imu head acl X",
            borderColor: "blue",
            data: imuHeadXSamples,
            fill: false,
          },
          {
            label: "Imu head acl Y",
            borderColor: "red",
            data: imuHeadYSamples,
            fill: false,
          },
          {
            label: "Imu head acl z",
            borderColor: "green",
            data: imuHeadZSamples,
            fill: false,
          },
          {
            label: "Imu tail acl X",
            borderColor: "pink",
            data: imuTailXSamples,
            fill: false,
          },
          {
            label: "Imu tail acl Y",
            borderColor: "yellow",
            data: imuTailYSamples,
            fill: false,
          },
          {
            label: "Imu tail acl z",
            borderColor: "gray",
            data: imuTailZSamples,
            fill: false,
          },
        ];

        chart.update();
        console.log("setting chart");
      }
    }
  };
  rawFile.send(null);
}

const fileUploaded = async function () {
  console.log("file uploaded...");
  const filePath = document.getElementById("file_input").files[0];
  console.log("-------------", filePath);
  readTextFile("file:///" + filePath.path);
};

const labelGenerator = function (minNumber, maxNumber) {
  const labelsArr = [];
  let step = 100;
  // Se redondea el numero al multiplo de 100 mas cercano
  minNumber = Math.floor(minNumber / 100) * 100;
  maxNumber = Math.ceil(maxNumber / 100) * 100;

  for (let number = minNumber; number < maxNumber; number += step) {
    labelsArr.push(number);
  }

  return labelsArr;
};
