import gui from 'nw.gui';

import Chart from 'chartjs';

import {
    Titlebar
}
from './Titlebar.js';

import Thermometer from './Thermometer.js';

var data = {
    labels: Array.apply(null, Array(100)).map(function(){return 0;}),
    datasets: [{
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data:  Array.apply(null, Array(100)).map(function(){return 0;})

    }, {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
    }]
};

document.addEventListener("DOMContentLoaded", (event) => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).Line(data);
    new Titlebar({
        target: document.querySelector("#top-titlebar")
    });
    gui.Window.get().show();
    //
    /*let [gauge1, gauge2, gauge3] = [1, 2, 3].map((value) => {
        return new JustGage({
            id: "gauge" + value
        });
    });*/
    //
    let [term1, term2, term3] = [1, 2, 3].map((value) => {
        new Thermometer(document.querySelector("#option-" + value));
        return value;
    });
    //
    //     setInterval((argument) => {
    //         myLineChart.update({
    //             labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    //             series: [
    //                 [getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100), getRandomInt(0, 100)],
    //                 [2, 1, 3.5, 7, getRandomInt(0, 100)],
    //                 [1, 3, 4, 5, getRandomInt(0, 100)]
    //             ]
    //         });
    //         gauge1.refresh(getRandomInt(0, 100));
    //         term1.change(getRandomInt(0, 100));
    //         term2.change(getRandomInt(0, 100));
    //         term3.change(getRandomInt(0, 100));
    //         gauge2.refresh(getRandomInt(0, 100));
    //
    //         gauge3.refresh(getRandomInt(0, 100));
    //
    //     }, 1000);
    //
});
