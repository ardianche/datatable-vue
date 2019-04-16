
import { shallowMount, mount } from "@vue/test-utils";
import HelloWorld from "./src/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("it mounts when passed", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.contains('div')).toBe(true)
  });
});