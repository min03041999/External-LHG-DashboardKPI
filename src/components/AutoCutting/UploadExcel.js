import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "30px 10px",
  textAlign: "center",
  cursor: "pointer",
};

const UploadExcel = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const acceptedFileTypes = [".xlsx", ".xls"];
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
  });

  const handleDrop = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];

    if (uploadedFile) {
      const lastDotIndex = uploadedFile.name.lastIndexOf(".");
      const fileType =
        lastDotIndex !== -1 ? uploadedFile.name.slice(lastDotIndex + 1) : "";
      if (acceptedFileTypes.includes("." + fileType)) {
        setFile(uploadedFile);
      } else {
        alert("Invalid file type. Please upload an Excel file.");
      }
    }
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (file && selectedDate) {
      formData.append("myfile", file);
      formData.append("Date", selectedDate);
      try {
        await axios.post(
          "http://192.168.30.19/AutoCutting/api.php?api=upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("File uploaded successfully!");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      alert("Please select a date.");
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{
            m: 0,
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 2,
            paddingBottom: 0,
            color: "grey",
          }}
          id="customized-dialog-title"
        >
          Import Excel
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="YYYY-MM-DD"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                },
              }}
            />
          </LocalizationProvider>
          <div>
            <div {...getRootProps()} style={dropzoneStyle}>
              <input {...getInputProps()} />
              <p style={{ textTransform: "uppercase", color: "grey" }}>
                Drag and drop or Click to select file upload
              </p>
            </div>
            {file && (
              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    textTransform: "uppercase",
                    color: "grey",
                  }}
                >
                  Selected File: {file.name}
                </p>

                {/* Add your upload button and logic here */}
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    backgroundColor: "#4CAF50" /* Green background color */,
                    color: "white" /* White text color */,
                    border: "none" /* Remove borders */,
                    textAlign: "center" /* Center text */,
                    textDecoration: "none",
                    display: "inline-block",
                    margin: "4px 2px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#45a049")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#4CAF50")
                  }
                  onClick={uploadFile}
                >
                  Import
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default UploadExcel;
