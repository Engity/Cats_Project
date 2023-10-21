import React, { useEffect } from "react";
import '../assets/styles/InfoDisplayer.css'

const redirectHandler = (link) => {
    if (window.confirm('This will redirect to another window.\n Would you like to proceed?')) {
        window.location.href = link;
    }
}

const InfoDisplayer = ({ info }) => {

    return (
        <div className='InfoDisplayer'>
            {(info && info.length != 0) ?
                <table className="InfoTable">
                    <thead>

                    </thead>
                    <tbody>
                        <tr className="table-header">
                            <th className="col col-1">Name</th>
                            <th className="col col-2">Origin</th>
                            <th className="col col-3">Weight</th>
                            <th className="col col-4">Image</th>
                            {/* <th>Name</th>
                            <th>Origin</th>
                            <th>Weight</th>
                            <th>Image</th> */}
                        </tr>

                        {info.map((cat) => {
                            let { breeds, url, height, width, id } = cat;
                            if (!breeds) {
                                return null;
                            }
                            breeds = breeds[0];

                            return (
                                <tr key={id} className="table-row">
                                    <td className="col col-1">{breeds.name}</td>
                                    <td className="col col-2">{breeds.origin}</td>
                                    <td className="col col-3">{breeds.weight.imperial}</td>
                                    <td className="col col-4"><img src={url} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table> : (
                    <p id="NoData">
                        No data
                    </p>
                )}

        </div>
    );
}

export default InfoDisplayer;