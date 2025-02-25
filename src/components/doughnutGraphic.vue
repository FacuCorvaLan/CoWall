<template>
  <div class="chartContainer">
    <canvas ref="doughnutGraphic"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { amountCryptos } from '../Methods/cryptosAmount';
import { formatARS } from '../Methods/FormatData';

  export default{
    name: 'DoughnutGraphic',
    data() {
      return{
        userData: {}
      }
    },

    mounted(){
      this.userData = amountCryptos(this.$store.getters.getHistoryUser);
      Chart.register(...registerables);
      const data ={
        labels:["Bitcoin","Ethereum", "Tether USDT", "DogeCoin","Ripple", "Cardano"],
        datasets:[
          {
            label: "Monto total",
            data:[this.userData.BTC.amount,
                  this.userData.ETH.amount, 
                  this.userData.USDT.amount, 
                  this.userData.DOGE.amount, 
                  this.userData.XRP.amount, 
                  this.userData.ADA.amount],
            backgroundColor: [
              "rgba(247, 147, 26, 0.7)",
              "rgba(24, 174, 246, 0.7)",
              "rgba(17, 124, 92, 0.7)",
              "rgba(218, 207, 54, 0.7)",
              "rgba(0, 0, 0, 0.719)",
              "rgb(16, 16, 236)"
            ],
            borderColor: [
              "rgb(247, 147, 26)",
              "rgb(24, 174, 246)",
              "rgb(17, 124, 92)",
              "rgb(218, 207, 54)",
              "rgb(0, 0, 0)",
              "rgb(16, 16, 236)"
            ],
            borderWidth: 1.7,
          }
        ]
      };
      const options= {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: data.datasets[0].data.some(value => value > 0),
            position: "bottom",
            labels: { 
              font: {
                family: "Inria Sans",
                size: 16,
                weight: "bolder",
              },
              color: "black",
              padding: 8,
              boxWidth: 20,
              boxHeight: 10,
            },      
          },
          tooltip: {
            enabled: true,
            callbacks: {
            label: (selectedItem) => {
              const codeValues = ["BTC", "ETH", "USDT", "DOGE", "XRP", "ADA"];
              const cryptoCode = codeValues[selectedItem.dataIndex]; 
              const amount = selectedItem.raw; 
              const quoteARS = this.userData[cryptoCode]?.moneyARS || 0; 
              const moneyARS = quoteARS; 

              return [
                `Monto total: ${parseFloat(amount)} ${cryptoCode}`,
                `Monto en ARS: ${formatARS(moneyARS.toFixed(2))}`,
              ];
            },
          },
        }
      },
      cutout: "30%",
      };
      const ctx = this.$refs.doughnutGraphic.getContext("2d");
      this.chartInstance = new Chart(ctx, {type: "doughnut", data: data, options: options});
      },

      methods: {
        amountCryptos,
        beforeUnmount() { 
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
        }
      }     
  };
</script>
<style scoped>
  .chartContainer {
    width: 330px; 
    height: 350px; 
    margin: auto;
    position: relative; 
  }

  canvas {
    width: 100%; 
    height: 100%; 
  }
</style>