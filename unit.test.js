
import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import jest from 'jest';
import HelloWorld from "./src/components/HelloWorld.vue";
import NewDataTable from "./src/pages/new-datatable.vue";
import Vuex from 'vuex';
import store from './src/store/store.js'; 
import state from './src/store/state.js';
import actions from './src/store/actions.js';
import mutations from './src/store/mutations.js';

const localVue = createLocalVue()

localVue.use(Vuex)

describe("HelloWorld.vue", () => {
  it("it mounts when passed", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.contains('div')).toBe(true)
  });
});

describe("testing datatable component", () => {
  it("testing getting data",()=>{
      expect(actions.getData()).resolves;
  });
  it("testing mutation SET_CSV_DATA",()=>{
      mutations.SET_CSV_DATA(store.state,[{ID:1,Name:'Ardian'}]);

      expect(state.data).toEqual(
        [{"ID":1,"Name":'Ardian'}]
      );
  });
})