import React, { useState, useEffect } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
// import SwipeableViews from 'react-swipeable-views';

import './SelectionTabs.css';
import DataTable from '../DataTable/DataTable';
import Chart from '../Chart/Chart';
import {fetchTNData, fetchTNGraphData, fetchIndiaData, fetchIndiaGraphData} from '../../api';

const SelectionTabs = () => {
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    // const theme = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            setData(await fetchTNData());
        }
        fetchData();
        const fetchGraphData = async () => {
            setGraphData(await fetchTNGraphData());
        }
        fetchGraphData();
    }, []);

    const handleChange = (event, newVal) => {
        setValue(newVal);
        if(newVal === 0) {
            const fetchData = async () => {
                setData(await fetchTNData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchTNGraphData());
            }
            fetchGraphData();
        } else if(newVal === 1) {
            const fetchData = async () => {
                setData(await fetchIndiaData());
            }
            fetchData();
            const fetchGraphData = async () => {
                setGraphData(await fetchIndiaGraphData());
            }
            fetchGraphData();
        }
    };

    return (
        <div className="tab-container">
            <Paper square className="tab-style">
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Tamil Nadu" />
                    <Tab label="India" />
                    <Tab label="World" />
                </Tabs>
            </Paper>
            {/* <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChange}
                className="swipe"
            > */}
                <DataTable value={value} index={0} data={data} />
                <Chart value={value} index={0} graphData={graphData} />
                <DataTable value={value} index={1} data={data} />
                <Chart value={value} index={1} graphData={graphData} />
                <DataTable value={value} index={2} data={data} />
            {/* </SwipeableViews> */}
        </div>
    );
}

export default SelectionTabs;