import React, { useEffect, useState } from "react";
import Header from "./Header";
import { View } from "@aws-amplify/ui-react";
import { get, put } from "aws-amplify/api";
import "./Contribute.css";
import Footer from "./Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserInfo } from "./utils";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [reload, setReload] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRoleSelect = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleRoleUpdate = async () => {
    setIsLoading(true);
    try {
      const restOperation = put({
        apiName: "usersApi",
        path: "/users",
        options: {
          headers: { "Content-Type": "application/json" },
          body: {
            email: selectedUser.email,
            role: selectedRole,
          },
        },
      });
      const { body } = await restOperation.response;
      const response = await body.json();
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
    handleClose();
    setIsLoading(false);
    setReload(reload + 1);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const restOperation = get({
          apiName: "usersApi",
          path: "/users",
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [reload]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const { role } = await getUserInfo();
        setIsAdmin(role === "admin");
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <View
      className="App"
      style={{
        minHeight: "70vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isAdmin ? (
        <>
          <Header />
          <TableContainer component={Paper} style={{ maxWidth: "900px" }}>
            <Table>
              <TableHead style={{ backgroundColor: "#2D6249" }}>
                <TableRow>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    Role
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  users &&
                  users.length > 0 &&
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.email}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {user.role}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleClickOpen(user)}
                        >
                          Update Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Update Role for {selectedUser ? selectedUser.email : ""}
            </DialogTitle>{" "}
            <DialogContent>
              <DialogContentText>
                Please select the new role for the user.
              </DialogContentText>
              <FormControl fullWidth>
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  value={selectedRole}
                  label="Role"
                  onChange={handleRoleSelect}
                >
                  <MenuItem value={"admin"}>admin</MenuItem>
                  <MenuItem value={"viewer"}>viewer</MenuItem>
                  <MenuItem value={"contributor"}>contributor</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleRoleUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Footer />
        </>
      ) : null}
    </View>
  );
};

export default Users;
