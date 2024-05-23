<template>
  <div class="top-heading d-flex align-items-center">
    <h1>Staff Roster</h1>
    <MixButton
      disableIcon
      variant="top-btn top-week-btn"
      size="sm"
      label="Week"
    />
    <MixButton
      disableIcon
      variant="top-btn top-mon-btn"
      size="sm"
      label="Month"
    />
    <span class="calendarBtn" @click="calendarViewClick">
      <img
        v-if="!isCalenderView"
        style="position: relative; left: 0px"
        src="~assets/images/svg/calendars.svg"
        alt="Link to month view"
      />
      <img
        v-else
        style="position: relative; left: 0px"
        src="~assets/images/svg/calendars-dark.svg"
        alt="Link to month view"
      />
    </span>
    <MixButton
      disableIcon
      variant="top-btn top-pub-btn"
      size="sm"
      label="Publish"
    />
  </div>

  <div v-if="!isCalenderView" class="custom-rates">
    <p class="small-title-medium">Custom Rates</p>
    <div class="rates-btn d-flex align-items-center" ref="el1">
      <div v-for="(item, index) in list1" :key="index">
        <MixButton
          disableIcon
          :variant="`rate-btn ${item.color}`"
          size="sm"
          :label="item.name"
          :time="item.time"
        />
      </div>
    </div>
  </div>
  <div class="month-view">
    <div class="flex">
      <section v-if="isCalenderView === false">
        <div class="day-time-slots">
          <div style="display: flex; justify-content: space-between">
            <div
              v-for="l in timing_hourse"
              :key="l"
              style="width: 39px; font-size: 10px; position: relative"
              class="day-time"
            >
              {{ l }}
            </div>
          </div>
        </div>
        <div class="day-view-top">
          <div class="day-view">
            <p class="date">March 4<sup>th</sup></p>
            <p class="day">Monday</p>
            <div class="staff-name">
              <!-- <div class="staff-list">
                                <span class="icon">&times;</span>
                                <span name="name">Ricardo</span>
                            </div> -->
              <div class="custom-roster-wrapper">
                <span
                 class="add-button"
                  >Add</span
                >
                <FormKit
                  type="multiselect"
                  mode="tags"
                  :options="['Ashby ', 'Clayton', 'Kristoff','Ashby 1', 'Clayton1', 'Kristoff1']"
                />
              </div>
            </div>
            <!-- <div class="addBtn">
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg></span>
                            <span>Add</span>
                        </div> -->
          </div>
          <div class="timings" :class="[coachClick ? 'isBorder' : '']">
            <div style="display: flex; justify-content: space-between">
              <div
                v-for="l in 18"
                :key="l"
                style="width: 39px; height: 30px"
              ></div>
            </div>
            <div ref="el2">
              <div v-for="item in list2" :key="item.id">
                <div style="display: flex; justify-content: space-between">
                  <div
                    v-for="l in 18"
                    :key="l"
                    style="width: 39px; height: 30px"
                  ></div>
                </div>
              </div>
            </div>
            <div class="expand-sec" v-if="coachClick">
              <p>6am - 11pm</p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
                  />
                </svg>
              </p>
            </div>
            <div class="split-sec" v-if="coachClick">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                  />
                </svg>
              </p>
              <p>Split Timing</p>
            </div>
          </div>
          <div class="act-btn" v-if="coachClick === false">
            <button @click="openActionsMethod" v-if="actBtnRef">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512">
                <path
                  d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
                />
              </svg>
            </button>
            <ul v-if="actBtns">
              <li @click="editSlotMethod">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  />
                </svg>
                Edit
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M104.6 48H64C28.7 48 0 76.7 0 112V384c0 35.3 28.7 64 64 64h96V400H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H80c0 17.7 14.3 32 32 32h72.4C202 108.4 227.6 96 256 96h62c-7.1-27.6-32.2-48-62-48H215.4C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48zM144 56a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM448 464H256c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16l140.1 0L464 243.9V448c0 8.8-7.2 16-16 16zM256 512H448c35.3 0 64-28.7 64-64V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64z"
                  />
                </svg>
                Apply to all Mondays
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"
                  />
                </svg>
                Copy
              </li>
              <li @click="closeActionsMethod">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
                Clear
              </li>
            </ul>
          </div>
          <div class="save-btn" v-if="coachClick">
            <MixButton
              disableIcon
              variant="top-btn top-pub-btn saveBtn"
              size="sm"
              label="Save"
            />
          </div>
        </div>
      </section>
    </div>
    <RosterMonthRoster v-if="isCalenderView" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDraggable } from "vue-draggable-plus";
const emit = defineEmits(["sidebar-month-view"]);

const list1 = ref([
  {
    name: "Meeting",
    color: "orange",
    time: "4h",
  },
  {
    name: "Lead Coach",
    color: "green",
    time: "7h",
  },
  {
    name: "Support Coach",
    color: "pink",
    time: "2h",
  },
  {
    name: "Fixed",
    color: "blue",
    time: "84h",
  },
  {
    name: "Shadow",
    color: "yellow",
    time: "2h",
  },
]);
const list2 = ref(
  list1.value.map((item) => ({
    name: `${item.name}-2`,
    id: `${item.id}-2`,
    children: [],
  }))
);

const list3 = ref([
  {
    name: "Meeting",
    color: "orange",
    time: "4h",
  },
  {
    name: "Lead Coach",
    color: "green",
    time: "7h",
  },
  {
    name: "Support Coach",
    color: "pink",
    time: "2h",
  },
  {
    name: "Fixed",
    color: "blue",
    time: "84h",
  },
  {
    name: "Shadow",
    color: "yellow",
    time: "2h",
  },
]);

const timing_hourse = ref([
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 AM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
]);

const el1 = ref();
const el2 = ref();
useDraggable(el1, list1, {
  animation: 150,
  group: { name: "people", pull: "clone", put: false },
  sort: false,
  onClone() {
    console.log("clone");
  },
});
useDraggable(el2, list2, { animation: 150, group: "people" });
const actBtnRef = ref(true);
const actBtns = ref(false);
const openActionsMethod = () => {
  actBtns.value = true;
  actBtnRef.value = false;
};
const closeActionsMethod = () => {
  actBtns.value = false;
  actBtnRef.value = true;
};
const coachClick = ref(false);
const editSlotMethod = () => {
  coachClick.value = !coachClick.value;
};
const isCalenderView = ref(false);
const calendarViewClick = () => {
  isCalenderView.value = !isCalenderView.value;
  emit("sidebar-month-view");
};
</script>

<style scoped lang="scss">
.top-heading {
  gap: 10px;
  margin-bottom: 35px;
  h1 {
    font-size: 22px;
    color: #002e4b;
    margin: 0;
    margin-right: 10px;
  }
  .calendarBtn {
    svg {
      fill: #84ceff;
      width: 20px;
    }
  }
}
.top-btn {
  height: 40px;
  min-width: 126px;
  border-radius: 7px;
  font-size: 14px;
}
.top-mon-btn {
  background-color: #f2faff;
  color: #000000;
}
.top-week-btn {
  background-color: #84ceff;
  color: #fff;
}
.top-pub-btn {
  margin-left: auto;
  background-color: #ffd500;
  color: #002e4b;
  min-width: 150px;
}
.custom-rates {
  margin-bottom: 30px;
  p {
    font-size: 14px;
    color: #000;
    font-weight: 600;
    margin-bottom: 12px;
  }
  .rates-btn {
    gap: 10px;
    .rate-btn {
      height: 40px;
      width: fit-content;
      border-radius: 5px;
      font-size: 14px;
      padding: 10px;
      color: #002e4b;
    }
    .orange {
      background-color: #ffd4d4;
    }
    .green {
      background-color: #c1ffc9;
    }
    .pink {
      background-color: #ffcffa;
    }
    .blue {
      background-color: #c2dfff;
    }
    .yellow {
      background-color: #fffade;
    }
  }
}
.timings {
  background-color: #f2faff;
  position: relative;
  .expand-sec {
    position: absolute;
    z-index: 20;
    top: 10%;
    right: -30px;
    text-align: center;
    p {
      font-size: 10px;
      margin-bottom: 4px;
    }
    svg {
      width: 30px;
      fill: #002e4b;
    }
  }
  .split-sec {
    position: absolute;
    z-index: 20;
    bottom: 20%;
    right: -77px;
    display: flex;
    align-items: center;
    gap: 8px;
    p {
      font-size: 10px;
      margin-bottom: 4px;
      color: #002e4b;
    }
    svg {
      width: 20px;
      fill: #84ceff;
    }
  }
}
.isBorder {
  border: 2px solid #84ceff;
  border-radius: 4px;
}
.day-time-slots {
  padding: 0 64px 0 134px;
  font-size: 10px;
  color: #000;
}
.day-view-top {
  display: grid;
  grid-template-columns: 134px 1fr 74px;
  align-items: center;
  border-bottom: 0.5px solid #5aafe8;
  margin-top: 24px;
  .day-view {
    align-self: start;
    .date {
      font-size: 14px;
      color: #002e4b;
      margin-bottom: 0;
    }
    .day {
      font-size: 22px;
      font-weight: 600;
    }
    .staff-name {
      margin-top: 10px;
      .staff-list {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 8px;
        .icon {
          font-size: 14px;
          color: #cccccc;
        }
        .name {
          color: #002e4b;
          font-size: 14px;
        }
      }
    }
    .addBtn {
      display: flex;
      background: #f2faff;
      padding: 8px 20px;
      border-radius: 7px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      width: calc(100% - 30px);
      cursor: pointer;
      svg {
        fill: #84ceff;
        width: 14px;
        height: 14px;
      }
    }
  }
  .act-btn {
    justify-self: center;
    button {
      background: transparent;
      border: none;
      color: #84ceff;
      svg {
        width: 5px;
        fill: #84ceff;
      }
    }
    ul {
      list-style: none;
      padding-left: 0;
      li {
        color: #002e4b;
        font-size: 10px;
        margin-bottom: 8px;
        text-align: center;
        svg {
          width: 14px;
          fill: #84ceff;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
  .save-btn {
    .saveBtn {
      min-width: 60px;
      width: 60px;
      gap: 0 !important;
    }
    b {
      display: none;
    }
  }
}
.day-time::after {
  position: absolute;
  content: "";
  width: 1px;
  height: calc(100% + 9px);
  background: #e6e7e8;
  top: auto;
  left: 7px;
  z-index: 1;
  display: flex;
  justify-content: center;
}
</style>
