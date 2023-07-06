import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "Hola coders desde Vuex state",
    count: 0,
    todos: [
      {
        timestamp: 123,
        text: "primer todo",
      },
      {
        timestamp: 456,
        text: "segundo todo",
      },
    ],
  },
  getters: {},
  mutations: {
    incrementarCount: (state) => {
      state.count++;
    },
    addTodo: (state, todo) => {
      state.todos.push(todo)
    }
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