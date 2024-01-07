import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import SideMenu from './SideMenu';

const Attendance = ({ showMenu, setShowMenu, handleMenu }) => {
  const attend = JSON.parse(localStorage.getItem('attendance')) || [];
  const [tableData, setTableData] = useState(attend);

  const handleAddExcel = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const formattedData = jsonData.slice(1).map((row) => ({
        ID: row[0],
        Name: row[1],
        Jan: row[2],
        Feb: row[3],
        Mar: row[4],
        Apr: row[5],
        May: row[6],
        Jun: row[7],
        Jul: row[8],
        Aug: row[9],
        Sep: row[10],
        Oct: row[11],
        Nov: row[12],
        Dec: row[13],
      }));

      setTableData(formattedData);
      localStorage.setItem('attendance', JSON.stringify(formattedData));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} handleMenu={handleMenu} />
      <div className='top'>
        <input type="file" accept=".xlsx, .xls" onChange={handleAddExcel} className='files-input' />
      </div>
      <div className='attendance-container'>
        <div className='attendance'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.ID}</td>
                  <td>{row.Name}</td>
                  <td>{row.Jan}</td>
                  <td>{row.Feb}</td>
                  <td>{row.Mar}</td>
                  <td>{row.Apr}</td>
                  <td>{row.May}</td>
                  <td>{row.Jun}</td>
                  <td>{row.Jul}</td>
                  <td>{row.Aug}</td>
                  <td>{row.Sep}</td>
                  <td>{row.Oct}</td>
                  <td>{row.Nov}</td>
                  <td>{row.Dec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
