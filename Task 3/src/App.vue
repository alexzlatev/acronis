<template>
  <div class="element">
    <form class="form">
      <section class="section">
        <label class="label" for="productType">Product Type:</label>
        <select class="select" v-model="productType" @change="changeOptions" id="productType">
          <option value="" disabled>Select</option>
          <option value="perpetual">Perpetual</option>
          <option value="subscription">Subscription</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </section>
      <section class="section">
        <template v-if="productOptions">
          <label class="label" for="productOption">Select Option:</label>
          <select class="select" v-model="productOption" @change="changeSubOptions" id="productOption">
            <option v-for="(option, index) in productOptions" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
        </template>
        <template v-if="productSubOptions">
          <label class="label" for="productSubOption">Select Product:</label>
          <select class="select" v-model="productSubOption" id="productSubOption">
            <option v-for="(subOption, index) in productSubOptions" :key="index" :value="subOption">
              {{ subOption.product_name }}
            </option>
          </select>
        </template>
      </section>
      <button class="button" v-if="productSubOption" @click.prevent="generateLink">Search</button>
    </form>
    <a v-if="generatedLink" class="result" :href="generatedLink" >{{ generatedLink }}</a>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: null,
      productType: '',
      productOptions: null,
      productOption: '',
      productSubOptions: null,
      productSubOption: null,
      generatedLink: ''
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await fetch('https://www.acronis.com/en-us/api/v1/price/?machine_name=acronis_backup&locale=en-us');
      const data = await response.json();

      this.data = data[0];
    },
    changeOptions() {
      const options = Object.keys(this.data[this.productType]);
      this.productOptions = options;
      this.productOption = options[0]
      this.changeSubOptions();
    },
    changeSubOptions() {
      const options = Object.values(this.data[this.productType][this.productOption]);
      this.productSubOptions = options;
      this.productSubOption = options[0];
    },
    generateLink() {
      this.generatedLink = `https://store.acronis.com/${this.productSubOption.store}/purl-consumer-standard-US?cart=${this.productSubOption.cb_id}&currencies=${this.productSubOption.currency}`;
    }
  }
}
</script>

<style>
.element {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

.form {
  width: 500px;
}

.section {
  margin-bottom: 10px;
}

.label {
  margin-right: 5px;
  font-size: 12px;
}

.select {
  max-width: 200px;
  padding: 2px;
  margin-right: 10px;
}

.result {
  width: fit-content;
  margin-top: 20px;
  padding: 20px 5px;
  border: 2px solid black;
  border-radius: 8px;
}
</style>
