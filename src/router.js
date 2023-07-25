import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./views/HomePage.vue";
import LoginForm from "./views/Login.vue";
import RegisterForm from "./views/Register.vue";
import MyProfile from "./views/MyProfile.vue";
import MisPedidos from "./views/MisPedidos.vue";
import ListadoPedidos from "./views/ListadoPedidos.vue";
import AdminStock from "./views/AdminStock.vue";

Vue.use(VueRouter);

const routes = [
    {path: "/", component: HomePage, name: "home"},
    {path: "/login", component: LoginForm, name: "LoginForm"},
    {path: "/register", component: RegisterForm, name: "RegisterForm"},
    {path: "/myprofile", component: MyProfile, name: "MyProfile"},
    {path: "/mispedidos", component: MisPedidos, name: "MisPedidos"},
    {path: "/listadoPedidos", component: ListadoPedidos, name: "ListadoPedidos"},
    {path: "/adminStock", component: AdminStock, name: "AdminStock"},
]

const router = new VueRouter({
    mode: "history",
   // base: process.env.BASE_URL,
   routes,
})

export default router;
