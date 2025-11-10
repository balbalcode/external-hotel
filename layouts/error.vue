<template>
  <Layout>
    <div class="container">
      <div class="row">
        <div class="col-7 mx-auto text-center mt-5 pt-5">
          <img src="~/static/error/motorcycle.png" class="mt-3">
          <h1 class="text-black80 font-weight-bold mt-3">
            Ooops...
          </h1>

          <h5 v-if="error.statusCode === 404">Halaman tidak tersedia</h5>
          <h5 v-if="error.statusCode === 500">Tidak dapat terhubung dengan server</h5>

          <router-link to="/dashboard" custom v-slot="{ navigate }">
            <button @click="navigate" class="btn btn-primary btn-sm font-weight-bold px-3 mt-3"
                    @keypress.enter="navigate" role="link">Kembali ke halaman utama
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/main";

export default {
  props: ['error'],
  components: {
    Layout,
  }
}
</script>
