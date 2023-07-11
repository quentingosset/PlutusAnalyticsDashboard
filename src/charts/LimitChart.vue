<template>
  <div class="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200">
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800" v-text="title"></h2>
    </header>
    <div class="grow flex flex-col justify-center">
        <apexchart class="d-flex justify-content-center" ref="chart" :width="width" :height="height" :options="chartOptions" :series="series"></apexchart>
      <div class="px-5 pt-2 pb-6">
        <div ref="legend" class="flex flex-wrap justify-center -m-1">
          <span>{{formatValue(series[0])}} / {{formatValue(series[0] + series[1])}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {formatValue} from "../utils/Utils";

export default {
  name: 'DonutChart',
  methods: {formatValue},
  props: ['title','series', 'width', 'height', 'labels'],
  setup(props) {

    //const chart = ref(null)
    const legend = ref(null)
    let chartOptions = {
      chart: {
        type: "donut",
        redrawOnParentResize: true
      },
      labels: props.labels,
      tooltip: {
        enabled: false
      },
      //colors: ["rgba(37 99 235)", "rgba(52 211 153)"],
      //colors: ["rgba(244,63,94,0.85)", "rgba(52,211,153,0.85)"],
      //colors: ["rgba(244,63,94,0.87)", "rgba(37,99,235,0.85)"],
      colors: ["rgba(252,211,77,1)", "rgba(37,99,235,0.85)"],
      states: {
        active: {
          filter: {
            type: 'none' /* none, lighten, darken */
          }
        },
        hover: {
          filter: {
            type: 'lighten',
          }
        },
      },
      plotOptions: {
        pie: {
          customScale: 1,
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                formatter: function (val) {
                  return val
                }
              },
              value: {
                show: true,
                fontSize: '16px',
                formatter: function (val) {
                  return formatValue(val)
                }
              },
              total: {
                show: true,
                label: 'Unspend',
                formatter: function (val) {
                  return formatValue(val.globals.series.reduce((a, b) => {
                    return b
                  }, 0));
                }
              }
            }
          }
        }
      },
      dataLabels: {
        style: {
          colors: ['#fff']
        },
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 2,
          opacity: 1
        }
      },
      legend: {
        show: false
      }
    }
    let type = "donut"


    return {
      chartOptions,
      legend,
      type
    }
  }
}
</script>