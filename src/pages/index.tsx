import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";

// Dropdown options as separate variables
const classOptions = [
  "PG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const sectionOptions = ["A", "B", "C", "D", "E", "F"];
const versionOptions = ["Bangla", "English"];
const wingsOptions = ["Boys", "Girls"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface FormData {
  nickName: string;
  fullName: string;
  studentID: string;
  class: string;
  section: string;
  version: string;
  wings: string;
  bloodGroup: string;
  mobileNo: string;
  picture: File | null;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    nickName: "",
    fullName: "",
    studentID: "",
    class: "",
    section: "",
    version: "",
    wings: "",
    bloodGroup: "",
    mobileNo: "",
    picture: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, picture: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="p-20">
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Student Information Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Nick Name"
              name="nickName"
              value={formData.nickName}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              label="Student ID"
              name="studentID"
              value={formData.studentID}
              onChange={handleInputChange}
              required
            />

            <FormControl fullWidth required>
              <InputLabel>Class</InputLabel>
              <Select
                value={formData.class}
                onChange={(e) => handleSelectChange("class", e.target.value)}
                name="class"
              >
                {classOptions.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Section</InputLabel>
              <Select
                value={formData.section}
                onChange={(e) => handleSelectChange("section", e.target.value)}
                name="section"
              >
                {sectionOptions.map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Version</InputLabel>
              <Select
                value={formData.version}
                onChange={(e) => handleSelectChange("version", e.target.value)}
                name="version"
              >
                {versionOptions.map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Wings</InputLabel>
              <Select
                value={formData.wings}
                onChange={(e) => handleSelectChange("wings", e.target.value)}
                name="wings"
              >
                {wingsOptions.map((wing) => (
                  <MenuItem key={wing} value={wing}>
                    {wing}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Blood Group</InputLabel>
              <Select
                value={formData.bloodGroup}
                onChange={(e) =>
                  handleSelectChange("bloodGroup", e.target.value)
                }
                name="bloodGroup"
              >
                {bloodGroupOptions.map((bg) => (
                  <MenuItem key={bg} value={bg}>
                    {bg}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Mobile No"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              required
            />

            <Button variant="contained" component="label">
              Upload Picture
              <input
                type="file"
                hidden
                name="picture"
                onChange={handleFileChange}
                required
              />
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}
