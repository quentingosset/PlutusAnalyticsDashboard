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
        <div>
          <div class="px-4 py-2 rounded-sm text-sm border bg-emerald-100 border-emerald-200 text-emerald-600">
            <div class="flex w-full justify-between items-start">
              <div class="flex">
                <svg class="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"></path>
                </svg>
                <div class="font-medium"> Announcement: Plutus Analytics v1.0.0 Dashboard is out. <router-link to="/changelog" custom v-slot="{ href, navigate, isExactActive }"><a class="text-indigo-500 hover:text-indigo-600" :href="href" @click="navigate">Read more...</a></router-link> </div>
              </div>
            </div>
          </div>
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
import Manifest from '/src/manifest.json'
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
      if(Manifest.version !== value.version){
        versionStatus.value = false;
        versionText.value = `<div class="inline-flex font-medium text-center px-2.5 py-0.5 bg-red-100 text-red-600">New version available (${value.version})</div>`;
      }else{
        versionText.value = `V${value.version}`;
      }
    });



    return {
      Manifest,
      versionStatus,
      versionText
    }
  }
}
</script>
