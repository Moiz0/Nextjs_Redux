"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Box,
  IconButton,
  Chip,
  Fade,
  Paper,
} from "@mui/material";
import { Edit, Delete, Add, Inventory2 } from "@mui/icons-material";
import { fetchItems, deleteItem } from "@/store/itemSlice";

export default function ItemsList({ onEdit }) {
  const dispatch = useDispatch();
  const { items, loading, error, deleteLoading } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await dispatch(deleteItem(id));
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading items.
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading items: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{ p: 3, mb: 3, backgroundColor: "primary.main", color: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Inventory2 sx={{ fontSize: 40 }} />
            <div>
              <Typography variant="h4" component="h1">
                Items Dashboard
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Manage your inventory items
              </Typography>
            </div>
          </Box>
          <Chip
            label={`${items.length} Items`}
            color="secondary"
            size="large"
            sx={{ fontSize: "1rem", height: 40 }}
          />
        </Box>
      </Paper>

      {items.length === 0 ? (
        <Paper elevation={2} sx={{ p: 6, textAlign: "center" }}>
          <Inventory2 sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            No items found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Start building your inventory by creating your first item!
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("navigate-to-create"))
            }
          >
            Create Your First Item
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Fade in={true} timeout={300 + index * 100}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      elevation: 8,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom noWrap>
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "3.6em",
                      }}
                    >
                      {item.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        ${parseFloat(item.price).toFixed(2)}
                      </Typography>
                      <Chip
                        label="In Stock"
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  <Box
                    sx={{
                      p: 2,
                      pt: 0,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      startIcon={<Edit />}
                      onClick={() => onEdit && onEdit(item)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    >
                      Edit
                    </Button>

                    <IconButton
                      onClick={() => handleDelete(item._id)}
                      color="error"
                      disabled={deleteLoading}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
