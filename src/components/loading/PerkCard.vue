<template>
  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200">
    <div class="flex flex-col h-full">
      <!-- Card top -->
      <div class="grow p-5">
        <!-- Image + name -->
        <header>
          <div class="flex justify-center mb-2">
            <div class="relative inline-flex items-start">
              <div class="animate-pulse h-20 w-20 bg-slate-200 rounded"/>
            </div>
          </div>
          <div class="text-center">
            <div class="inline-flex text-slate-800 hover:text-slate-900">
              <h2 class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded"></h2>
            </div>
          </div>
          <div class="text-center">
            <div class="inline-flex text-slate-800 hover:text-slate-900">
              <h2 class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded"></h2>
            </div>
          </div>
        </header>
        <!-- Bio -->
        <div class="text-center">
          <div class="inline-flex text-slate-800 hover:text-slate-900">
            <h2 class="text-xl leading-snug justify-center font-semibold animate-pulse h-3 w-24 bg-slate-200 rounded"></h2>
          </div>
        </div>
      </div>
      <!-- Card footer -->
      <div class="border-t border-slate-200">
        <div class="flex divide-x divide-slate-200r">
          <div class="block flex-1 text-center text-sm text-indigo-500 hover:text-indigo-600 font-medium px-3 py-4" to="/messages">
            <div class="flex items-center justify-center ">
              <span class="animate-pulse h-3 w-24 bg-slate-200 rounded"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PerkCardLoading',
}
</script>