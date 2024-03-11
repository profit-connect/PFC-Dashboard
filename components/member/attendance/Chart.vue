<template>
  <div class="member-attendance-chart">
    <apexchart
      type="line"
      :options="chartData.options"
      :series="chartData.series"
      height="328"
    ></apexchart>
  </div>
</template>
<script lang="ts" setup>
const chartData = {
  options: {
    chart: {
      id: "attendance-chart",
      toolbar: {
        show: false,
      }
    },

    xaxis: {
      categories: ["W10", "W11", "W12", "W13", "W14"],
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },

    markers: {
      size: 6,
    },
  },
  series: [
    {
      name: "series-1",
      data: [7, 4, 7, 6, 1],
    },
  ],
};
</script>
