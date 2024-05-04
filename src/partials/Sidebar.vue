<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200" :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'" aria-hidden="true"></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >

      <!-- Sidebar header -->
      <div class="flex justify-between mb-10">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-slate-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <span class="text-white font-bold">Plutus Analytics Dashboard</span>
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <h3 class="text-xs uppercase text-slate-500 font-semibold pl-3">
            <span class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Menu</span>
          </h3>
          <ul class="mt-3">
            <!-- Main -->
            <!--<router-link to="/" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 hover:text-white truncate transition duration-150" :class="isExactActive && 'hover:text-slate-200'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 h-6 w-6" x="0" y="0" viewBox="0 0 512 512">
                        <g>
                          <path class="fill-current text-slate-400" :class="isExactActive && 'text-indigo-500'" d="M435.143 129.356a20.002 20.002 0 0 0-25.407-2.384c-29.926 20.398-180.03 122.969-196.162 139.1-23.394 23.395-23.394 61.459 0 84.854 11.697 11.696 27.063 17.545 42.427 17.545s30.729-5.849 42.427-17.545c16.131-16.132 118.701-166.236 139.1-196.162a20.006 20.006 0 0 0-2.385-25.408zM270.142 322.641c-7.797 7.799-20.486 7.799-28.283 0-7.798-7.797-7.799-20.482-.004-28.28 6.268-6.194 48.885-36.588 101.319-73.035-36.446 52.434-66.84 95.049-73.032 101.315z" fill="#000000" data-original="#000000"></path>
                          <path class="fill-current text-slate-400" :class="isExactActive && 'text-indigo-500'" d="m92.231 401.523-24.69 12.044C49.475 381.325 40 345.338 40 308.499c0-26.991 4.977-52.842 14.06-76.683l28.291 13.57a19.924 19.924 0 0 0 8.636 1.972c7.453 0 14.608-4.185 18.047-11.355 4.776-9.959.576-21.906-9.384-26.683l-27.932-13.398c34.717-56.62 94.784-96.095 164.283-102.505v30.081c0 11.046 8.954 20 20 20s20-8.954 20-20V93.402c23.828 2.169 46.884 8.237 68.771 18.117 10.065 4.545 21.912.066 26.457-9.999 4.545-10.068.068-21.913-10-26.458C328.063 60.091 292.659 52.499 256 52.499c-68.38 0-132.667 26.628-181.02 74.98C26.629 175.832 0 240.119 0 308.499c0 50.53 14.998 99.674 43.373 142.115a20 20 0 0 0 25.396 6.86l41-20c9.928-4.843 14.05-16.816 9.207-26.744-4.843-9.927-16.817-14.048-26.745-9.207zM489.436 203.271c-4.544-10.067-16.387-14.547-26.458-10-10.067 4.545-14.544 16.39-9.999 26.457C465.601 247.686 472 277.553 472 308.499c0 36.894-9.506 72.939-27.625 105.218l-25.777-12.275c-9.971-4.748-21.906-.515-26.656 9.459-4.749 9.972-.514 21.907 9.459 26.656l42 20a19.997 19.997 0 0 0 25.225-6.942C497.002 408.173 512 359.029 512 308.499c0-36.659-7.592-72.063-22.564-105.228z" fill="#000000" data-original="#000000"></path>
                        </g>
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Dashboard</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>-->
            <router-link to="/" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 hover:text-white truncate transition duration-150" :class="isExactActive && 'hover:text-slate-200'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path class="fill-current text-slate-400" :class="isExactActive && 'text-white'" d="M9.883 2.207a1.9 1.9 0 0 1 2.087 1.522l.025 .167l.005 .104v7a1 1 0 0 0 .883 .993l.117 .007h6.8a2 2 0 0 1 2 2a1 1 0 0 1 -.026 .226a10 10 0 1 1 -12.27 -11.933l.27 -.067l.11 -.02z" stroke-width="0" fill="currentColor" />
                        <path class="fill-current text-slate-400" :class="isExactActive && 'text-white'" d="M14 3.5v5.5a1 1 0 0 0 1 1h5.5a1 1 0 0 0 .943 -1.332a10 10 0 0 0 -6.11 -6.111a1 1 0 0 0 -1.333 .943z" stroke-width="0" fill="currentColor" />
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" :class="isExactActive && 'text-white'">Analytics</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link to="/statements" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 hover:text-white truncate transition duration-150" :class="isExactActive && 'hover:text-slate-200'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 h-6 w-6" viewBox="0 0 384 512">
                        <path class="fill-current text-slate-400" :class="isExactActive && 'text-white'" d="M14 2.2c8.5-3.9 18.5-2.5 25.6 3.6L80 40.4l40.4-34.6c9-7.7 22.3-7.7 31.2 0L192 40.4l40.4-34.6c9-7.7 22.3-7.7 31.2 0L304 40.4l40.4-34.6c7.1-6.1 17.1-7.5 25.6-3.6s14 12.4 14 21.8v464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6L304 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L192 471.6l-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6l-40.4 34.6c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488V24C0 14.6 5.5 6.1 14 2.2zM96 144c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16-7.2 16-16s-7.2-16-16-16H96zM80 352c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16s-7.2-16-16-16H96c-8.8 0-16 7.2-16 16zm16-112c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16-7.2 16-16s-7.2-16-16-16H96z"></path>
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" :class="isExactActive && 'text-white'">Transactions</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link to="/perks" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 hover:text-white truncate transition duration-150" :class="isExactActive && 'hover:text-slate-200'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 h-6 w-6" viewBox="0 0 512 512">
                        <g fill="currentColor">
                          <path class="fill-current text-slate-400" :class="isExactActive && 'text-white'" d="M190.5 68.8l34.8 59.2H152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-64c0-17.7-14.3-32-32-32h-41.6c6.1-12 9.6-25.6 9.6-40 0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152c-48.6 0-88 39.4-88 88zm336 0c0 22.1-17.9 40-40 40h-73.3l34.8-59.2c7.6-12.9 21.4-20.8 36.3-20.8h2.2c22.1 0 40 17.9 40 40zM32 288v176c0 26.5 21.5 48 48 48h144V288H32zm256 224h144c26.5 0 48-21.5 48-48V288H288v224z"></path>
                        </g>
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" :class="isExactActive && 'text-white'">Perks</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <router-link to="/limits" custom v-slot="{ href, navigate, isExactActive }">
              <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="isExactActive && 'bg-slate-900'">
                <a class="block text-slate-200 hover:text-white truncate transition duration-150" :class="isExactActive && 'hover:text-slate-200'" :href="href" @click="navigate">
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 h-6 w-6" viewBox="0 0 576 512">
                        <g fill="currentColor">
                          <path class="fill-current text-slate-400" :class="isExactActive && 'text-white'" d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32h160c17.7 0 32 14.3 32 32v160c0 17.7-14.3 32-32 32s-32-14.3-32-32v-82.7L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"></path>
                        </g>
                      </svg>
                      <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" :class="isExactActive && 'text-white'">Limits</span>
                    </div>
                  </div>
                </a>
              </li>
            </router-link>
            <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
              <a class="block text-slate-200 hover:text-white truncate transition duration-150" href="https://plutus.thomasott.fr/" target="_blank">
                <div class="flex items-center justify-between">
                  <div class="grow flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 h-6 w-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path class="fill-current text-slate-400" d="M4.99 12.862a7.1 7.1 0 0 0 12.171 3.924a1.956 1.956 0 0 1 -.156 -.637l-.005 -.149l.005 -.15a2 2 0 1 1 1.769 2.137a9.099 9.099 0 0 1 -15.764 -4.85a1 1 0 0 1 1.98 -.275z" stroke-width="0" fill="currentColor" />
                      <path class="fill-current text-slate-400" d="M12 8a4 4 0 1 1 -3.995 4.2l-.005 -.2l.005 -.2a4 4 0 0 1 3.995 -3.8z" stroke-width="0" fill="currentColor" />
                      <path class="fill-current text-slate-400" d="M13.142 3.09a9.1 9.1 0 0 1 7.848 7.772a1 1 0 0 1 -1.98 .276a7.1 7.1 0 0 0 -6.125 -6.064a7.096 7.096 0 0 0 -6.048 2.136a2 2 0 1 1 -3.831 .939l-.006 -.149l.005 -.15a2 2 0 0 1 2.216 -1.838a9.094 9.094 0 0 1 7.921 -2.922z" stroke-width="0" fill="currentColor" />
                    </svg>
                    <span class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">On-chain stats</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="sidebarExpanded = !sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path class="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
              <path class="text-slate-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: 'Sidebar',
  props: ['sidebarOpen'],
  components: {
  },
  setup(props, { emit }) {

    const trigger = ref(null)
    const sidebar = ref(null)

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
    const sidebarExpanded = ref(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')

    const currentRoute = useRouter().currentRoute.value

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      ) return
      emit('close-sidebar')
    }

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return
      emit('close-sidebar')
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler)
      document.addEventListener('keydown', keyHandler)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler)
      document.removeEventListener('keydown', keyHandler)
    })

    watch(sidebarExpanded, () => {
      localStorage.setItem('sidebar-expanded', sidebarExpanded.value)
      if (sidebarExpanded.value) {
        document.querySelector('body').classList.add('sidebar-expanded')
      } else {
        document.querySelector('body').classList.remove('sidebar-expanded')
      }
    })

    return {
      trigger,
      sidebar,
      sidebarExpanded,
      currentRoute,
    }
  },
}
</script>
