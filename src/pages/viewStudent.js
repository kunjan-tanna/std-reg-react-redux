import {
   Button,
   Dialog,
   DialogContent,
   DialogTitle,
   Grid,
   Paper,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import alertify from "alertifyjs";
import { addStudentList } from "../redux/slices/users";
import StudentReg from "./studentReg";

function ViewStudent() {
   const stdDataList = useSelector((state) => state.common.stdDataList);
   const dispatch = useDispatch();
   const [openModal, setOpenModal] = useState(false);

   const [editData, setEditData] = useState({});
   const [indexId, setIndexId] = useState("");

   console.log("hiii", stdDataList);
   const headCells = [
      {
         label: "ID",
         left: true,
         width: "50px",
      },
      {
         label: "DOB",
         left: true,
         width: "50px",
      },

      {
         label: "First Name",
         width: "50px",
      },
      {
         label: "Last Name",
         width: "50px",
      },
      {
         label: "E-mail",
         width: "50px",
      },
      {
         label: "Mobile No",
         width: "50px",
      },
      {
         label: "Gender",
         width: "50px",
      },
      {
         label: "Images",
         width: "70px",
      },
      {
         label: "Country",
         width: "50px",
      },
      {
         label: "Action",
         width: "50px",
         center: true,
      },
   ];
   const handleEdit = (item, index) => {
      setOpenModal(true);
      setEditData(item);
      setIndexId(index);
   };
   const handleDelete = (index) => {
      alertify
         .confirm("Are you sure you want to delete?", async (status) => {
            if (status) {
               await delInfo(index);
            }
         })
         .setHeader("<em>Student Information</em> ")
         .set("labels", { ok: "OK", cancel: "CANCEL" });
   };
   const delInfo = (index) => {
      const list = [...stdDataList];
      console.log("LISTTT", list, index);

      list.splice(index, 1);
      dispatch(addStudentList(list));
   };

   return (
      <div
         style={{
            justifyContent: "center",
            alignContent: "center",
            height: "90vh",
         }}
      >
         <h1>View Student</h1>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           {headCells.map((item, index) => (
                              <TableCell
                                 width={item.width}
                                 key={index}
                                 align={
                                    item.left
                                       ? "left"
                                       : item.center
                                       ? "center"
                                       : "right"
                                 }
                              >
                                 {item.label}
                              </TableCell>
                           ))}
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {stdDataList.map((row, index) => (
                           <TableRow
                              key={index}
                              sx={{
                                 "&:last-child td, &:last-child th": {
                                    border: 0,
                                 },
                              }}
                           >
                              <TableCell align="left">{index + 1}</TableCell>

                              <TableCell component="th" scope="row">
                                 {row.dateVal
                                    ? moment(row.dateVal).format("YYYY-MM-DD")
                                    : "-"}
                              </TableCell>
                              <TableCell align="right">{row.fname}</TableCell>
                              <TableCell align="right">{row.lname}</TableCell>
                              <TableCell align="right">{row.email}</TableCell>
                              <TableCell align="right">
                                 {row.mobileno}
                              </TableCell>
                              <TableCell align="right">{row.gender}</TableCell>
                              <TableCell align="right">
                                 {row.image &&
                                    row.image.length > 0 &&
                                    row.image.map((url) => (
                                       <img
                                          src={url}
                                          alt=""
                                          width={"50px"}
                                          height="50px"
                                       />
                                    ))}
                              </TableCell>
                              <TableCell align="right">
                                 {row.country ? row.country?.label : "-"}
                              </TableCell>
                              <TableCell align="right">
                                 <Button onClick={() => handleEdit(row, index)}>
                                    Edit
                                 </Button>
                                 <Button
                                    onClick={(item) =>
                                       handleDelete(item, index)
                                    }
                                    color="error"
                                 >
                                    Delete
                                 </Button>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            </Grid>
         </Grid>
         <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="form-dialog-title"
         >
            <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
            <DialogContent>
               {/* <UpdateProduct
                productId={productId}
                handleSubmit={handleSubmit}
                ToggleInputModal={setOpenModal}
                getProducts={getProducts}
              /> */}

               <StudentReg
                  indexId={indexId}
                  editData={editData}
                  stdDataList={stdDataList}
                  ToggleInputModal={setOpenModal}
               />
            </DialogContent>
         </Dialog>
      </div>
   );
}

export default ViewStudent;
