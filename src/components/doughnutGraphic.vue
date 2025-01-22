<template>
  <div class="chartContainer">
    <canvas ref="doughnutGraphic"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
  export default{
    name: 'DoughnutGraphic',
    data() {
      return{
        flagChart: null,
      }
    },

    mounted(){
      Chart.register(...registerables);
      const data ={
        labels:["Bitcoin","Ethereum", "Tether USDT", "Avalanche", "DogeCoin", "Bitcoin Cash"],
        datasets:[
          {
            label: "Monto total",
            data:[10, 12, 22, 20, 11, 25],
            backgroundColor: [
              "rgba(247, 147, 26, 0.7)",
              "rgba(24, 174, 246, 0.7)",
              "rgba(17, 124, 92, 0.7)",
              "rgba(247, 13, 13, 0.7)",
              "rgba(218, 207, 54, 0.7)",
              "rgba(57, 197, 111, 0.7)"
            ],
            borderColor: [
              "rgba(247, 147, 26, 1)",
              "rgba(24, 174, 246, 1)",
              "rgba(17, 124, 92, 1)",
              "rgba(247, 13, 13, 1)",
              "rgba(218, 207, 54, 1)",
              "rgba(57, 197, 111, 1)"
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
            display: true,
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
          },
        },
        cutout: "30%",
      };
      const ctx = this.$refs.doughnutGraphic.getContext("2d");
      this.chartInstance = new Chart(ctx, {type: "doughnut", data: data, options: options});
      },

      methods: {
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