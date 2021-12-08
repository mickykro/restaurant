// Written by: Michael Kroitoro
// restaurant reservations program

import React, { useState, useEffect } from "react";
import { Box } from '@material-ui/core';
import axios from "axios";
import Table from '../Components/table';
import { tablesFromJSON, OrdersFromJSON } from '../utils/read';
import { writeFile } from '../utils/writeFile';




export const Home = () => {
    const [tables, setTables] = useState([]);
    const [displayTables, setDisplayTables] = useState([])
    const [waitingList, setWaitingList] = useState([]);
    const [initialWaitingList, setInitialWaitingList] = useState(true)
    const [completed, setCompleted] = useState([]);
    const [written, setWritten] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // use effect to update the build of tables and start serving orders
    useEffect(() => {
        setDisplayTables(displayTablesDesign());
        orders.forEach(order => {
            serveWaitingList(order);
        });
        setInitialWaitingList(false);

    }, [loading]);

    // manipulate incoming json to match interal code
    function ordersManipulation(manipulate) {
        return manipulate.map((order) => {

            return (
                {
                    mobile: order.Mobile,
                    diners: order.Diners
                }
            )
                ;
        })
    }
    // manipulate incoming json to match interal code and use 
    function floorManipulation(manipulate) {
        return manipulate.map(table => {

            return (
                {
                    number: table.Table,
                    diners: table.Diners,
                    concat: table.Concat,
                    available: true,
                    freeSeats: table.Diners,
                    openDialog: false,
                    start: 0,
                    mobile: 0,
                }
            );

        })
    }

    // use effect to get orders and tables from server
    useEffect(() => {
        OrdersFromJSON().then(res => {
            const ordersArray = res.data;
            setOrders(ordersManipulation(ordersArray));

        });
        tablesFromJSON().then(res => {
            const tablesArray = res.data;

            setTables(floorManipulation(tablesArray));
            setDisplayTables(displayTablesDesign());
            setLoading(false);
        });


    }, [])


    // use effect to track tables changes
    useEffect(() => {
        if (tables) {
            const emptyTables = tables.filter(table => (table.freeSeats < table.diners));
            if (emptyTables.length == 0 && !written && !initialWaitingList && completed.length != 0) {

                const completed_sorted = new Map(completed.map(obj => [obj['mobile'], obj])).values();
                axios.post('http://localhost:3001/add', { json: completed_sorted }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                writeFile(completed_sorted);
                setWritten(true);
            }
            waitingList.forEach(waiter => {
                setWaitingList(waitingList.filter(wait => (wait.mobile !== waiter.mobile)))
                serveWaitingList(waiter);

            });
        }

    }, [displayTables])


    function getBiggestCombinationOfTable(tableNumber) {
        var sum = 0;
        const combinations = [];
        const currentTable = getTableByNumber(tableNumber);
        tables.forEach(table => {
            if (table.concat?.includes(tableNumber)) {
                sum += table.diners;
                combinations.push(table.number);
            }
        });
        sum += currentTable.diners;
        combinations.push(currentTable.number);
        return {
            biggestCombination: sum,
            combinations
        }
    }


    function getTableByNumber(tableNumber) {
        return tables[tables.findIndex(table => (table.number === tableNumber))];
    }
    function setTableFreeSeatsByNumber(tableNumber, freeSeats, mobile) {

        const newTables = tables;

        const tableIndex = newTables.findIndex(table => (table.number == tableNumber));
        if (tableIndex != -1) {
            newTables[tableIndex].freeSeats = freeSeats;
            newTables[tableIndex].available = false;
            newTables[tableIndex].mobile = mobile;
            newTables[tableIndex].start = newTables[tableIndex].freeSeats < newTables[tableIndex].diners ? Date.now() : 0;

            setTables(newTables);
            setDisplayTables(displayTablesDesign());
        }



    }
    function isTableAvailable(tableNumber) {
        return getTableByNumber(tableNumber).freeSeats > 0;
    }

    function isConcatAvailable(tableNumber) {
        var available = true
        getTableByNumber(tableNumber)?.concat.forEach(con => {
            if (!isTableAvailable(con)) {
                available = false;
            }
        });
        return available;

    }





    function serveWaitingList(order) {
        var seated = true;
        var toBeSeated = tables.find(table => { return table.diners >= order.diners && isTableAvailable(table.number); });
        if (toBeSeated) {
            setTableFreeSeatsByNumber(toBeSeated.number, toBeSeated.diners - order.diners, order.mobile);
        }
        else {
            toBeSeated = tables.find(table => {
                const concatAvailable = isConcatAvailable(table.number);
                const maxSeats = getBiggestCombinationOfTable(table.number);
                return maxSeats.biggestCombination == order.diners && isConcatAvailable(table.number);

            });
            if (toBeSeated) {

                setTableFreeSeatsByNumber(toBeSeated?.number, 0);
                toBeSeated.concat.forEach(con => {
                    setTableFreeSeatsByNumber(con, 0);

                })
            } else {
                setWaitingList([...waitingList, order]);
            }
        }



    }
    const displayTablesDesign = () => {
        return tables.map((newTable, i) => {
            return (
                <div key={i}>
                    <Table number={newTable.number}
                        diners={newTable.diners}
                        concat={newTable.concat}
                        freeSeats={newTable.freeSeats}
                        start={newTable.start}
                        setFreeSeats={setTableFreeSeatsByNumber}
                        completed={completed}
                        setCompleted={setCompleted}
                        mobile={newTable.mobile}
                    ></Table>
                </div>
            );

        })
    }

    return (
        <Box fullwidth='true' sx={{
            display: 'grid',
            columnGap: '20vh',
            rowGap: '10vh',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'center',

        }} >
            {loading && <h1>loading...</h1>}
            {!loading && displayTables}
        </Box>
    );


}
export default Home;