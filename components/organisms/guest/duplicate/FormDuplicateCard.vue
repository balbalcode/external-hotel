<template>
  <div>
    <plain-modal
      id="modalDuplicate"
      v-model="modal.duplicate"
      @close="
        modal.duplicate = false;
        $emit('close');
      "
      size="sm"
      test_id="modal-add-duplicate-event"
    >
      <div class="">
        <div>
          <i
            class="ic-alert-circle font-size-26 text-info rounded-circle"
            style="
              background-color: #a6cdfe;
              border: 6px solid #cfe4ff;
              padding: 6px;
            "
          >
          </i>

          <p class="mt-3 mb-1 font-weight-bold">Ooops Fitur Belum Tersedia</p>
          <p class="my-0 font-size-10 text-secondary">
            Fitur ini sedang dalam pengembangan, mohon ditunggu yaa! anda bisa
            membuat duplikat kartu tamu seperti anda membuat tamu baru dengan
            data yang sama.
          </p>

          <active-button
            text="Tutup"
            type="outline"
            size="sm"
            variant="info"
            text_color="info"
            @click="
              modal.duplicate = false;
              $emit('close');
            "
            additional_class="w-100 px-3 mt-3"
          />
        </div>
      </div>
    </plain-modal>
  </div>
</template>

<script>
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(newVal) {
        this.modal.duplicate = newVal;
      },
    },
  },
  data: () => {
    return {
      modal: {
        duplicate: false,
      },
    };
  },
};
</script>

<style></style>
