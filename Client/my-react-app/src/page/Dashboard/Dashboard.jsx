import React, { useEffect, useState } from "react";
import Nav from "../nav";
import {getCountInput, getCountInventory,getCountInventoryTotal, getCountDevice} from '../../api/input/input'
import {getCountDisplay} from '../../api/display/display'
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function Dashboard(){

    const [totalinput, setTotalinput] = useState([{
        Statu:"",
        Total:""
      }]);

      const [totalInventory, setTotalInventory] = useState([{
        Os:"",
        Total:""
      }]);

      const [totalInventoryAll, setTotalInventoryAll] = useState([{
        Total:""
      }]);
      

      const [totalDevice, setTotalDevice] = useState([{
        Total:""
      }]);
      const [totalDisplay, setTotalDisplay] = useState([{
        Total:""
      }]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getCountInput();
            setTotalinput(response.data);

            const responseTwo = await getCountInventory();
            setTotalInventory(responseTwo.data);

            const responseThre = await getCountInventoryTotal();
            setTotalInventoryAll(responseThre.data);


            const responseFour = await getCountDevice();
            setTotalDevice(responseFour.data);

            const responsefive = await getCountDisplay();
            setTotalDisplay(responsefive.data);

          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        };
    
        fetchData();
      }, []);
    
console.log(totalInventoryAll)
    return(
        <>
  
        <div style={{ display: 'flex' }}>
<Nav/>
<div style={{ marginLeft: '6%' }}>
            <h1 style={{ textAlign: 'center' }}>DashBoard</h1>


            <Card style={{ width: '95%', marginLeft:50}}>
      <div className="card-content">
        <h2 style={{ textAlign: 'center'}}>Total Employees: {totalInventoryAll.map(item => item.Total) || 0}</h2>

        </div>
        </Card>

<br />
        <Card style={{ width: '95%', marginLeft:50}}>
      <div className="card-content">
        <h2 style={{ textAlign: 'center'}}>Total Devices: {totalDevice.map(item => item.Total) || 0}</h2>

        </div>
        </Card>
<br />
<Card style={{ width: '95%', marginLeft:50}}>
      <div className="card-content">
        <h2 style={{ textAlign: 'center'}}>Total Display: {totalDisplay.map(item => item.Total) || 0}</h2>

        </div>
        </Card>

        <br />
<div style={{ marginLeft: '5%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

            <Card >
      <div className="card-content">
        <h2 style={{ textAlign: 'center' }}>Total Os</h2>
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: totalInventory.map(item => item.Os),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: totalInventory.map(item => item.Total),
              
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </Card>


    <Card style={{ marginLeft: '3%'}}>
      <div className="card-content">
        <h2 style={{ textAlign: 'center' }}>Total Computer</h2>

<BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: totalinput.map(item => item.Statu), // Mapea los nombres de las categorías
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: totalinput.map(item => item.Total), // Mapea los totales
           
          },
        ]}
        width={500}
        height={300}
      />
          </div>
    </Card>
        </div>

        </div>
</div>
        </>
    )

}


export default Dashboard