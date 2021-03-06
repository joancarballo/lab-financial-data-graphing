const dateFromNav = document.querySelector("#dateFrom");
const dateToNav = document.querySelector("#dateTo");
const currencyNav = document.querySelector("#currency");
const maxPrice = document.getElementById("maxPrice");
const minPrice = document.getElementById("minPrice");

// Inicializo la grafica para poder destruirla más abajo muahaha
let myChart;

function theChart() {
  const dateFrom = dateFromNav.value;
  const dateTo = dateToNav.value;
  const currency = currencyNav.value;

  // Creo la constante CoinCallURL para poder meterle los datos que vienen del DOM
  const CoinCallURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`;

  // Llamo a la API con los valores de los imput (que tienen valores por defecto)

  function getDataPrintChart(currency) {
    axios
      .get(CoinCallURL)
      .then(responseCoin => {
        printChart(responseCoin.data, currency); // Llamo a la función que dibuja la gráfica porque meterlo todo aquí es un lío de la leche
      })
      .catch(err => {
        console.log("Error recibiendo los datos: ", err);
      });
  }

  // Pinto la gráfica

  function printChart(data, currency) {
    const ctx = document.getElementById("myChart").getContext("2d");

    const dayData = data["bpi"]; // Los datos están dentro de un objeto llamado bpi fecha:precio
    const priceDate = Object.keys(dayData); // Saco la fecha que es la key de cada cosa para usarla de labels
    const price = Object.values(dayData); // Saco el precio que es el value de cada cosa para usarla en data
    maxPrice.innerHTML = Math.max(...price) + ' ' + currency;
    minPrice.innerHTML = Math.min(...price) + ' ' + currency;


    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: priceDate,
        datasets: [
          {
            label: "BTC",
            backgroundColor: "rgb(68, 166, 199)",
            borderColor: "rgb(103, 199, 68)",
            fill: false,
            data: price
          }
        ]
      }
    });
  }

  // Llamo a getDataPrintChart para que pida los datos y los pinte
  getDataPrintChart(currency);
}

// Escucho cambios en los datos en el DOM del navegador
dateFromNav.addEventListener("change", () => {
  myChart.destroy();
  theChart();
});

dateToNav.addEventListener("change",  () => {
  myChart.destroy();
  theChart();
});

currencyNav.addEventListener("change",  () => {
  myChart.destroy();
  theChart();
});

// Pinto la gráfica por primera vez
theChart();
