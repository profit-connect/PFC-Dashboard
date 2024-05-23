<template>
    <div>
      <vue-cal
        :time="true"
        :selected-date.sync="selectedDate"
        @view-change="onViewChange"
        :events="events"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  
  const selectedDate = ref(new Date());
  const events = ref([
    {
      start: '2024-03-05 10:00',
      end: '2024-03-05 11:00',
      title: 'Meeting with Team',
    },
    {
      start: '2024-03-06 14:00',
      end: '2024-03-06 15:00',
      title: 'One-on-One Coaching',
    },
  ]);
  
  const onViewChange = (newView) => {
    console.log(newView);
  };
  </script>
  
  <style scoped>
  .vuecal__cell {
    border: 1px solid #dfe6f0;
  }
  </style>
  