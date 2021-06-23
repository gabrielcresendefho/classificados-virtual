import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";
import ProductsByCategory from "@/components/product/ProductsByCategory";
import ProductById from "@/components/product/ProductById";
import Auth from "@/components/auth/Auth";

import { userKey } from "@/global";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "adminPages",
    path: "/admin",
    component: AdminPages,
  },
  {
    name: "productsByCategory",
    path: "/categories/:id/products",
    component: ProductsByCategory,
  },
  {
    name: "productById",
    path: "/products/:id",
    component: ProductById,
  },
  {
    name: "auth",
    path: "/auth",
    component: Auth,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey);

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    const user = JSON.parse(json);
    user ? next() : next({ path: "/" });
  } else {
    next();
  }
});

export default router;
