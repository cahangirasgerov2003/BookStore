import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import "../../styles/modalForm.css";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const toastSuccess = () => {
  toast.success("Congratulations, the changes have been saved", {
    autoClose: 2000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  });
};

const toastError = () => {
  toast.error("You are required to fill in all fields !", {
    autoClose: 2000,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
  });
};

const ModalForm = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const checkForm = () => {
    if (name && title && desc) {
      toastSuccess();
      handleClose();
      let newdata = {
        name,
        nodeType: "cm:folder",
      };
      pushRequest(newdata);
    } else {
      toastError();
    }
    setName("");
    setTitle("");
    setDesc("");
  };

  function pushRequest(data) {
    const token = JSON.parse(localStorage.getItem("base64"));
    const authorizationKey = `Basic ${token["base64"]}`;
    fetch(
      "https://1curd3ms.trials.alfresco.com/alfresco/api/-default-/public/alfresco/versions/1/nodes/382b3102-ffba-422e-8711-d7f330fb5468/children",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authorizationKey,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal__container">
            <p className="h4 text-danger text-center mb-2">Create new folder</p>
            <TextField
              id="standard-basic1"
              label={name === "" ? "Name" : name}
              variant="standard"
              className="w-100 "
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="standard-basic2"
              label={title === "" ? "Title" : title}
              variant="standard"
              className="my-4 w-100 "
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="standard-basic3"
              label={desc === "" ? "Description" : desc}
              variant="standard"
              className="w-100 "
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <Button className="createButton mt-4 p-0" onClick={checkForm}>
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalForm;
