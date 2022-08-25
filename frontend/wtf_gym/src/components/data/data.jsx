import { Box} from "@mui/material";
import React from "react";
import "./data.css"
import { BiSearch } from "react-icons/bi"

export const Data = () => {

    const [input , setInput] = React.useState("")
    const [gymData , setGymData] = React.useState([])
    const [cities, setCities] = React.useState([])
    const [city , setCity] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        fetch(`https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231&city=${city}`)
        .then((res) => res.json())
        .then((data) => data.data.forEach((items) => {
            setGymData((e) => [...e, items])
            setLoading(false)
        }))
        .catch((err) => console.log(err))

        // eslint-disable-next-line
    },[city])



    React.useEffect(() => {
        fetch(`https://devapi.wtfup.me/gym/places`)
        .then((res) => res.json())
        .then((data) => data.data.forEach((items) => {
            setCities((e) => [...e, items])
        }))

        // eslint-disable-next-line
    },[window.onload])

    console.log(gymData)

    return (
        <>
        {
            loading?
            <Box className="searchDiv">
                <img alt="Loading..." src="https://wtfup.me/assets/loader.gif" style={{width:"150px", height:"150px", marginTop:"100px"}} />
            </Box>
            :
        <Box className="searchDiv">
            <Box>
                <Box className="search flexDiv">
                    <BiSearch style={{color:"white", fontSize:"30px"}} />
                    <input className="inputSearch" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search gym name here..."></input>
                    <button className="clearButton" onClick={() => setInput("")}>Clear</button>
                </Box>

                <Box className="flexDiv" id="searchFlex" sx={{alignItems:"start"}}>

                    <Box className="searchFilters">
                        <h1 style={{fontSize:"50px"}}>Filters</h1>
                        <h2>Cities</h2>
                        <select onChange={(e) => setCity(e.target.value)} className="select">
                            <option className="options" value="">Select City</option>
                            {
                                cities.map((items, index) => {
                                    return (
                                    <option key={index} className="options" value={"infore"} >{items.city}</option>
                                    )
                                })
                            }
                        </select>
                    </Box>

                    <Box className="searchResult">
                        {
                            gymData.map((items, index) => {
                                return (
                                    <Box key={index} className="dataBox" sx={{display:"flex", alignItems:"center", marginBottom:"20px", textAlign:'left'}}>
                                        <Box sx={{width:"40%"}}></Box>
                                        <Box sx={{width:"50%"}}>
                                        <h1>{items.gym_name}</h1>
                                        <p>{items.address1} , {items.address2}, {items.city}</p>

                                        <Box sx={{display:"flex", justifyContent:"space-between"}}>
                                            <Box></Box>
                                        <button className="loginButton" style={{marginTop:"15vh", width:"150px", height:"50px",fontSize:'17px', color:"white"}}>Book Now</button>
                                        </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
}
        </>
    )
}