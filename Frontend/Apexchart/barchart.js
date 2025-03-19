var options = {
    chart: {
        type: 'bar',
        height: 350
    },
    series: [{
        name: '매출',
        data: [500, 800, 650, 1200, 1800, 2200, 1500, 2300, 2900]
    }],
    xaxis: {
        categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월']
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();