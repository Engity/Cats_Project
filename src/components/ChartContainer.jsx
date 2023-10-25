import React, { useEffect, useState } from "react";
import '../assets/styles/ChartContainer.css'
import { Background, VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from 'victory';

// Chart Doc: https://formidable.com/open-source/victory/docs/

const ChartContainer = ({ stat }) => {
    // const [data, setData] = useState([]);
    const data = [];

    //Process the raw data

    const avgWeightData = new Map();
    const countOrigin = new Map();
    stat.map((cat) => {
        const breedInfo = cat.breeds[0];
        const key = breedInfo.origin;
        let weight = breedInfo.weight.imperial.split(" - ");
        const avgWeight = (parseFloat(weight[0]) + parseFloat(weight[1])) / 2;

        let val = avgWeightData.get(key);
        let count = countOrigin.get(key);
        if (!val) {
            val = 0;
            // avgWeightData.set(key, val);
        }
        if (!count) {
            count = 1;
            countOrigin.set(key, 1);
        }
        else {
            countOrigin.set(key, count + 1);
        }
        avgWeightData.set(key, val + avgWeight);
    });

    let tmpData = [];
    avgWeightData.forEach((val, key) => {
        const tmp = {
            origin: key,
            avgWeight: (val / countOrigin.get(key)),
        }
        console.log(tmp);
        data.push(tmp);
        // tmpData.push(tmp);
    });
    // setData(tmpData);
    // console.log(data, countOrigin, avgWeightData);


    return (
        <div className="ChartContainer">
            <h2>Average Weight based on Country Chart</h2>

            <VictoryChart className="chart"
                domainPadding={10}
                style={{
                    background: { fill: 'rgba(248, 249, 229, 0.4)' },
                    labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 },
                }}
            >

                <VictoryBar
                    alignment="start"
                    data={data}
                    x="origin"
                    y="avgWeight"
                    style={{ 
                        // labels: { fill: "blue" },
                        labels: { fontSize: ({ text }) => text.length > 10 ? 8 : 12 },
                        parent: { border: "1px solid #ccc", fontSize: 12}, 
                    }}
                    labelComponent={<VictoryLabel dx={24} />}
                    labels={({ datum }) => {
                        return `${datum.avgWeight.toFixed(1)}`
                    }}
                // width={1500}
                />
            </VictoryChart>

        </div>
    );
}

export default ChartContainer;