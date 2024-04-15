<template>
  <div class="content-main-box">
    <div class="content-box mb-3">
      <div class="content__title-box">
        <h1 class="content-title">Payment Information</h1>
      </div>
      <div class="title-2">Existing Cards</div>

      <div class="cards-info">
        <div class="cards-info__box active">
          <div class="title">
            <label class="checkbox-container">
              <FormKit
                type="checkbox"
                name="pay_with_card"
                outer-class="m-0"
                label="card"
                :value="false"
              />
            </label>

            <img
              class="cardIcon"
              src="~/assets/images/master-card.png?timestamp=1702713690697"
              alt="Master card"
            />
          </div>

          <div class="card-number">
            <div class="title">Card number</div>
            <div class="pin-code">**** **** **** 1234</div>
          </div>

          <div class="card-valid">
            <div>
              <div>Valid Through</div>
              <div class="date">05/25</div>
            </div>
          </div>
        </div>

        <div class="cards-info__box">
          <div class="title">
            <label class="checkbox-container">
              <FormKit
                type="checkbox"
                name="pay_with_card"
                outer-class="m-0"
                label="card"
                :value="false"
              />
            </label>

            <img
              class="cardIcon"
              src="~/assets/images/visa-card.png?timestamp=1702713690697"
              alt="Visa card"
            />
          </div>

          <div class="card-number">
            <div class="title">Card number</div>
            <div class="pin-code">**** **** **** 5678</div>
          </div>

          <div class="card-valid">
            <div>
              <div>Valid Through</div>
              <div class="date">05/25</div>
            </div>

            <div class="remove">
              <img
                class="remove__icon"
                src="~/assets/images/svg/x-grey-icon.svg?timestamp=1702713690697"
                alt="Remvoe icon"
              />
              remove
            </div>
          </div>
        </div>

        <div class="cards-info__add">
          <div class="add-card">
            <img
              class="plusIcon"
              src="~/assets/images/svg/plus-icon.svg?timestamp=1702713690697"
              alt="Plus icon"
            />
            Add New Card
          </div>
        </div>
      </div>
    </div>

    <div class="content-box1">
      <div class="content__title-box">
        <h1 class="content-title">Purchase History</h1>

        <div class="filter-box packagesByStatus">
          <a href="#" class="filter-option is-active" data-text="All">All</a>
          <a href="#" class="filter-option" data-text="Membership"
            >Membership</a
          >
          <a href="#" class="filter-option" data-text="Store">Store</a>
        </div>
      </div>

      <div class="scroll-purchase">
        <table class="purchase-history">
          <tbody>
            <tr>
              <th>Invoice #</th>
              <th>Item</th>
              <th>Price</th>
              <th>Time</th>
              <th>Date</th>
              <th>Device</th>
              <th>Card</th>
            </tr>

            <tr>
              <td>
                <img
                  class="downloadIcon"
                  src="~/assets/images/svg/download.svg?timestamp=1702713690697"
                  alt="Download"
                />
                INV12345678
              </td>
              <td>3 Months Unlimited</td>
              <td>AED 3,105</td>
              <td>08:15 AM</td>
              <td>Dec 14, 2021</td>
              <td>Member's App</td>
              <td>
                <img
                  class="cardIcon"
                  src="~/assets/images/master-card.png?timestamp=1702713690697"
                  alt="Master card"
                />
                ****1234
              </td>
            </tr>

            <tr>
              <td>
                <img
                  class="downloadIcon"
                  src="~/assets/images/svg/download.svg?timestamp=1702713690697"
                  alt="Download"
                />
                INV12345678
              </td>
              <td>3 Months Unlimited</td>
              <td>AED 3,105</td>
              <td>08:15 AM</td>
              <td>Dec 14, 2021</td>
              <td>Member's App</td>
              <td>
                <img
                  class="cardIcon"
                  src="~/assets/images/master-card.png?timestamp=1702713690697"
                  alt="Master card"
                />
                ****1234
              </td>
            </tr>

            <tr>
              <td>
                <img
                  class="downloadIcon"
                  src="~/assets/images/svg/download.svg?timestamp=1702713690697"
                  alt="Download"
                />
                INV12345678
              </td>
              <td>3 Months Unlimited</td>
              <td>AED 3,105</td>
              <td>08:15 AM</td>
              <td>Dec 14, 2021</td>
              <td>Member's App</td>
              <td>
                <img
                  class="cardIcon"
                  src="~/assets/images/master-card.png?timestamp=1702713690697"
                  alt="Master card"
                />
                ****1234
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBreadcrumbStore } from "~/store/breadcrumb";
const props = defineProps({
  memberId: {
    type: String,
    default: "",
  },
});

const { memberId } = toRefs(props);
const route = useRoute();
const { setBreadcrumb, setBreadcrumbTab } = useBreadcrumb();

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb({
  items: [
    { label: "Profiles", link: "" },
    { label: "Payment", link: "" },
  ],
});

breadcrumbStore.setStyles({
  position: "relative",
  right: "-20px",
});

setBreadcrumbTab({
  items: [
    {
      label: "Membership",
      link: {
        path: "/members/details/membership-overview",
        query: { id: memberId.value },
      },
    },
    {
      label: "Payment",
      link: {
        path: "/members/details/payment",
        query: { id: memberId.value },
      },
    },
    {
      label: "Attendance",
      link: {
        path: "/members/details/attendance",
        query: { id: memberId.value },
      },
    },
    {
      label: "Transformation",
      link: {
        path: "/members/details/transformations",
        query: { id: memberId.value },
      },
    },
    {
      label: "Notes",
      link: {
        path: "/members/details/notes",
        query: { id: memberId.value },
      },
    },
  ],
});
</script>
<style lang="scss" scoped>
// .content-main-box {
//     position: relative;
//     width: 700px;
//     max-width: 950px;
// }
// .content-main-box .content-box {
//     position: relative;
//     width: 65vw;
//     max-width: 950px;
//     min-height: 300px;
// }

.content-box1 {
  position: relative;
  width: 65vw;
  background: #ffffff;
  box-shadow: 0px 10px 20px #00000014;
  max-width: 950px;
  min-height: 370px;
  padding: 20px;
  margin: 0 auto;
  height: 200px;
  // margin-bottom: 50px;
  border-radius: 10px;
}

.content-main-box {
  position: relative;
  width: 65vw;
  max-width: 950px;
  height: 400px;

  .content-box {
    position: relative;
    width: 65vw;
    max-width: 950px;
    // min-height: 300px;
  }

  .content__title-box {
    justify-content: space-between;
    margin-bottom: 7px;
  }

  .title-2 {
    font: 22px $font-family-title;
    margin: 27px 0 16px;
  }
}

/*****************************
 ******* 2. Cards info *******
 ****************************/
.cards-info {
  display: flex;
  flex-wrap: wrap;

  &__box {
    width: 263px;
    border-radius: 10px;
    padding: 12px;
    background: #f1f2f2;
    color: #ffffff;
    margin-right: 20px;
    margin-bottom: 20px;
    height: 150px;

    .title {
      display: flex;
      justify-content: space-between;

      .cardIcon {
        width: 48px;
      }
    }

    .card-number {
      .title {
        width: 100%;
        margin-top: 15px;
        font: 10px $font-family-medium;
        text-transform: uppercase;
      }

      .pin-code {
        font: 22px $font-family-medium;
      }
    }

    .card-valid {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      margin-top: 5px;

      .date {
        font-weight: bold;
      }

      .remove {
        display: flex;
        align-items: flex-end;
        color: #cccccc;
        cursor: pointer;

        &__icon {
          opacity: 0.3;
          margin-right: 5px;
          margin-bottom: 3px;
        }
      }
    }

    .checkbox-container input[type="checkbox"] {
      z-index: 3;
    }

    &.active {
      color: #000000;
      background: #f2faff;
    }
  }

  &__add {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $main-blue;
    border-radius: 10px;
    width: 241px;
    height: 150px;

    .add-card {
      cursor: pointer;

      img {
        margin-right: 7px;
      }
    }
  }
}

/*****************************
 **** 3. Purchase History ****
 ****************************/
.purchase-history {
  width: 100%;
  margin-top: 30px;
  color: #000000;
  min-width: 800px;

  tr {
    td,
    th {
      padding: 7px;
    }

    th {
      &:first-child {
        padding-left: 42px;
      }
    }
  }

  .cardIcon {
    height: 22px;
  }

  .downloadIcon {
    height: 22px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.scroll-purchase {
  overflow-x: auto;
  position: relative;
  @include customScrollbar();

  &::-webkit-scrollbar {
    height: 7px;
  }
}
.filter-box .filter-option {
  color: #ccc;
  padding: 8px 12px;
  margin-right: 10px;
  border: 2px solid #f1f2f2;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.35s;
  height: fit-content;
}
.checkbox-container input[type="checkbox"] {
  width: 20px;
  min-width: 20px;
  height: 20px;
  padding: 5px;
  border: 1px solid #e1e1e1;
  border-radius: 50%;
  transition: all 0.2s ease;
  margin: 0 0.6rem 0 0;
  cursor: pointer;
  appearance: none;
  z-index: -1;
}
</style>
