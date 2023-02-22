# react-condensed

> A fully customisable react component to build tables and datagrids

## Install

```bash
npm i --save react-condensed
```

## Features

<ol>
  <li>Lightweight (~90kb)</li>
  <li>Fully customisable</li>
  <li>Selectable rows</li>
  <li>Search, Sort (by string | number | date), Filter</li>
  <li>Pass your components in table-cells (td)</li>
  <li>Handle click on rows</li>
  <li>Pagination</li>
  <li>Have table with fixed height</li>
  <li>Set number of rows to be shown in each page</li>
  <li>Add your custom loading components</li>
</ol>

## Usage

```JSX
import React from "react";
import { Table } from "react-condensed";

const App = () => {

  const Columns = [
    {
      name: "Name",
      accessor: (row) => row.firstName + row.lastName,
      searchable: true,
    },
    {
      name: "Age",
      accessor: "age",
    },
    {
      name: "Gender",
      accessor: "gender",
    },
    {
      name: "Email",
      accessor: "email",
    },
  ];

  const data = [
    {
      id: 1,
      firstName: "Terry",
      lastName: "Medhurst",
      age: 50,
      gender: "male",
      email: "atuny0@sohu.com",
    },
    {
      id: 2,
      firstName: "Sheldon",
      lastName: "Quigley",
      age: 28,
      gender: "male",
      email: "hbingley1@plala.or.jp",
    },
    {
      id: 3,
      firstName: "Terrill",
      lastName: "Hills",
      age: 38,
      gender: "male",
      email: "rshawe2@51.la",
    },
    {
      id: 4,
      firstName: "Miles",
      lastName: "Cummerata",
      age: 49,
      gender: "male",
      email: "yraigatt3@nature.com",
    },
    {
      id: 5,
      firstName: "Mavis",
      lastName: "Schultz",
      age: 38,
      gender: "male",
      email: "kmeus4@upenn.edu",
    },
  ];

  return (
    <Table
      columns={Columns}
      data={data}
      styleVariables={{ "font-family": "cursive" }}
    />
  );
};

export default App;

```

## Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data</td>
      <td>object [ ]</td>
      <td>[ ]</td>
      <td>data record array to be rendered.</td>
    </tr>    
    <tr>
      <td>columns</td>
      <td>object [ ]</td>
      <td>[ ]</td>
      <td>the columns config of table, object values are defined below.</td>
    </tr>
     <tr>
      <td>uniqueTableField</td>
      <td>string</td>
      <td>" "</td>
      <td>to be used as keys for rows.</td>
    </tr>
    <tr>
      <td>numberOfRows</td>
      <td>number</td>
      <td>25</td>
      <td>to be used as keys for rows.</td>
    </tr>
    <tr>
      <td>usePagination</td>
      <td>boolean</td>
      <td>false</td>
      <td>enable or disable pagination.</td>
    </tr>
    <tr>
      <td>searchPlaceholder</td>
      <td>string</td>
      <td>"Search here ..."</td>
      <td>placeholder for search input field.</td>
    </tr>
     <tr>
      <td>canSelectRows</td>
      <td>boolean</td>
      <td>false</td>
      <td>allow row selection.</td>
    </tr>
    <tr>
      <td>handleRowSelection</td>
      <td>function</td>
      <td>--</td>
      <td>Provide a callback fuction, which will be called everytime number of selected rows change. Will receive array containing row details as argument.</td>
    </tr>
     <tr>
      <td>handleRowClick</td>
      <td>function</td>
      <td>--</td>
      <td>Provide a callback fuction, which will be called everytime a row is clicked. Will receive details of the row as argument.</td>
    </tr>
     <tr>
      <td>styleVariables</td>
      <td>object</td>
      <td>all default values are defined below</td>
      <td>Modify css variables to change font-family, color, font-size, etc.</td>
    </tr>    
     <tr>
      <td>fixedTableHeight</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true the table will have constant height, incase number rows fail to fill the table height empty rows will fill the rest of the table.</td>
    </tr>
     <tr>
      <td>loading</td>
      <td>boolean</td>
      <td>false</td>
      <td>If true loading screen will be shown, all row data will be hidden even if they exists.</td>
    </tr>
    <tr>
      <td>loadingComponent</td>
      <td>React Component</td>
      <td>"Loading ..."</td>
      <td>If provided it will displayed in the center of the table's body, when loading is true.</td>
    </tr>
  </tbody>
</table>

## Column Props

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>true</td>
      <td>--</td>
      <td>It is used as the column header.</td>
    </tr> 
    <tr>
      <td>accessor</td>
      <td>string or function</td>
      <td>false</td>
      <td>--</td>
      <td>
        It is used to access the value of the column.<br/>
        String = "key" or "key1.key2. ..." (to access nested value)<br/>
        Function = Provide a callback and return value (callback will receive row details as argument).
      </td>
    </tr>
    <tr>
      <td>cell</td>
      <td>function</td>
      <td>false</td>
      <td>--</td>
      <td>
        Provide a callback and return jsx/component to be rendered in body-cell (callback will receive row details and index as arguments).
      </td>
    </tr>
    <tr>
      <td>filer</td>
      <td>boolean</td>
      <td>false</td>
      <td>false</td>
      <td>
       If true, column name will be available for filtering table data, all unique values of the column will be listed as options.
      </td>
    </tr>
     <tr>
      <td>hideHeader</td>
      <td>boolean</td>
      <td>false</td>
      <td>false</td>
      <td>
       If true, column name will be hidden from header.
      </td>
    </tr>
    <tr>
      <td>preventClick</td>
      <td>boolean</td>
      <td>false</td>
      <td>false</td>
      <td>
       If true, clicking on this won't trigger the handleRowClick callback
      </td>
    </tr>
    <tr>
      <td>searchable</td>
      <td>boolean</td>
      <td>false</td>
      <td>false</td>
      <td>
       If true, column will become searchable. Value returned by accessor will be used to find matches.
      </td>
    </tr>
    <tr>
      <td>sortable</td>
      <td>boolean</td>
      <td>false</td>
      <td>false</td>
      <td>
       If true, you will be able to sort the column in ascending/descending order. Value returned by accessor will be used to find matches.
      </td>
    </tr>
    <tr>
      <td>sortType</td>
      <td>string or number or date</td>
      <td>false</td>
      <td>string</td>
      <td>
       This specifies the datatype of the value returned by accessor.
      </td>
    </tr>
    <tr>
      <td>headerCell</td>
      <td>function</td>
      <td>false</td>
      <td>--</td>
      <td>
        Provide a callback and return jsx/component to be rendered in the header-cell (callback will receive row details and index as arguments).
      </td>
    </tr>
    <tr>
      <td>minWidth</td>
      <td>css property</td>
      <td>false</td>
      <td>auto</td>
      <td>
        Provide minimum width you want the cell to take up.
      </td>
    </tr>
    <tr>
      <td>width</td>
      <td>css property</td>
      <td>false</td>
      <td>auto</td>
      <td>
        Provide width to your table cell
      </td>
    </tr>
    <tr>
      <td>alignment</td>
      <td>css property</td>
      <td>false</td>
      <td>center</td>
      <td>
        Responsible for aligning the contents inside table cell.
      </td>
    </tr>
    <tr>
      <td>wrapCellContent</td>
      <td>boolean</td>
      <td>false</td>
      <td>true</td>
      <td>
        Set white-space to no-wrap for table-cells by passing true
      </td>
    </tr>
   </tbody>
  </table>

## Style Variables

<table>
<thead>
  <tr>
  <th>Variable name</th>
  <th>Variable type</th>
  <th>Default value</th>
  </tr>
</thead>
  <tbody>
   <tr><td>"font-family"</td><td>font-family</td><td>"Arial, Helvetica, sans-serif"</td></tr>
    <tr><td>"table-container-border"</td><td>border-color</td><td>"#BBBFCA"</td></tr>
    <tr><td>"header-bg"</td><td>background</td><td>"#dee1e9"</td></tr>
    <tr><td>"header-column-separator"</td><td>border-color</td><td>"#ffffffd6"</td></tr>
    <tr><td>"even-row-bg"</td><td>background</td><td>"#F4F4F2"</td></tr>
    <tr><td>"odd-row-bg"</td><td>background</td><td>"#FFF"</td></tr>
    <tr><td>"row-hover"</td><td>background</td><td>"#E8E8E8"</td></tr>
    <tr><td>"body-column-separator"</td><td>border-color</td><td>"#bbbfcad6"</td></tr>
    <tr><td>"scrollbar-track-bg"</td><td>background</td><td>"#ededed"</td></tr>
    <tr><td>"scrollbar-thumb-bg"</td><td>background</td><td>"#c9c9c9"</td></tr>
    <tr><td>"header-color"</td><td>font-color</td><td>"#323B4B"</td></tr>
    <tr><td>"header-font-size"</td><td>font-size</td><td>"16px"</td></tr>
    <tr><td>"header-font-weight"</td><td>font-weight</td><td>"600"</td></tr>
    <tr><td>"body-font-color"</td><td>font-color</td><td>"#323c47"</td></tr>
    <tr><td>"body-font-size"</td><td>font-size</td><td>"15px"</td></tr>
    <tr><td>"body-font-weight"</td><td>font-weight</td><td>"500"</td></tr>
    <tr><td>"select-container-border"</td><td>border-color</td><td>"#c6c6c6"</td></tr>
    <tr><td>"dropdown-arrow-color"</td><td>icon-color</td><td>"#cecece"</td></tr>
    <tr><td>"disabled-select-container"</td><td>background</td><td>"#f0f0f0"</td></tr>
    <tr><td>"options-container-bg"</td><td>background</td><td>"#fff"</td></tr>
    <tr><td>"options-container-border"</td><td>border</td><td>"1px solid #f2f2f2"</td></tr>
    <tr><td>"options-container-box-shadow"</td><td>box-shadow</td><td>"1px 1px 2px #d2d2d2"</td></tr>
    <tr><td>"selected-option-color"</td><td>background</td><td>"#323B4B"</td></tr>
    <tr><td>"options-color"</td><td>font-color</td><td>"#323c47"</td></tr>
    <tr><td>"options-font-size"</td><td>font-size</td><td>"16px"</td></tr>
    <tr><td>"option-separator"</td><td>border-color</td><td>"#d2d2d2"</td></tr>
    <tr><td>"option-hover"</td><td>background</td><td>"#f3f3f3"</td></tr>
    <tr><td>"selected-option-bg"</td><td>background</td><td>"#e6e6e6"</td></tr>
    <tr><td>"search-border"</td><td>border</td><td>"2px solid #c6c6c6"</td></tr>
    <tr><td>"search-font-size"</td><td>font-size</td><td>"16px"</td></tr>
    <tr><td>"search-font-color"</td><td>font-color</td><td>"#323c47"</td></tr>
    <tr><td>"search-font-weight"</td><td>font-weight</td><td>"500"</td></tr>
    <tr><td>"pagination-text-color"</td><td>font-color</td><td>"#323c47"</td></tr>
    <tr><td>"pagiantion-text-size"</td><td>font-size</td><td>"15px"</td></tr>
    <tr><td>"pagination-text-weight"</td><td>font-weight</td><td>"500"</td></tr>
    <tr><td>"pagination-page-info-color"</td><td>font-color</td><td>"#323B4B"</td></tr>
    <tr><td>"pagiantion-page-info-size"</td><td>font-size</td><td>"15px"</td></tr>
    <tr><td>"pagination-page-info-weight"</td><td>font-weight</td><td>"500"</td></tr>
    <tr><td>"head-row-height"</td><td>height</td><td>"45px"</td></tr>
    <tr><td>"body-row-height"</td><td>height</td><td>"40px"</td></tr>
    <tr><td>"max-table-height"</td><td>height</td><td>"100%"</td></tr>
    <tr><td>"cell-content-vertical-alignment"</td><td>cell-alignment</td><td>"middle"</td></tr>
  </tbody>
</table>

## Global classnames

<table>
  <thead>
    <tr>
      <th>Classname</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>tableParentContainer</td>
        <td>Top most container(DIV_tag), consisting of table, header, and pagination.</td>
    </tr>
    <tr>
        <td>tableContainer</td>
        <td>Container(DIV_tag) consists of header (Search + Filters) and table.</td>
    </tr>
    <tr>
        <td>tableHeaderContainer</td>
        <td>Classname of the DIV_tag rendering both searchbar and filters.</td>
    </tr>
    <tr>
        <td>tableSearchbar</td>
        <td>Searchbar container(DIV_tag), consists of search icon and input field.</td>
    </tr>
    <tr>
        <td>table</td>
        <td>Classname of TABLE_tag.</td>
    </tr>
    <tr>
        <td>emptyTableBody</td>
        <td>Classname of the row(TR_tag) taking up the entire table body, when there is no rows available to show or during loading.</td>
    </tr>
    <tr>
        <td>emptyTableBodyMessage</td>
        <td>Classname of the cell(TD_tag) inside emptyTableRow, used to show message, or to render loading component if available</td>
    </tr>
    <tr>
        <td>emptyTableRows</td>
        <td>Classname of the empty rows(TR_tag) used to fill up the excess space in table body.</td>
    </tr>
    <tr>
        <td>tablePaginationContainer</td>
        <td>Classname of the DIV_tag rendering pagination.</td>
    </tr>
    <tr>
        <td>tablePaginationDescription</td>
        <td>Classname of the P_tag responsible for rendering the overall details of pagination</td>
    </tr>
    <tr>
        <td>tablePaginationButtons</td>
        <td>Classname of the pagination buttons</td>
    </tr>
  </tbody>
</table>
