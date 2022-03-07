import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { DesktopDateTimePicker, LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Container,
  Typography,
  FormHelperText,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ReCaptchaV2 from "react-google-recaptcha";
import Label from "components/Label";
import UploadAvatar from "components/UploadAvatar";
import {
  createProject,
  updateProject,
  getProjectById,
} from "redux/slices/project";
import { toast } from "react-toastify";

const CHAINS = [
  { value: "eth", label: "Ethereum" },
  { value: "bnb", label: "Binance Smart Chain" },
  { value: "sol", label: "Solana" },
  { value: "other", label: "Other" },
];
// ----------------------------------------------------------------------

const SERVER_URL = "https://arcaneuniverse.com/uploads";

export default function ProjectNewForm() {
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");

  const params = useParams();

  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.project.project);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [chain, setChain] = useState(currentProject?.chain || "eth");

  useEffect(() => {
    if (isEdit) {
      dispatch(getProjectById(params.id));
    }
  }, [params.id]);

  const handleChainChange = (e) => {
    setChain(e.target.value);
  };

  // Recaptcha Funtions
  const handleToken = (token) => {
    setRecaptchaToken(token);
  };
  const handleExpire = () => {
    setRecaptchaToken(null);
  };

  const NewProjectSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    image: Yup.mixed().required("Project image is required"),
    website: Yup.string().url("Invalid url"),
    twitter: Yup.string().url("Invalid url"),
    telegram: Yup.string().url("Invalid url"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cover: null,
      name: currentProject?.name || "",
      image: currentProject?.image || null,
      description: currentProject?.description || "",
      twitter: currentProject?.twitter || "https://",
      telegram: currentProject?.telegram || "https://",
      website: currentProject?.website || "https://",
    },
    validationSchema: NewProjectSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const { image, name, description, twitter, telegram, website } = values;

        const formData = new FormData();
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("twitter", twitter);
        formData.append("telegram", telegram);
        formData.append("website", website);
        formData.append("chain", chain);
        if (recaptchaToken) {
          if (isEdit) {
            dispatch(updateProject(formData, currentProject._id));
          } else {
            dispatch(createProject(formData));
            resetForm();
          }
          setSubmitting(false);
        } else {
          toast.error("Please verify recaptcha!");
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("cover", {
          ...file,
          preview: URL.createObjectURL(file),
        });
        setFieldValue("image", file);
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <Card sx={{ py: 10, px: 3, position: "relative" }}>
            {isEdit && (
              <Label
                color={values.status !== "active" ? "error" : "success"}
                sx={{
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 24,
                  right: 24,
                }}
              >
                BANNED
              </Label>
            )}
            {isEdit ? (
              <Stack direction="row" justifyContent="center" sx={{ mb: 5 }}>
                <Box
                  component="img"
                  src={`${SERVER_URL}/${currentProject.image}`}
                  sx={{ width: 180, height: 180, borderRadius: 1 }}
                />
              </Stack>
            ) : (
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.cover}
                  maxSize={6145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.image && errors.image)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {touched.image && errors.image}
                </FormHelperText>
              </Box>
            )}

            <Stack spacing={3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="Website Link"
                  {...getFieldProps("website")}
                  error={Boolean(touched.website && errors.website)}
                  helperText={touched.website && errors.website}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="Twitter Link"
                  {...getFieldProps("twitter")}
                  error={Boolean(touched.twitter && errors.twitter)}
                  helperText={touched.twitter && errors.twitter}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="Telegram Link"
                  {...getFieldProps("telegram")}
                  error={Boolean(touched.telegram && errors.telegram)}
                  helperText={touched.telegram && errors.telegram}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <Select
                  select
                  value={chain}
                  onChange={handleChainChange}
                  fullWidth
                  inputProps={{
                    sx: {
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  MenuProps={{
                    sx: {
                      "& .MuiPaper-root": {
                        background: "rgba(255, 255, 255, 0.3)",
                        backdropFilter: "blur(20px)",
                      },
                    },
                  }}
                >
                  {CHAINS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box
                        component="img"
                        src={`/chains/${option.value}.png`}
                        sx={{ width: 32, mr: 2 }}
                      />
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Stack>

              <Stack direction="row" justifyContent="center">
                <ReCaptchaV2
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleToken}
                  onExpired={handleExpire}
                />
              </Stack>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <LoadingButton
                  type="submit"
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  fullWidth
                >
                  {!isEdit ? "Submit Project" : "Save Changes"}
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Container>
      </Form>
    </FormikProvider>
  );
}
