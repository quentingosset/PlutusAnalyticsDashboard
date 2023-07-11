<template>
  <router-view />
</template>

<script>

export default {
  setup() {
    function refreshLocalStorage(){
      chrome.storage.local.get(null, function(items) {
        for (const key in items) {
          localStorage.setItem(key,items[key]);
        }
      });
      setTimeout(refreshLocalStorage, 21000);
    }
    if(import.meta.env.MODE === "production"){
      refreshLocalStorage();
    }

    return {}
  }
}
</script>

