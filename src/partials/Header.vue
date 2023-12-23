<template>
  <header class="sticky top-0 bg-white border-b border-slate-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <!-- Header: Left side -->
        <div class="flex">

          <!-- Hamburger button -->
          <button class="text-slate-500 hover:text-slate-600 lg:hidden" @click.stop="$emit('toggle-sidebar')" aria-controls="sidebar" :aria-expanded="sidebarOpen">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>

        </div>


        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          <div class="flex items-center justify-between">
            <div class="status-dot status-dot-animated w-2 h-2 rounded-full bg-emerald-500" v-show="versionStatus"></div>
            <div class="text-sm font-medium text-slate-800 ml-2 mr-2 capitalize" id="version"><span v-html="versionText"></span></div>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script>
import {ref} from "vue";
import {getgit} from "../utils/Utils";

export default {
  name: 'Header',
  props: ['sidebarOpen'],
  components: {
  },
  setup() {
  const versionText = ref("");
  const versionStatus = ref(true);
    getgit("quentingosset", "PlutusAnalyticsDashboard", "version.json").then(value => {
      if(process.env.PACKAGE_VERSION !== value.version){
        versionStatus.value = false;
        versionText.value = `<div class="inline-flex font-medium text-center px-2.5 py-0.5 bg-red-100 text-red-600">New version available (${process.env.PACKAGE_VERSION})</div>`;
      }else{
        versionText.value = `V${value.version}`;
      }
    });



    return {
      versionStatus,
      versionText
    }
  }
}
</script>
