<template>
  <div>
    <plain-modal
      id="modalDuplicate"
      v-model="modal.duplicate"
      @close="
        modal.duplicate = false;
        $emit('close');
      "
      size="md"
      test_id="modal-add-duplicate-event"
    >
      <div class="">
        <div>
          <i
            class="ic-calendar-date font-size-26 text-info rounded-circle"
            style="
              background-color: #a6cdfe;
              border: 6px solid #cfe4ff;
              padding: 6px;
            "
          >
          </i>
        </div>
      </div>
    </plain-modal>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      modal: {
        duplicate: true,
      },
    };
  },
};
</script>

<style></style>
