<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros & Cia"
    />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Produtos" active>
            <ProdutoAdmin />
          </b-tab>
          <b-tab title="Categorias">
            <CategoriaAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import ProdutoAdmin from "./ProductAdmin";
import CategoriaAdmin from "./CategoryAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, ProdutoAdmin, CategoriaAdmin },
};
</script>

<style></style>
