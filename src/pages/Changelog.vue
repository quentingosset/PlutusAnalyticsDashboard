<template>
  <div class="flex h-screen overflow-hidden">

    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">

      <!-- Site header -->
      <Header :sidebarOpen="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">

            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Changelog ✨</h1>
            </div>

            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

            </div>

          </div>

          <div class="border-t border-slate-200">
            <div class="max-w-3xl m-auto mt-8">

              <!-- Posts -->
              <div class="xl:-translate-x-16">
                <!-- Post -->
                <article class="pt-6">
                  <div class="xl:flex">
                    <div class="w-32 shrink-0">
                      <div class="text-xs font-semibold uppercase text-slate-400 xl:leading-8">28 Jan, 2023</div>
                    </div>
                    <div class="grow pb-6 border-b border-slate-200">
                      <header>
                        <h2 class="text-2xl text-slate-800 font-bold mb-3">Released version 1.0.0 🎉</h2>
                        <div class="flex flex-nowrap items-center space-x-2 mb-4">
                          <div class="flex items-center">
                            <a class="block mr-2 shrink-0" href="#0">
                              <img class="rounded-full border-2 border-white box-content" src="https://avatars.githubusercontent.com/u/6824137" width="32" height="32" alt="User 04" />
                            </a>
                            <a class="block text-sm font-semibold text-slate-800" href="#0">
                              Quentin Gosset
                            </a>
                          </div>
                          <div class="text-slate-400">·</div>
                          <div>
                            <div class="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">New Release</div>
                          </div>
                          <div class="text-slate-400">·</div>
                          <div class="text-sm font-semibold text-slate-800">V1.0.0</div>
                        </div>
                      </header>
                      <div class="space-y-3">
                        <p>After a few months of work,<br>I have decided today to release the <b>Plutus Analytics dashboard V1.0.0</b> !</p>
                        <p>The idea is to provide a dashboard a bit <b>more advanced</b> than the one provided by Plutus and to be able to better follow its evolution on the Plutus ecosystem.</p>
                        <p>This extension is <b>totally free and open-source</b>, you can find it on my github: <a class="text-indigo-500 hover:text-indigo-600" href="https://github.com/quentingosset/PlutusAnalyticsDashboard" target="_blank">https://github.com/quentingosset/PlutusAnalyticsDashboard</a> and is <b>open to contribution</b> if you are interested!</p>
                        <p>The next features planned (no dates for the moment) are :</p>
                        <ul class="-my-2">
                          <li class="relative py-2">
                            <div class="flex items-center mb-1">
                              <div class="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div class="absolute left-0 rounded-full bg-white" aria-hidden="true"><svg class="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg></div>
                              <h3 class="text-lg font-bold text-slate-800 pl-9">Downloading your statements history</h3>
                            </div>
                            <div class="pl-9">Be able to download all your statements like transactions / withdrawals / cashback in CSV / JSON /...</div>
                          </li>
                          <li class="relative py-2">
                            <div class="flex items-center mb-1">
                              <div class="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div class="absolute left-0 rounded-full bg-white" aria-hidden="true"><svg class="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg></div>
                              <h3 class="text-lg font-bold text-slate-800 pl-9">Tracking used perks</h3>
                            </div>
                            <div class="pl-9">Be able to select and track used and unused perks and get a better overview of your current situation.</div>
                          </li>
                          <li class="relative py-2">
                            <div class="flex items-center mb-1">
                              <div class="absolute left-0 h-full w-0.5 bg-slate-200 self-start ml-2.5 -translate-x-1/2 translate-y-3" aria-hidden="true"></div>
                              <div class="absolute left-0 rounded-full bg-white" aria-hidden="true"><svg class="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg></div>
                              <h3 class="text-lg font-bold text-slate-800 pl-9">Overview of spending limits</h3>
                            </div>
                            <div class="pl-9">Have all the spending limits to manage your future expenses more effectively.</div>
                          </li>
                          <li class="relative py-2">
                            <div class="flex items-center mb-1">
                              <div class="absolute left-0 rounded-full bg-white" aria-hidden="true"><svg class="w-5 h-5 fill-current text-slate-400" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg></div>
                              <h3 class="text-lg font-bold text-slate-800 pl-9">More advanced statistics</h3>
                            </div>
                            <div class="pl-9">Have a dashbaord of statistics that gathers your overview of your cashback evolution, stacking, money spent each week / month / year / ... </div>
                          </li>
                        </ul>
                        <p>
                          If you have any ideas, don't hesitate <b>to open an Issue</b> on the Github project to <b>propose your idea</b>.</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>

  </div>
</template>

<script>
import {ref} from 'vue'
import Sidebar from '../partials/Sidebar.vue'
import Header from '../partials/Header.vue'
import {globalStore} from "../stores/global";

export default {
  name: 'Changelog',
  components: {
    Sidebar,
    Header,
  },
  setup() {

    const sidebarOpen = ref(false)
    const storeGlobal = globalStore();

    return {
      sidebarOpen,
      storeGlobal
    }
  },
  mounted() {

  }
}
</script>
