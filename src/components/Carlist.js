import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

export default function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars))
  }

  const columns = [
    {
      Header: 'Brand',
      accessor: 'brand',
    },
    {
      Header: 'Model',
      accessor: 'model',
    },
    {
      Header: 'Color',
      accessor: 'color',
    },
    {
      Header: 'Fuel',
      accessor: 'fuel',
    },
    {
      Header: 'Fuel',
      accessor: 'fuel',
    },
    {
      Header: 'Year',
      accessor: 'year',
    },
    {
      Header: 'Price',
      accessor: 'price',
    },
  ]

  return (
    <div>
      <ReactTable filterable={true} data={cars} columns={columns} />
    </div>
  )
}