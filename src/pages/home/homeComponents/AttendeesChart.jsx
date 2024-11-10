import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dataPoint } from '../../../utils/data';


function AttendeesChart() {
    const [series, setSeries] = useState([{
        data: [...dataPoint]
    }]);

    const [options, setOptions] = useState({
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 250,
            zoom: {
                autoScaleYaxis: true
            }
        },
    colors: ["#FC6435"],
        annotations: {
            yaxis: [],
            xaxis: []
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        yaxis: {
            show: false // Hide y-axis
        },
        xaxis: {
            type: 'datetime',
            // tickAmount: 1,
        },
        grid: {
            xaxis: {
              lines: {
                show: false
              }
            },
            yaxis: {
              lines: {
                show: false
              }
            },
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'solid',
            opacity: 1
        },
        stroke: {
            show: false,
            curve: 'smooth'
        },

    });

    const [selection, setSelection] = useState('one_week');

    const updateData = (timeline) => {
        setSelection(timeline);
        switch (timeline) {
            case 'one_month':
                ApexCharts.exec('area-datetime', 'zoomX', new Date('1 Jan 2013').getTime(), new Date('30 Jan 2013').getTime());
                break;
            case 'one_week':
                ApexCharts.exec('area-datetime', 'zoomX', new Date('1 Jan 2013').getTime(), new Date('7 Jan 2013').getTime());
                break;
            case 'one_day':
                ApexCharts.exec('area-datetime', 'zoomX', new Date('1 Jan 2013').getTime(), new Date('1 Jan 2013').getTime());
                break;
            default:
        }
    };


    return (
        <div>
            <div id="chart" className='dashboard--card'>
                <div className="toolbar">
                    <button id="one_month" onClick={() => updateData('one_month')} className={selection === 'one_month' ? 'active' : ''}>Monthly</button>
                    <button id="one_week" onClick={() => updateData('one_week')} className={selection === 'one_week' ? 'active' : ''}>Weekly</button>
                    <button id="one_day" onClick={() => updateData('one_day')} className={selection === 'one_week' ? 'active' : ''}>Daily</button>
                </div>
                <div id="chart-timeline">
                    <ReactApexChart options={options} series={series} type="area" height={250} />
                </div>
            </div>
            <div id="html-dist"></div>
        </div>
    );

}

export default AttendeesChart