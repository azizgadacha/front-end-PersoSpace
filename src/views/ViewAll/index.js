
import "./userList.css";

import React, {useState} from 'react';

// material-ui
import { useTheme } from '@material-ui/core';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@material-ui/core';

// project imports
import AuthWrapper1 from './../../composant_de_style/AuthWrapper1';
import AuthCardWrapper2 from './../../composant_de_style/AuthCardWrapper2';
import RestViewAll from './RestViewAll';
import {Avatar, Checkbox, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import ListItemButton from "@material-ui/core/ListItemButton";
import {Link} from "react-router-dom";
import {DeleteOutline} from "@material-ui/icons";
import {DataGrid} from "@material-ui/data-grid";

// assets

//===============================|| AUTH3 - REGISTER ||===============================//

const Register = () => {
    const theme = useTheme();

    const [data, setData] = useState({});

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));


    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.avatar} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "status",
            headerName: "Status",
            width: 120,
        },
        {
            field: "transaction",
            headerName: "Transaction Volume",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row.id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
};

export default Register;
