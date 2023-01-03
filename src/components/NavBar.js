import React from "react";
import {
   AppBar,
   IconButton,
   Toolbar,
   List,
   ListItem,
   ListItemText,
   Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { Home } from "@material-ui/icons";
import { Link } from "react-router-dom";

const usedStyles = makeStyles({
   navbarDisplayFlex: {
      display: "flex",
      justifyContent: "space-between",
   },
   navDisplayFlex: {
      display: "flex",
      justifyContent: "space-between",
   },
   linkText: {
      textDecoration: "none",
      textTransform: "uppercase",
      width: "90px",
      color: "white",
   },
});

const navLinks = [
   { title: "Add Student", path: "/student-registration" },
   { title: "View Student", path: "/view-students" },
];

const NavBar = () => {
   const classes = usedStyles();
   return (
      <>
         <AppBar position="static">
            <Toolbar>
               <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
                  <IconButton edge="start" color="inherit" aria-label="home">
                     {/* <Home fontSize="large" /> */}
                  </IconButton>
                  <List
                     component="nav"
                     aria-labelledby="main navigation"
                     className={classes.navDisplayFlex}
                  >
                     {navLinks.map(({ title, path }) => (
                        <ListItem button key={title} component={Link} to={path}>
                           <ListItemText
                              className={classes.linkText}
                              primary={title}
                           />
                        </ListItem>
                     ))}
                  </List>
               </Container>
            </Toolbar>
         </AppBar>
      </>
   );
};

export default NavBar;
