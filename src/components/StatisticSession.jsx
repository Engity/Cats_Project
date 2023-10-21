import React, { useEffect } from "react";
import '../assets/styles/StatisticSession.css'

const StatisticSession = ({ stat }) => {
    const title = {
        number: "Number of entries",
        origins: "Number of origins",
        minWeight: "Minimum weight",
        maxWeight: "Maximum weight",
        avgWeight: "Average weight"
    }

    return (
        <div className="StatisticSession">
            {stat ?
                Object.keys(stat).map((key) => {
                    return (key == 'origins') ?
                        <div key={key} className="stat">
                            {title[key]}: {stat[key].size - 1}
                        </div>
                        :
                        <div key={key} className="stat">
                            {title[key]}: {stat[key]}
                        </div>

                })
                : null

            }
        </div>
    );
}

export default StatisticSession;