import { useState, useLayoutEffect, useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import axios from "axios";
import InfoDisplayer from './components/InfoDisplayer';
import StatisticSession from './components/StatisticSession';
import DisplayCard from './components/DisplayCard';
import ChartContainer from './components/ChartContainer';
const API_KEY = import.meta.env.VITE_API_KEY

const fetchData = async (action, limit = 1) => {
    await axios.get('https://api.thecatapi.com/v1/images/search?limit=' + limit + '&api_key=' + API_KEY + '&has_breeds=1').then(
        (res) => {
            action(res);
        }
    );
}

function App() {
    const [fetchInfo, setFetchInfo] = useState([])
    const [filterData, setFilterData] = useState([])
    const [activeFilters, setActiveFilters] = useState(-1)
    const [filters, setFilters] = useState({
        name: '',
        origin: '',
        minWeight: '',
        maxWeight: '',
    })

    const [statistic, setStatistic] = useState({
        origins: new Set(),
        minWeight: 0,
        maxWeight: 0,
        avgWeight: 0,
    });

    const textFilterRef = useRef(0);
    const minWeightFilterRef = useRef(0);
    const maxWeightFilterRef = useRef(100);
    const originRef = useRef(0);

    const processData = (data) => {
        let number = data.length;
        let origins = new Set();
        let minWeight = 1000;
        let maxWeight = 0;
        origins.add('None');
        let avg = 0;
        data.map((cat) => {
            let breedInfo = cat.breeds[0];
            origins.add(breedInfo.origin);
            let weight = breedInfo.weight.imperial.split(" - ");

            minWeight = Math.min(weight[0], minWeight);
            maxWeight = Math.max(weight[1], maxWeight);
            avg += (parseFloat(weight[0]) + parseFloat(weight[1])) / 2;
           
        });

        setStatistic({
            ...statistic,
            origins: origins,
            minWeight: minWeight,
            maxWeight: maxWeight,
            avgWeight: avg / number,
        })

        setFetchInfo(data);
        setFilterData(data);
    }

    useLayoutEffect(() => {
        // Fetch data from API
        fetchData((response) => {
            processData(response.data);

        }, 10)

        // processData(JSON.parse(import.meta.env.VITE_FETCH_DATA));
    }, []);


    const filtering = () => {
        if (activeFilters < 0) {
            // setFilterData(fetchInfo);
            return;
        }
        let data = fetchInfo.filter((entry) => {
            let res = true;
            Object.keys(filters).map((filter) => {
                let value = filters[filter];
                if (value == '' || value == 'None') {
                    return true;
                }
                if (filter.includes('Weight')) {
                    let weight = entry.breeds[0].weight.imperial.split(" - ");
                    if (filter.includes('min')) {
                        res = res && (value <= weight[0])
                    }
                    else {
                        res = res && (value >= weight[1])
                    }
                    return true;
                }
                value = value.toLowerCase();
                let breedInfo = entry.breeds[0];
                // console.log(filter, breedInfo, breedInfo[filter].toLowerCase().includes(value));
                res = res && breedInfo[filter].toLowerCase().includes(value);

                return true;
            })
            return res;
        });

        setFilterData(data);
    }

    useEffect(() => {
        filtering();
    }, [filters, activeFilters]);

    const updateFilter = (key, ref) => {
        if (activeFilters < 0) {
            setActiveFilters(1);
        } else {
            if (filters[key] == '' && ref.current.value != '') {
                setActiveFilters(activeFilters + 1);
            }

            if (filters[key] != '' && ref.current.value == '') {
                setActiveFilters(activeFilters - 1);
            }
        }

        setFilters({
            ...filters,
            [key]: ref.current.value,
        });
    }


    return (
        <div className="App">
            <h1>Learn more about cats!</h1>
            <div style={{ display: 'flexbox' }}>
                <StatisticSession stat={statistic} />
                <br></br>
                <div className='ChartAndFilterContainer'>
                    <div className='FilterSection'>
                        <h2>Filters</h2>
                        <p>Search: </p>
                        <input className='Filter' type='text' ref={textFilterRef} onChange={() => updateFilter('name', textFilterRef)} />
                        <br></br>
                        <p>Origin:</p>
                        <select ref={originRef} className='Filter' onChange={() => updateFilter('origin', originRef)}>
                            {true ? [...statistic.origins].map((origin) => {
                                return <option key={origin} value={origin}>{origin}</option>
                            }) : <null></null>
                            }
                        </select>

                        <p>Min Weight</p>
                        <input className='Filter'
                            type='number' ref={minWeightFilterRef} placeholder={statistic.minWeight}
                            onChange={() => updateFilter('minWeight', minWeightFilterRef)}
                        />

                        <p>Max Weight</p>
                        <input className='Filter'
                            type='number' ref={maxWeightFilterRef} placeholder={statistic.maxWeight}
                            onChange={() => updateFilter('maxWeight', maxWeightFilterRef)}
                        />


                    </div>
                    <ChartContainer stat={fetchInfo} />
                </div>
                <br></br>

                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<InfoDisplayer
                                info={filterData}
                            />} />
                            <Route path="cat/:id" element={<DisplayCard info={filterData} />}></Route>
                        </Route>
                    </Routes>

                </BrowserRouter>

            </div>
        </div>
    )
}

export default App

