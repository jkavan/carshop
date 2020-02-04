import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export default function Carlist() {
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err));
  }

  const deleteCar = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(response => fetchData())
      .catch(err => console.error(err));
      setOpen(true);
    }
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
    {
      accessor: '_links.self.href',
      filterable: false,
      sortable: false,
      width: 100,
      Cell: row => <Button color="secondary" size="small" onClick={() => deleteCar(row.value)}>Delete</Button>
    }
  ]

  return (
    <div>
      <ReactTable filterable={true} data={cars} columns={columns} />
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message={<span id="message-id">Car deleted</span>}
      />
    </div>
  )
}