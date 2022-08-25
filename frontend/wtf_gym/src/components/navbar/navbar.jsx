import React from "react";
import "./navbar.css"
import { Box } from "@mui/material"


export const Navbar = () => {

    const [background , setBack] = React.useState(null)

    const changeBackground = () => {
        
        if (window.scrollY >= 66) {
          setBack("blackBack")
        } else {
          setBack(null)
        }
    }

    React.useEffect(() => {
        window.addEventListener("scroll", changeBackground)
    })

    return (
        <>
        <Box className={`flexDiv parentNav ${background} `} >
            <Box className="logo">WTF</Box>

            <Box className="flexDiv">

                <Box className="flexDiv childNav">
                <Box className="navLink">Fitness</Box>
                <Box className="navLink">Nutrition</Box>
                <Box className="navLink">Gyms</Box>
                <Box className="navLink">Become WTF Partner</Box>
                <Box className="navLink">About Us</Box>
                </Box>

                <button className="loginButton navLink">Login</button>
            </Box>
        </Box>
        </>
    )
}