import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router';

const GameSideBar = ({gameList, currentGame}) => {

  const navigate = useNavigate();

  return (
    <div className="hidden md:flex p-4">
      <List color="primary">
        {gameList.map((game) => (
          <div key={game.secondId}>
            <ListItem
              button
              onClick={() =>navigate(`/${game.secondId}`)}
              sx={{
                display: "flex",
                justifyContent: 'space-between',
                alignItems: 'center', 
                backgroundColor: currentGame === game.secondId ? '#1e2530' : 'transparent',
                color: currentGame === game.secondId ? '#fff' : 'inherit',
                '&:hover': {
                  backgroundColor: currentGame === game.secondId ? '#1e2530' : '#3c434e',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemText primary={game.name} />
              <ListItemIcon><ChevronRightIcon /></ListItemIcon>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  )
}

export default GameSideBar