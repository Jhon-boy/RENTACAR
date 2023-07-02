/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Sidebar.css';
import { Outlet, Link } from 'react-router-dom'
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { SidebarData } from "../data/Data";

export default function Sidebar({usuario}) {
  const [expanded, setExpaned] = useState(true)
  const [selected, setSelected] = useState(0);

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  }
  console.log(window.innerWidth)


  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '75%' }} onClick={() => setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        <div className="menu">

        
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
            <Link to={'/'+item.heading}>
              <span>{item.heading}</span>
            </Link>  
            </div>
          );
        })}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
          <h5>Hola: {usuario}</h5>
        </div>
      </motion.div>
      <Outlet />
    </>

  );
}

