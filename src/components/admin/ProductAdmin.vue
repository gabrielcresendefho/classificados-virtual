<template>
  <div class="product-admin">
    <b-form>
      <input id="product-id" type="hidden" v-model="product.id" />
      <b-form-group label="Nome:" label-for="product-name">
        <b-form-input
          id="product-name"
          type="text"
          v-model="product.nome"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o Nome do Produto..."
        />
      </b-form-group>
      <b-form-group label="Descrição" label-for="product-description">
        <b-form-input
          id="product-description"
          type="text"
          v-model="product.descricao"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a descrição do Produto..."
        />
      </b-form-group>
      <b-form-group
        v-if="mode === 'save'"
        label="Categoria:"
        label-for="product-categoryId"
      >
        <b-form-select
          id="product-categoryId"
          :options="categories"
          v-model="product.categoria_id"
        />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save"
        >Salvar</b-button
      >
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
        >Excluir</b-button
      >
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="products" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button
          variant="warning"
          @click="loadProduct(data.item)"
          class="mr-2"
        >
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadProduct(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "ProductAdmin",
  data: function () {
    return {
      mode: "save",
      product: {},
      products: [],
      categories: [],
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "nome", label: "Nome", sortable: true },
        { key: "descricao", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadProducts() {
      const url = `${baseApiUrl}/products`;
      axios.get(url).then((res) => {
        this.products = res.data.produtos;
      });
    },
    reset() {
      this.mode = "save";
      this.product = {};
      this.loadProducts();
    },
    save() {
      const method = this.product.id ? "put" : "post";
      const id = this.product.id ? `/${this.product.id}` : "";
      axios[method](`${baseApiUrl}/products${id}`, this.product)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.product.id;
      axios
        .delete(`${baseApiUrl}/products/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadProduct(product, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/products/${product.id}`)
        .then((res) => (this.product = res.data.product));
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.categorias.map((category) => {
          return { value: category.id, text: category.nome };
        });
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.nome} - ${user.email}` };
        });
      });
    },
  },
  mounted() {
    this.loadUsers();
    this.loadCategories();
    this.loadProducts();
  },
};
</script>

<style></style>
