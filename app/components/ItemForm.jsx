"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Alert,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBack, Save, Edit } from "@mui/icons-material";
import itemSchema from "@/libs/validateSchema";
import { createItem, updateItem, clearError } from "@/store/itemSlice";

export default function ItemForm({
  initialValues = { name: "", description: "", price: "" },
  onSubmit,
  isEdit = false,
  itemId = null,
  onSuccess,
  onBack,
}) {
  const dispatch = useDispatch();
  const { createLoading, updateLoading, error } = useSelector(
    (state) => state.items
  );

  const formik = useFormik({
    initialValues,
    validationSchema: itemSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (onSubmit) {
          await onSubmit(values);
        } else {
          let result;
          if (isEdit && itemId) {
            result = await dispatch(updateItem({ id: itemId, ...values }));
          } else {
            result = await dispatch(createItem(values));
          }

          if (
            createItem.fulfilled.match(result) ||
            updateItem.fulfilled.match(result)
          ) {
            resetForm();
            dispatch(clearError());

            if (onSuccess) {
              onSuccess();
            }
          }
        }
      } catch (err) {
        console.error("Form submission error:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const isSubmitting = formik.isSubmitting || createLoading || updateLoading;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        {onBack && (
          <IconButton onClick={onBack} color="primary">
            <ArrowBack />
          </IconButton>
        )}
        <Typography
          variant="h4"
          component="h1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          {isEdit ? <Edit /> : <Save />}
          {isEdit ? "Edit Item" : "Create New Item"}
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit} noValidate>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Item Name"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            disabled={isSubmitting}
            variant="outlined"
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            minRows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
            disabled={isSubmitting}
            variant="outlined"
          />

          <TextField
            label="Price ($)"
            name="price"
            fullWidth
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            disabled={isSubmitting}
            variant="outlined"
          />

          <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={isEdit ? <Edit /> : <Save />}
              size="large"
              sx={{ minWidth: 150 }}
            >
              {isSubmitting
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Item"
                : "Create Item"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                formik.resetForm();
                dispatch(clearError());
              }}
              disabled={isSubmitting}
              size="large"
            >
              Reset
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
}
