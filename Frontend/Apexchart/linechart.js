var options = {
    chart: {
        type: 'line',
        height: 350,
        // zoom: {
        //     enabled: true
        // }
    },
    series: [{
        name: '판매량',
        data: [10, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
        categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월']
    },
    dataLabels: {
        enabled: true
    },
    tooltip: {
        enabled: true
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();