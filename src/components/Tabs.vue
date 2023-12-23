<template>
  <div class="flex flex-col col-span-full xl:col-span-4 shadow-lg rounded-sm border border-slate-200">
    <header class="px-2 border-b border-slate-100 flex items-center ">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li v-for="(tab, index) in tabList" :key="index" class="me-2">
          <label :for="`${index}`" href="#"
                 class="inline-flex items-center justify-center p-4 rounded-t-lg group cursor-pointer"
                 :class="{
                  'border-b-2 active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500': index === activeTab,
                  'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': index !== activeTab,
                }"
                 aria-current="page">
            <div v-html="tab.icon"/>
            <div class="flex">
              {{tab.name}}
              <div v-if="tab.notification" class="status-dot status-dot-animated w-3 h-3 rounded-full bg-rose-500 border-white border-2"></div>
            </div>
          </label>
          <input
              :id="`${index}`"
              type="radio"
              :name="`${index}`"
              :value=index
              v-model="activeTab"
              class="hidden"
          />
        </li>
      </ul>
    </header>
    <div class="h-full flex flex-col" :class="{'px-5 py-6': margin}">
      <!--<FintechCard09 :border=false :header=false />-->
      <template v-for="(tab, index) in tabList">
        <div :key="index" v-if="index === activeTab">
          <component :is="tab.component" v-bind="tab.componentProps"/>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import IntStream from "lodash";

export default {
  name: 'Tabs',
  props: {
    tabList: {type: Array, required: true},
    margin: {type: Boolean, default: true},
  },
  setup(props, context) {
    const activeTab = ref();
    onMounted(async () => {
      console.log(props.tabList)
      activeTab.value = IntStream.range(0, props.tabList.length)
          .findIndex(index => props.tabList.at(index).default);
    });
    return {
      activeTab
    };
  },
};
</script>