import gui from 'nw.gui';
import Chart from 'Chart.js';

import {
    Titlebar
}
from '../_js/Titlebar.js';



document.addEventListener("DOMContentLoaded", (event) => {
    new Titlebar({
        target: document.querySelector("#top-titlebar")
    });
    gui.Window.get().show();
    //
    //     let [gauge1, gauge2, gauge3] = [1, 2, 3].map((value) => {
    //         return new JustGage({
    //             id: "gauge" + value
    //         });
    //     });
    //
    //     let [term1, term2, term3] = [1, 2, 3].map((value) => {
    //         new Thermometer(document.querySelector("#option-" + value));
    //         return value;
    //     });
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
