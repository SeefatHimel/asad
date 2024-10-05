import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { CSVLink } from "react-csv"; // Import CSVLink for CSV download
import { SelectChangeEvent } from "@mui/material/Select"; // Ensure SelectChangeEvent is imported

interface StudentData {
  nickName: string;
  fullName: string;
  studentID: string;
  class: string;
  section: string;
  version: string;
  wings: string;
  bloodGroup: string;
  mobileNo: string;
  picture: string;
}

// Sample demo data with picture URLs
const demoData: StudentData[] = [
  {
    nickName: "JohnDoe",
    fullName: "John Doe",
    studentID: "S12345",
    class: "10",
    section: "A",
    version: "English",
    wings: "Boys",
    bloodGroup: "O+",
    mobileNo: "123-456-7890",
    picture: "https://via.placeholder.com/50", // Placeholder image
  },
  {
    nickName: "JaneDoe",
    fullName: "Jane Doe",
    studentID: "S67890",
    class: "9",
    section: "B",
    version: "Bangla",
    wings: "Girls",
    bloodGroup: "AB+",
    mobileNo: "098-765-4321",
    picture: "https://via.placeholder.com/50", // Placeholder image
  },
  // Add more demo data as needed
];

const classOptions = ["9", "10", "11", "12"];
const sectionOptions = ["A", "B", "C", "D", "E"];
const versionOptions = ["Bangla", "English"];
const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DataTable: React.FC = () => {
  const [filters, setFilters] = useState({
    class: "",
    section: "",
    version: "",
    bloodGroup: "",
  });

  // Handle filter change
  const handleFilterChange = (
    event: SelectChangeEvent<string>, // Use SelectChangeEvent<string> for typing
    filterName: string
  ) => {
    setFilters({
      ...filters,
      [filterName]: event.target.value as string,
    });
  };

  const handleResetFilters = () => {
    setFilters({
      class: "",
      section: "",
      version: "",
      bloodGroup: "",
    });
  };

  // Filter the demo data based on selected filters
  const filteredData = demoData.filter((student) => {
    return (
      (filters.class ? student.class === filters.class : true) &&
      (filters.section ? student.section === filters.section : true) &&
      (filters.version ? student.version === filters.version : true) &&
      (filters.bloodGroup ? student.bloodGroup === filters.bloodGroup : true)
    );
  });

  // Function to download PDF (currently disabled)
  const downloadPDF = () => {
    return; // Placeholder for future PDF functionality
  };

  return (
    <TableContainer component={Paper} sx={{ margin: "20px" }}>
      <Typography variant="h4" sx={{ margin: "20px" }}>
        Student Data
      </Typography>
      <div style={{ display: "flex", gap: "20px", margin: "20px" }}>
        <FormControl variant="outlined" size="small" className="w-[100px]">
          <InputLabel>Class</InputLabel>
          <Select
            value={filters.class}
            onChange={(e) =>
              handleFilterChange(e as SelectChangeEvent<string>, "class")
            }
            label="Class"
          >
            <MenuItem value="">All</MenuItem>
            {classOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className="w-[100px]">
          <InputLabel>Section</InputLabel>
          <Select
            value={filters.section}
            onChange={(e) =>
              handleFilterChange(e as SelectChangeEvent<string>, "section")
            }
            label="Section"
          >
            <MenuItem value="">All</MenuItem>
            {sectionOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className="w-[100px]">
          <InputLabel>Version</InputLabel>
          <Select
            value={filters.version}
            onChange={(e) =>
              handleFilterChange(e as SelectChangeEvent<string>, "version")
            }
            label="Version"
          >
            <MenuItem value="">All</MenuItem>
            {versionOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" className="w-[100px]">
          <InputLabel>Blood Group</InputLabel>
          <Select
            value={filters.bloodGroup}
            onChange={(e) =>
              handleFilterChange(e as SelectChangeEvent<string>, "bloodGroup")
            }
            label="Blood Group"
          >
            <MenuItem value="">All</MenuItem>
            {bloodGroupOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
        <CSVLink
          data={filteredData}
          filename={"student_data.csv"}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Download CSV
          </Button>
        </CSVLink>
        <Button
          variant="outlined"
          color="success"
          onClick={downloadPDF}
          style={{ marginLeft: "10px" }}
        >
          Download PDF
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>Nick Name</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Wings</TableCell>
            <TableCell>Blood Group</TableCell>
            <TableCell>Mobile No</TableCell>
            <TableCell>Picture</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.studentID}</TableCell>
              <TableCell>{student.nickName}</TableCell>
              <TableCell>{student.fullName}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.section}</TableCell>
              <TableCell>{student.version}</TableCell>
              <TableCell>{student.wings}</TableCell>
              <TableCell>{student.bloodGroup}</TableCell>
              <TableCell>{student.mobileNo}</TableCell>
              <TableCell>
                <Avatar
                  alt={`${student.fullName}'s profile`}
                  src={student.picture}
                  sx={{ width: 50, height: 50 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
