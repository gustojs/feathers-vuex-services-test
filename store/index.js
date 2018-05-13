import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from '../feathers-client';
const { auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });
Vue.use(Vuex);
Vue.use(FeathersVuex);
const requireModule = require.context(
  // The relative path holding the service modules
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports)
  /.js$/
);
const servicePlugins = requireModule.keys().map((modulePath) => requireModule(modulePath).default);
export default () =>
  new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    modules: {},
    plugins: [
      // Use the spread operator to register all of the imported plugins
      ...servicePlugins,
      auth({ userService: 'users' })
    ]
  });
