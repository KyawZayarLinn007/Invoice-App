import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { visuallyHidden } from "@mui/utils";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config.js";
import { CSVLink } from "react-csv";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "tax",
    numeric: true,
    disablePadding: false,
    label: "Tax",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoicesPage({ invoices, setInvoices }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const invoicesCollectionRef = collection(db, "invoices");

  let navigate = useNavigate();

  //delete open state
  const [dopen, setDOpen] = React.useState(false);

  //deleteId state
  const [deleteId, setDeleteId] = React.useState(null);

  console.log(`The deleteId state is`, deleteId);

  // csv options
  let headers = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
    { label: "tax", key: "tax" },
    { label: "total", key: "total" },
  ];

  let csvReport = {
    filename: "invoices-report.csv",
    headers,
    data: invoices,
  };

  const handleEditBtn = (id) => {
    navigate(`/update/${id}`);
  }

  const handleDeleteInvoice = () => {
    const deleteInvoice = async (id) => {
      const invoiceDoc = doc(db, "invoices", id);
      let value = await deleteDoc(invoiceDoc);
      console.log(`The deleted value is`, value);
    };
    deleteInvoice(deleteId);

    const getInvoices= async () => {
      const data = await getDocs(invoicesCollectionRef);
      setInvoices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getInvoices();
    setDOpen(false)
  };

  React.useEffect(() => {
    const getInvoices = async () => {
      const data = await getDocs(invoicesCollectionRef);
      setInvoices(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getInvoices();
  }, []);

  console.log("The fetched invoices is", invoices);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = invoices.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - invoices.length) : 0;

  const handleClickDeleteOpen = (id) => {
    setDOpen(true);
    setDeleteId(id);
  };

  const handleDeleteClose = () => {
    setDOpen(false);
  };

  return (
    <>
      {/* delete dialog */}
      <Dialog
        fullWidth={true}
        open={dopen}
        onClose={handleDeleteClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Delete invoice</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            This invoice will be deleted forever! Are you sure to continue this
            operation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteInvoice} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ marginLeft: "10%", marginRight: "10%", marginBottom: "20px" }}
      >
        <Link to="/create">
          <Button variant="contained" color="success" endIcon={<AddIcon />}>
            Create
          </Button>
        </Link>
        <CSVLink {...csvReport}>
          <Button
            variant="contained"
            color="success"
            endIcon={<FileUploadIcon />}
          >
            Export CSV
          </Button>
        </CSVLink>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{ width: "80%", textAlign: "center" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={invoices?.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}

                  {stableSort(invoices, getComparator(order, orderBy))
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((invoice, index) => {
                      const isItemSelected = isSelected(invoice.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, invoice.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={invoice.name}
                        >
                          <TableCell component="th" id={labelId} scope="row">
                            {invoice.name}
                          </TableCell>
                          <TableCell align="right">{invoice.tax}</TableCell>
                          <TableCell align="right">{invoice.total}</TableCell>
                          <TableCell align="right">
                            <IconButton color="success" onClick={() => handleEditBtn(invoice.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => {
                                handleClickDeleteOpen(invoice.id);
                              }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}

                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={invoices?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Stack>
    </>
  );
}
