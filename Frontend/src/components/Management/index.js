import { useState, useEffect } from "react";
import {
  Container,
  TableStyles,
  TitleContainer,
  TitleSection,
  TitleIconStyles,
  TableHeadStyles,
} from "./styles";
import * as MANAGEMENT_FLAGS from "../../utils/flags/managementFlags";
import {
  getAllCategories,
  getAllUsers,
  getAllApis,
  deleteCategory,
  deleteUser,
  deleteApi,
} from "../../utils/api";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CodeIcon from "@mui/icons-material/Code";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as PROPS from "../../utils/constants/managementProps";
import { getPropValue, toasterAndRedirect } from "../../utils/logic";
import { redirectToPath } from "../../utils/browser";
import DialogModal from "../DialogModal";
import RoutesUrls from "../../utils/constants/routes";
import { toasterTypes } from "../../utils/constants/toaster";
import Spinner from "../Spinner";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Management = ({ flagData }) => {
  const [data, setData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsers, setIsUsers] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [refreshRoute, setRefreshRoute] = useState("");

  useEffect(() => {
    const fetchData = async (flag) => {
      let data = [];
      switch (flag) {
        case MANAGEMENT_FLAGS.APIS_MANAGEMENT.flag:
          data = await getAllApis();
          setProperties(PROPS.APIS_PROPS);
          setRefreshRoute(RoutesUrls.MANAGE_APIS);
          break;
        case MANAGEMENT_FLAGS.USERS_MANAGEMENT.flag:
          data = await getAllUsers();
          setProperties(PROPS.USERS_PROPS);
          setRefreshRoute(RoutesUrls.MANAGE_USERS);
          setIsUsers(true);
          break;
        case MANAGEMENT_FLAGS.CATEGORIES_MANAGEMENT.flag:
          data = await getAllCategories();
          setProperties(PROPS.CATEGORIES_PROPS);
          setRefreshRoute(RoutesUrls.MANAGE_CATEGORIES);
          break;
        default:
          break;
      }

      return data;
    };

    fetchData(flagData.flag).then((data) => {
      setData(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [flagData]);

  const handleAddNewButton = () => {
    redirectToPath(flagData.url);
  };

  const handleEditButton = (id) => {
    redirectToPath(`${flagData.url}/${id}`);
  };

  const handleDeleteButton = (id, name) => {
    setIsModalOpen(true);
    setSelectedItem({ id, name });
  };

  const handleConfirmDelete = async () => {
    setIsModalOpen(false);
    switch (flagData.flag) {
      case MANAGEMENT_FLAGS.APIS_MANAGEMENT.flag:
        await deleteApi(selectedItem.id);
        break;
      case MANAGEMENT_FLAGS.USERS_MANAGEMENT.flag:
        await deleteUser(selectedItem.id);
        break;
      case MANAGEMENT_FLAGS.CATEGORIES_MANAGEMENT.flag:
        await deleteCategory(selectedItem.id);
        break;
      default:
        break;
    }
    toasterAndRedirect(
      {
        toasterType: toasterTypes.SUCCESS,
        message: `${flagData.Singular} '${selectedItem.name}' deleted successfuly!`,
      },
      refreshRoute
    );
  };

  return (
    <Container>
      <TitleContainer>
        <TitleSection>
          <CodeIcon sx={TitleIconStyles} />
          All {flagData.plural}
        </TitleSection>
        <Button
          variant="contained"
          color="success"
          onClick={handleAddNewButton}
          endIcon={<AddIcon />}
        >
          Add New {flagData.Singular}
        </Button>
      </TitleContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <TableContainer component={Paper} sx={TableStyles}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {properties.map((prop, index) => {
                  return (
                    <StyledTableCell
                      key={index}
                      align="left"
                      sx={TableHeadStyles}
                    >
                      {prop.displayName}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell align="left" sx={TableHeadStyles}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((dataObj, dataIndex) => {
                return (
                  <StyledTableRow key={dataIndex}>
                    {properties.map((prop, propIndex) => {
                      return (
                        <StyledTableCell key={propIndex} align="left">
                          {getPropValue(dataObj, prop.path)}
                        </StyledTableCell>
                      );
                    })}
                    <StyledTableCell align="left" sx={{ minWidth: "120px" }}>
                      <IconButton
                        aria-label="edit"
                        sx={{ color: "#FFC107" }}
                        onClick={() => handleEditButton(dataObj._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() =>
                          handleDeleteButton(
                            dataObj._id,
                            isUsers ? dataObj.username : dataObj.name
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <DialogModal
        isOpen={isModalOpen}
        title={`Delete ${flagData.Singular}`}
        message={`Are you sure you want to delete '${selectedItem.name}' ${flagData.Singular}?`}
        onAgree={() => handleConfirmDelete()}
        onCancel={() => setIsModalOpen(false)}
      />
    </Container>
  );
};

export default Management;
