import {
   Button,
   FormControl,
   Grid,
   TextField,
   Typography,
} from "@mui/material";
import alertify from "alertifyjs";
import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePic from "../components/form/DatePic";
import Input from "../components/form/Input";
import RadioButton from "../components/form/RadioButton";
import SelectComp from "../components/form/SelectComp";
import { addStudentList } from "../redux/slices/users";

function StudentReg({ indexId, editData, ToggleInputModal, stdDataList }) {
   const [formData, setFormData] = useState({
      fname: editData?.fname ? editData.fname : "",
      lname: editData?.lname ? editData.lname : "",
      fatherName: editData?.fatherName ? editData?.fatherName : "",
      email: editData?.email ? editData?.email : "",
      address: editData?.address ? editData?.address : "",
      mobileno: editData?.mobileno ? editData?.mobileno : null,
      gender: editData?.gender ? editData?.gender : "",
   });
   const [dateVal, setDateVal] = useState(editData?.dateVal || null);

   const [countrySel, setCountrySel] = useState(
      editData?.country ? editData?.country : null
   );
   const [userData, setUserData] = useState([]);
   const [errorMsg, setErrorMsg] = useState("");
   const [selectedFile, setSelectedFile] = useState([]);
   const dispatch = useDispatch();

   const handleInput = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };
   const handleUploadClick = (e) => {
      const fileObj = [];
      const fileArray = [];
      fileObj.push(e.target.files);

      for (let i = 0; i < fileObj[0].length; i++) {
         fileArray.push(URL.createObjectURL(fileObj[0][i]));
      }
      console.log(fileArray);
      setSelectedFile(fileArray);
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      if (indexId !== undefined) {
         console.log("hi");
         const stdData = formData;
         if (selectedFile.length !== 0) {
            stdData.image = selectedFile;
         }
         if (countrySel !== null) {
            stdData.country = countrySel;
         }
         if (dateVal !== null) {
            stdData.dateVal = dateVal;
         }

         const listData = stdDataList.map((item) => {
            if (item.Id === editData.Id) {
               item = stdData;
            }
            return item;
         });
         alertify.success("Update Successfully");
         dispatch(addStudentList(listData));
         ToggleInputModal(false);
      } else {
         if (emailValidation()) {
            const stdData = formData;
            if (selectedFile.length !== 0) {
               stdData.image = selectedFile;
            }
            if (countrySel !== null) {
               stdData.country = countrySel;
            }
            if (dateVal !== null) {
               stdData.dateVal = dateVal;
            }
            stdData["Id"] = Date.now();
            let data = [...userData, stdData];

            setUserData((userData) => [...userData, stdData]);
            console.log("DATA", data);
            alertify.success("Successfully registered");
            dispatch(addStudentList(data));
         }
      }
   };
   const handleReset = () => {
      setFormData({
         fname: "",
         lname: "",
         fatherName: "",
         email: "",
         address: "",
         mobileno: "",
         gender: "",
      });
      setCountrySel({});
      setDateVal(null);
   };
   const emailValidation = () => {
      const regex =
         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!formData.email || regex.test(formData.email) === false) {
         setErrorMsg("Email is not valid");

         return false;
      }
      return true;
   };
   const handleSel = (e, newVal) => {
      setCountrySel(newVal);
   };
   return (
      <>
         <div>
            <Grid
               sx={{
                  alignContent: "center",
                  height: "90vh",
               }}
            >
               {indexId ? "Edit Student" : " Add Student"}
               <Grid container spacing={2}>
                  <Grid item xs={6}>
                     <Input
                        name="fname"
                        required={false}
                        type="text"
                        value={formData.fname}
                        onChange={handleInput}
                        label="First Name"
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Input
                        name="lname"
                        required={false}
                        type="text"
                        value={formData.lname}
                        onChange={handleInput}
                        label="Last Name"
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Input
                        name="fatherName"
                        required={false}
                        type="text"
                        value={formData.fatherName}
                        onChange={handleInput}
                        label="Father Name"
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Input
                        name="email"
                        required={true}
                        type="email"
                        value={formData.email}
                        onChange={handleInput}
                        label="E-mail"
                     />
                     {errorMsg ? (
                        <Typography style={{ color: "red" }}>
                           {errorMsg}
                        </Typography>
                     ) : (
                        ""
                     )}
                  </Grid>
                  <Grid item xs={6}>
                     <Input
                        name="address"
                        required={false}
                        type="text"
                        isMultiline={true}
                        maxRows={4}
                        value={formData.address}
                        onChange={handleInput}
                        label="Address"
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <Input
                        name="mobileno"
                        required={false}
                        type="number"
                        value={formData.mobileno}
                        onChange={handleInput}
                        label="Mobile No"
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <RadioButton
                        name={"gender"}
                        onChange={handleInput}
                        radioData={[
                           {
                              value: "male",
                              label: "Male",
                           },
                           {
                              value: "female",
                              label: "Female",
                           },
                        ]}
                        title="Gender"
                        value={formData.gender}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <DatePic
                        title="DOB"
                        value={dateVal}
                        onChange={(newVal) => setDateVal(newVal)}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUploadClick}
                     />
                  </Grid>
                  <Grid item xs={6}>
                     <SelectComp
                        label={"Choose a country"}
                        value={countrySel}
                        onChange={(e, newVal) => handleSel(e, newVal)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Button
                        type="submit"
                        style={{ padding: "20px" }}
                        onClick={handleSubmit}
                     >
                        {indexId !== undefined ? "Update" : "Submit"}
                     </Button>
                     <Button
                        type="submit"
                        style={{ padding: "20px" }}
                        onClick={handleReset}
                     >
                        Reset
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
         </div>
      </>
   );
}

export default StudentReg;
