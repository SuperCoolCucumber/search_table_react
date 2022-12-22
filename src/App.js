import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function SearchableTable() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('http://127.0.0.1:5000/data.json')
      // .then((response) => console.log(response.json()))
      .then((response) => response.json())
      .then((data) => {
        // Set the rows state variable
        setRows(data);
      });
  }, []);

  useEffect(() => {
    // Filter the rows whenever the search term changes
    setFilteredRows(
      rows.filter((row) => row.word.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, rows]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">corpus</TableCell>
            <TableCell align="right">word</TableCell>
            <TableCell align="left">context</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.corpus}</TableCell>
              <TableCell align="right">{row.word}</TableCell>
              <TableCell align="left">{row.context}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
