
import { shallowMount, mount, createLocalVue , shallow} from "@vue/test-utils";
import HelloWorld from "./src/components/HelloWorld.vue";
import DataTable from "./src/pages/new-datatable.vue";
import App from './src/App.vue';
import Vuex from 'vuex';
import store from './src/store/store.js'; 
import state from './src/store/state.js';
import store_actions from './src/store/actions.js';
import mutations from './src/store/mutations.js';

const localVue = createLocalVue();

localVue.config.productionTip = false;

localVue.use(Vuex);

describe("testing entry app.vue",()=>{
  it("testing action getData",()=>{
    const actions = {
      getData: jest.fn()
     }
     const store = new Vuex.Store({ actions })
     const wrapper = shallow(App, { store })
     expect(actions.getData).toHaveBeenCalled();
  });
});

describe("testing new datatable component", () => {
  it("testing getting data",()=>{
      expect(store_actions.getData()).resolves;
  });
  it("testing mutation SET_CSV_DATA",()=>{
      store.commit('SET_CSV_DATA',[{ID:1,Name:'Ardian'}]);
      expect(store.state.data).toEqual(
        [{"ID":1,"Name":'Ardian'}]
      );
  });
  it("testing computed property csv_data", async () => {
      const mountedComponent = shallowMount(DataTable,{
        store
      });
      await store.dispatch('getData');
      expect(mountedComponent.vm.csv_data.length).toBe(100);
      afterAll(()=>{
        process.exit();
      })
  });
  it("testing data property sortedDatum",async()=>{
      const mountedComponent = shallowMount(DataTable,{
        store
      });
      await store.dispatch('getData');
      expect(mountedComponent.vm.sortedDatum.length).toBe(100);
  });
});