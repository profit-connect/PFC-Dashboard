<template>
  <div class="member-common-per-category pb-4">
    <div class="fw-bold mb-4">Per Category</div>
    <apexchart
      type="donut"
      :options="chartData.chartOptions"
      :series="chartData.series"
      width="480"
    >
    </apexchart>
  </div>
</template>
<script lang="ts" setup>
const chartData = {
  series: [7, 3, 6, 6, 3],
  chartOptions: {
    chart: {
      type: "donut",
      fontFamily: "Poppins Regular, sans-serif, Arial" // Apply font family to the overall chart
    },
    labels: [
      "Cardio",
      "Combat",
      "Shape",
      "Strength",
      "No Shows / Cancellations",
    ],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: undefined,
              offsetY: 14,
              formatter: function (val) {
                return val;
              },
            },
            value: {
              show: true,
              fontSize: "28px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 800,
              color: undefined,
              offsetY: -14,
              formatter: function (val) {
                return val;
              },
            },
            total: {
              showAlways: true,
              show: true,
              label: "Bookings",
              fontSize: "12px",
              formatter: function (val) {
                const total = val.config.series.reduce(function (sum, value) {
                  return sum + value;
                });

                return total;
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          legend: {
            position: "bottom",
          },
          chart: {
            width: "320px",
          },
        },
      },
    ],
    legend: {
      position: "right",
      formatter: function (val, opts) {
        const currentValue = opts.w.globals.series[opts.seriesIndex];
        const total = opts.w.globals.series.reduce(function (sum, value) {
          return sum + value;
        });
        return `
        <div class="row py-1">
            <div class="col-8">
                ${val}
            </div>
            <div class="col-2 fw-bold">
                ${currentValue}
            </div>
             <div class="col-2">
                ${((currentValue / total) * 100).toFixed()}%
            </div>
        </div>
        `;
      },
    },
  },
};
</script>

<style lang="scss">
.member-common-per-category {
  background: $main-bg;
  min-height: 240px;
  border-radius: 12px;
  padding: 8px 12px;
  overflow: hidden;
  .vue-apexcharts {
    margin-left: -14px;


    
  }
  .apexcharts-legend-series {
    position: relative;
    bottom: 25px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .apexcharts-legend-text {
    width: 60%;
   
  }
  .apexcharts-legend {
    // overflow: auto;
    overflow: visible !important; 
    @media (max-width: 1200px) {
      display: block;
    }
  }
  
}
legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {
    justify-content: flex-start;
    bottom: 24px;
}
</style>
