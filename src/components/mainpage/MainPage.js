import React, { useEffect, useState } from "react";
import Table from "../tableview/Table";
import axios from "axios";
import Config from "../../Api/Config";
import DeleteRows from "../deleteRow/DeleteRows";
import EditPage from "../editpage/EditPage";
import "./Main.css"
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";

const MainPage = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditopen, setIsEditOpen] = useState(false);
  const [isEditingRowdata, setIsEditingRowdata] = useState(null);

  //   get data from api calls, using axios library.

  const getData = async () => {
    try {
      const res = await axios.get(`${Config.backendpoint}`);
      console.log(res);
      const data = res.data;
      setUserData(data);
      setFilterData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  //   search input

  const handleChange = (e) => {
    const getsearch = e.target.value.toLowerCase();
    if (getsearch.length > 0) {
      const searchValues = userData.filter((value) => {
        return (
          value.name.toLowerCase().includes(getsearch) ||
          value.email.toLowerCase().includes(getsearch) ||
          value.role.toLowerCase().includes(getsearch)
        );
      });
      setUserData(searchValues);
    } else {
      setUserData(filterData);
    }
    setSearchQuery(getsearch);
  };
  // paginations
  const eachPages = 10;
  const totalPages = Math.ceil(userData.length / eachPages);
  const startIndex = (currentpage - 1) * eachPages;
  const endIndex = startIndex + eachPages;
  const currentpages = userData.slice(startIndex, endIndex);

  const getPageNumber = () => {
    const pageNum = [];
    for (let curp = 1; curp <= totalPages; curp++) pageNum.push(curp);
    return pageNum;
  };

  const pageNumbers = getPageNumber(totalPages);

  const handleFirstpage = () => {
    setCurrentpage(1);
    setSelectedRows([]);
  };
  const handlePrevpage = () => {
    setCurrentpage(currentpage - 1);
    setSelectedRows([]);
  };
  const handleClickPageNumbers = (page) => {
    setCurrentpage(page);
    setSelectedRows([]);
  };
  const handleNextpage = () => {
    setSelectedRows([]);
    setCurrentpage(currentpage + 1);
  };
  const handleLastpage = () => {
    setCurrentpage(totalPages);
    setSelectedRows([]);
  };

  // Checkbox function

  const handleseletedRows = (e, id) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    }
  };

  const handleseletAllRows = (e) => {
    const allChecked = e.target;
    const allSeletedIds = currentpages.map((user) => user.id);
    if (allChecked && selectedRows.length !== allSeletedIds.length) {
      setSelectedRows(allSeletedIds);
    } else {
      setSelectedRows([]);
    }
  };

  // deleteSeletedRows
  const handleDeleteseleted = () => {
    const unseleteRows = userData.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUserData(unseleteRows);
    setFilterData(unseleteRows);
    setSelectedRows([]);
  };
  // inside of the table delete button
  const handleDelete = (id) => {
    const tablerowdelete = userData.filter((user) => user.id !== id);
    setUserData(tablerowdelete);
    setSelectedRows([]);
  };
  const handleEdit = (id) => {
    const rowToEdit = userData.find((user) => user.id === id);
    setIsEditingRowdata(rowToEdit);
    setIsEditOpen(true);
  };
  const handlClickSave = (editing) => {
    const updateData = [...userData];
    const indextobeEdited = updateData.findIndex(
      (item) => item.id === editing.id
    );
    if (indextobeEdited !== -1) {
      updateData[indextobeEdited] = editing;
      setUserData(updateData);
    }
    setIsEditingRowdata(null);
    // toast.success("Successfully Updated", {
    //   position: toast.POSITION.TOP_CENTER,
    // });
  };
  return (
    <>
      <div className="container">
        <h2>Admin-Ui</h2>
        {/* searchbar */}
        <input
          type="search"
          placeholder="Search by name,email and role"
          value={searchQuery}
          onChange={(e) => handleChange(e)}
          className="search-input"
        />

        {/* TableViews */}
        <Table
          prasadData={currentpages}
          selectedRows={selectedRows}
          handleseletedRows={handleseletedRows}
          handleseletAllRows={handleseletAllRows}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

        {/* paginatioms */}
       
            <div className="pagination">
              <button
                onClick={handleFirstpage}
                className={currentpage === 1 ? "active" : ""}
              >
                 <LiaAngleDoubleLeftSolid />
              </button>
              <button
                onClick={handlePrevpage}
                className={currentpage === 1 ? "disabled" : ""}
              >
                <LiaAngleLeftSolid />
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={currentpage === page ? "active" : ""}
                >
                  <span
                    onClick={() => handleClickPageNumbers(page)}
                    className="page-links"
                  >
                    {page}
                  </span>
                </button>
              ))}
              <button
                onClick={handleNextpage}
                className={currentpage === totalPages ? "disabled" : ""}
              >
               <LiaAngleRightSolid />
              </button>
              <button
                onClick={handleLastpage}
                className={currentpage === totalPages ? "active" : ""}
              >
                <LiaAngleDoubleRightSolid />
              </button>
            </div>
         

        {/* delete seleted rows */}
        <DeleteRows
          selectedRows={selectedRows}
          handleDeleteseleted={handleDeleteseleted}
        />

        {/* edit functions */}
        {isEditopen && (
          <EditPage
            isEditingRowdata={isEditingRowdata}
            setIsEditOpen={setIsEditOpen}
            handlClickSave={handlClickSave}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
