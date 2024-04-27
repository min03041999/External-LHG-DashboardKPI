import React from 'react';
import { Box, Stack, List, ListItemButton, ListItemText } from '@mui/material';


const ItemStyle = {
    backgroundColor: "#96abc8",
    color: "#fff",
    textAlign: "center",
    marginBottom: "30px",
    transition: "0.3s",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",
    '&:hover': {
        backgroundColor: '#3d6aa1'
    },
}

const ActiveItemStyle = {
    backgroundColor: "#3d6aa1",
    color: "#fff",
    textAlign: "center",
    marginBottom: "30px",
    transition: "0.3s",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",
    '&:hover': {
        backgroundColor: '#3d6aa1'
    },
}

const Category = (props) => {
    const { category, setCategory, data } = props;


    return (
        <Box component={"div"}>
            <Stack direction="column" spacing={2}>
                <List component={"nav"} sx={{ width: '100%' }}>
                    {
                        data?.map((item, index) => (
                            <ListItemButton key={index} sx={category === item.name ? ActiveItemStyle : ItemStyle} onClick={() => setCategory(item.name)}>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Stack>
        </Box >
    )
}

export default Category;