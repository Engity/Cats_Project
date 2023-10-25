import React, { useEffect, useState } from "react";
import '../assets/styles/InfoDisplayer.css'
import { useNavigate } from "react-router-dom";
const redirectHandler = (link) => {
    if (window.confirm('This will redirect to another window.\n Would you like to proceed?')) {
        window.location.href = link;
    }
}

const InfoDisplayer = ({ info }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate("/cat/" + id);
    }

    const [currentView, setCurrentView] = useState(0);

    const entriesPerview = 5;
    const viewNext = () => {
        if (currentView + entriesPerview < info.length) {
            setCurrentView(currentView + entriesPerview);
        }
    }

    const viewPrevious = () => {
        if (currentView - entriesPerview >= 0) {
            setCurrentView(currentView - entriesPerview);
        }
    }

    return (
        <div className='InfoDisplayer'>
            {(info && info.length != 0) ?
                <div>
                    <h3 className="TableInfo"> Current View {currentView} to {Math.min(info.length, currentView + entriesPerview)} of {info.length}</h3>
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

                            {info.map((cat, index) => {
                                if (!cat || !cat.breeds) {
                                    return null;
                                }
                                if (index < currentView || index >= currentView + entriesPerview)
                                    return null;
                                let { breeds, url, height, width, id } = cat;
                                if (!breeds) {
                                    return null;
                                }
                                breeds = breeds[0];

                                return (
                                    <tr key={id} className="table-row" onClick={(() => handleClick(index))}>
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
                    </table>
                    <div className="TableTraversal">
                        <center>
                            {currentView - entriesPerview >= 0 ?
                                <button onClick={() => viewPrevious()}>
                                    Prev
                                </button> : <></>}
                            {currentView + entriesPerview < info.length ?
                                <button onClick={() => viewNext()}>
                                    Next
                                </button> : <></>}
                        </center>
                    </div>
                </div> : (
                    <p id="NoData">
                        No data
                    </p>
                )}

        </div>
    );
}

export default InfoDisplayer;