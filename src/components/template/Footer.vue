<template>
  <footer class="footer">
    <span
      >Feito por <strong>Gabriel Resende</strong> e
      <strong>André Carneiro</strong></span
    >
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
}
</style>
