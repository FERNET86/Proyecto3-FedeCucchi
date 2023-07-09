import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    userLogged: {},
  },
  getters: {
    isLogged: (state) => {
      return state.isLogged;
    },
    userLogged: (state) => {
      return state.userLogged;
    }
  },
  mutations: {
    incrementarCount: (state) => {
      state.count++;
    },
    addTodo: (state, todo) => {
      state.todos.push(todo)
    },
    setIsLogged: (state, value) => {
      return state.isLogged = value;
    },
    setUserLogged: (state, user) => {
      return state.userLogged = user;
    },
  },
  actions: {
    incrementarCountAction: (context) => {
      context.commit("incrementarCount");
    },
    addTodoAction: (context, payload) => {
      if (payload !== "") {
        context.commit("addTodo", {
          timestamp: Date.now(),
          text: payload
        })
      }
    }
  },
  modules: {},
});