import React, { useState, useEffect } from "react";
import { Box} from '@material-ui/core';
import Table from '../Components/table';
import { tablesFromJSON, ordersFromJSON } from '../utils/read';



export const Home = () =>{
    const [allCombinations, setAllCombinations] = useState([]);
    const [tables, setTables] = useState(tablesFromJSON);
    const orders = [8,3,4]

    useEffect(()=>{
        
        // getAllConnections();
        // setTableFreeSeatsByNumber(301, 0);
       orders.forEach(order=>{
           matchTables(order);
       })

    },[]);    
    
    
    function getBiggestCombinationOfTable(tableNumber){
        var sum = 0;
        const combinations = [];
        const currentTable = getTableByNumber(tableNumber);
        tables.forEach(table=>{
            if(table.concat?.includes(tableNumber) ){
                sum+=table.diners;
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
    function getCombinationforDiners(diners){
        var freeSeats = diners;
        console.log('allCombinations: ', allCombinations);
        var options = allCombinations.filter(com =>  (com?.sum >= diners));
        console.log('line 42 options: ',options)
        if(options.length > 1){
            options.forEach(option=>{
                console.log("option: ",option);
                if(isCombinationAvailable(option.combinations)){
                    var i=0;
                    var biggerThanSpace = true;
                    while(biggerThanSpace && i<option.combinations.length){
                        setTableFreeSeatsByNumber(option.combinations[i++], 0);
                        biggerThanSpace = (freeSeats - getTableByNumber(option.combinations[i-1]).diners) > getTableByNumber(option.combinations[i]); 
                    }
                    if(!biggerThanSpace ){
                        setTableFreeSeatsByNumber(option.combinations[i], getTableByNumber(option.combinations[i]).diners - freeSeats);
                    }
            return option.combinations;
                }
                else {
                    //waiting list
                }
            });
        }
    }

    function getTableByNumber(tableNumber){
        return tables[tables.findIndex(table=>(table.number === tableNumber))];
    }
    function setTableFreeSeatsByNumber(tableNumber, freeSeats){
        setTimeout(()=>{
            const newTables =tables;
            
            const tableIndex = newTables.findIndex(table => (table.number == tableNumber));
            if(tableIndex != -1){
            console.log('table index = ',tableIndex);
            newTables[tableIndex].freeSeats = freeSeats;
            newTables[tableIndex].available = false ;
            newTables[tableIndex].start = Date.now() ;
            
            console.log('table should be unavailable ', tableNumber)
            setTables(newTables);
            }
        },100)

    }
    function isTableAvailable(tableNumber){
        return getTableByNumber(tableNumber).available;
    }
    function isCombinationAvailable(combination){
     var available = true;
     combination.forEach(table=> {
         if(!isTableAvailable(table)){
             available = false;
         }
     })
    }

    function isConcatAvailable(tableNumber){
        var available = true
        getTableByNumber(tableNumber)?.concat.forEach(con => {
            if(!isTableAvailable(con)){
                available = false;
            }
        });
        return available;

    }
    
    


    function matchTables(diners){
        var seated = true;
        const toBeSeated = tables.find(table =>{
            const maxSeats = getBiggestCombinationOfTable(table.number);
            return maxSeats.biggestCombination == diners ;

        });
        console.log('toBeSeated: ', toBeSeated);
        setTableFreeSeatsByNumber(toBeSeated?.number,0);
        toBeSeated.concat.forEach(con=>{
            setTableFreeSeatsByNumber(con,0);
        })
     
        
    }
    const displayTables= () =>{
        return  tables.map((newTable,i )=> {
            console.log('build table: ',newTable)

             return (
             <div key={i}>
                 <Table number={newTable.number} diners={newTable.diners} concat={newTable.concat} freeSeats={newTable.freeSeats} start={newTable.start} ></Table>
                 </div>
                 );
 
         })
     }
      
     return (
        <Box fullwidth={true} sx={{
            display: 'grid',
            columnGap: '20vh',
            rowGap: '10vh',
            gridTemplateColumns: 'repeat(4, 1fr)',
            alignItems: 'center', 
            
        }} >
                {displayTables()}
        </Box>
     );


}
export default Home;