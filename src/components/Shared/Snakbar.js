import React, { useEffect } from "react";
import closeIcon from "../../assests/close-white.svg"
import checkIcon from "../../assests/check.svg"
import { useSnakbar } from "../Context/SnakbarContext"
import "./snakbar.css"
export const Snakbar = () =>{
    const { snakbarStatus , snakbarDispatch } = useSnakbar()
    useEffect(()=>{
        const timeoutId = setTimeout(()=>{
            snakbarDispatch({type:"INITAIL"})
        },1000)

        return () =>{
            clearTimeout(timeoutId);
        }
    } ,[])

    const checkTypeOfSnakbar = (type) =>{
        switch(type){
            case "ERROR":
                return "snk-bar-err";
            case "SUCCESS":
                return "snk-bar-suc";
            case "WARNING":
                return "snk-bar-war";
            default:
                return "snk-bar";
        }
    }

    const snakbarType = checkTypeOfSnakbar(snakbarStatus['alertType'])
    return(
        <div className={ snakbarType }>
            <img src={ checkIcon } alt=""/>
            <h5>{ snakbarStatus["msg"] }</h5>
            <button className="link-btn">
                <img src={ closeIcon } alt=""/>
            </button>
        </div>
    )
}