<template>
  <div class="relative" :class="$style.container">
    <flat-pickr class="form-input pl-9 text-slate-500 rounded-none hover:text-slate-600 font-medium focus:border-slate-300" :config="config" v-model="date" placeholder="Select a date"></flat-pickr>
    <div class="absolute inset-0 right-auto flex items-center pointer-events-none">
      <svg class="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
        <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
      </svg>
    </div>
  </div>
</template>
<style lang="scss" module>
.container :global {

  .flatpickr-current-month{
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
<script>
import flatPickr from 'vue-flatpickr-component'
import dayjs from 'dayjs';
import {ref} from 'vue'

export default {
  name: 'Datepicker',
  props: {
    align: String,
    dateStart: dayjs,
    dateEnd: dayjs,
  },
  emits: ['refreshFilter'],
  setup (props,context) {
    const dateStart = props.dateStart? ref(props.dateStart) : ref(dayjs());
    const dateEnd = props.dateEnd? ref(props.dateEnd) : ref(dayjs());
    //const date = computed(() => [dateStart.value.format('MMM DD, YYYY'),dateEnd.value.format('MMM DD, YYYY')])
    const date = ref([dateStart.value.format('MMM DD, YYYY'),dateEnd.value.format('MMM DD, YYYY')]);
    return {
      date,
      config: {
        mode: 'range',
        static: true,
        monthSelectorType: 'dropdown',
        dateFormat: 'M j, Y',
        defaultDate: [dateStart.value.format('MMM DD, YYYY'),dateEnd.value.format('MMM DD, YYYY')],
        prevArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
        nextArrow: '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
        onReady: (selectedDates, dateStr, instance) => {
          instance.element.value = dateStr.replace('to', '-');
          const customClass = (props.align) ? props.align : '';
          instance.calendarContainer.classList.add(`flatpickr-${customClass}`)
          instance.monthsDropdownContainer.classList.remove(...instance.monthsDropdownContainer.classList);
          instance.monthsDropdownContainer.classList.add(`form-select`);
        },
        onChange: function(selectedDates, dateStr, instance) {
          instance.element.value = dateStr.replace('to', '-');
        },
        onClose: (selectedDates, dateStr, instance) => {
          instance.element.value = dateStr.replace('to', '-');
          if(selectedDates.length === 1){
            dateStart.value = dayjs(dateStart.value);
            dateEnd.value = dayjs(dateEnd.value);
            // NO NEED REFRESH WE DON'T CHANGE ANY THING
          }else{
            dateStart.value = dayjs(selectedDates[0]).startOf('D');
            dateEnd.value = dayjs(selectedDates[1]).endOf('D');
            context.emit('refreshFilter', [dateStart.value,dateEnd.value]);
          }
        }
      },
    }
  },
  methods: {
  },
  watch: {
    /*dateEnd(){
      console.log("date Uopdate",this.dateStart,this.dateEnd);
      this.date = [this.dateStart.value.format('MMM DD, YYYY'),this.dateEnd.value.format('MMM DD, YYYY')];
    }*/
  },
  components: {
    flatPickr
  },
}
</script>
