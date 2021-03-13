export const TRASH_STATS_SETTINGS = {
  title: {
    text: '',
  },
  legend: {
    data: [],
    align: 'left',
    top: 20,
  },
  tooltip: {},
  grid: {
    width: 'auto',
    height: 'auto',
  },
  xAxis: {
    name: 'Dani',
    data: [],
    type: 'category',
    nameLocation: 'middle',
    nameTextStyle: {
      padding: 20,
    },
    interval: 1,
  },
  yAxis: {
    name: 'KG',
    nameLocation: 'middle',
    nameTextStyle: {
      padding: 20,
    },
  },
  series: [
    {
      name: '',
      type: 'bar',
      data: [],
      color: 'green',
      animationDelay: (idx) => idx * 10,
    },
    {
      name: '',
      type: 'bar',
      data: [],
      animationDelay: (idx) => idx * 10,
    },
  ],
  animationEasing: 'elasticOut',
};

