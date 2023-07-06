import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./views/HomePage.vue";
import QuienesSomos from "./views/QuienesSomos.vue";

Vue.use(VueRouter);

const routes = [
    {path: "/", component: HomePage, name: "home"},
    {path: "/quienes-somos", component: QuienesSomos, name: "quienes-somos"},
]

const router = new VueRouter({
    mode: "history",
   // base: process.env.BASE_URL,
   routes,
})

export default router;
