
import React, {Fragment} from 'react';
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto";
import {useSelector} from "react-redux";

const BarChart = () => {

    let widget = useSelector((state) => state.widget);
return(
    <Fragment>
        {console.log(widget)}
        {console.log(widget.Data)}

        <Bar
                 data={{
                     labels:widget.label,
                     datasets: [{
                         label: widget.WidgetNamee,
                         data: widget.Data,
                         backgroundColor: [
                             'rgba(255, 99, 132, 0.2)',
                             'rgba(54, 162, 235, 0.2)',
                             'rgba(255, 206, 86, 0.2)',
                             'rgba(75, 192, 192, 0.2)',
                             'rgba(153, 102, 255, 0.2)',
                             'rgba(255, 159, 64, 0.2)'
                         ],
                         borderColor: [
                             'rgba(255, 99, 132, 1)',
                             'rgba(54, 162, 235, 1)',
                             'rgba(255, 206, 86, 1)',
                             'rgba(75, 192, 192, 1)',
                             'rgba(153, 102, 255, 1)',
                             'rgba(255, 159, 64, 1)'
                         ],
                         borderWidth: 1
                     }]
                 }}
                  height={300} width={300}/>
    </Fragment>
)
}
export default BarChart