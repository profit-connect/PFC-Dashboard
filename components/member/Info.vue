<template>
  <div
    class="member-info d-flex justify-content-between align-items-center gap-2"
  >
    <div class="number"><slot name="number"></slot></div>
    <div class="details">
      <div class="row g-0 align-items-end">
        <div class="col-6 label"><slot name="label"></slot></div>
        <div class="col-6"><slot name="value"></slot></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.member-info {
  .number {
    font-size: 32px;
    font-weight: 900;
  }

  .details {
    font-size: 10px;
    min-width: 160px;
    line-height: 14px;
  }
  .label {
    font-size: 12px;
  }
}
</style>

<style lang="scss">
.member-info {
  .negative {
    color: red;
  }
  .positive {
    color: green;
  }
}
</style>
