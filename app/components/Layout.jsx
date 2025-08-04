"use client";

import React, { useState } from "react";
import { Container, Box, Fade } from "@mui/material";
import Navbar from "./Navbar";
import ItemForm from "./ItemForm";
import ItemsList from "./ItemsList";

export default function Layout() {
  const [currentView, setCurrentView] = useState("home");
  const [editingItem, setEditingItem] = useState(null);

  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === "create") {
      setEditingItem(null);  
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setCurrentView("create"); 
  };

  const handleItemCreated = () => {
    setCurrentView("home");  
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <Fade in={currentView === "home"} timeout={300}>
            <Box>
              <ItemsList onEdit={handleEdit} />
            </Box>
          </Fade>
        );
      case "create":
        return (
          <Fade in={currentView === "create"} timeout={300}>
            <Box>
              <ItemForm
                initialValues={
                  editingItem
                    ? {
                        name: editingItem.name,
                        description: editingItem.description,
                        price: editingItem.price,
                      }
                    : { name: "", description: "", price: "" }
                }
                isEdit={!!editingItem}
                itemId={editingItem?._id}
                onSuccess={handleItemCreated}
              />
            </Box>
          </Fade>
        );
      default:
        return (
          <ItemsList onEdit={handleEdit} />
        );
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar currentView={currentView} onViewChange={handleViewChange} />
      <Container maxWidth="lg">
        <Box sx={{ py: 3 }}>
          {renderCurrentView()}
        </Box>
      </Container>
    </Box>
  );
}