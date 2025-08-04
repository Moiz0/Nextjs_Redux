"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Home, Add, Inventory } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function Navbar({ currentView, onViewChange }) {
  const { items } = useSelector((state) => state.items);

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
        >
          <Inventory />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Item Manager
        </Typography>


        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => onViewChange("home")}
            variant={currentView === "home" ? "outlined" : "text"}
            sx={{
              borderColor: currentView === "home" ? "white" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Badge badgeContent={items.length} color="secondary">
              Home
            </Badge>
          </Button>

          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => onViewChange("create")}
            variant={currentView === "create" ? "outlined" : "text"}
            sx={{
              borderColor: currentView === "create" ? "white" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Create Item
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
