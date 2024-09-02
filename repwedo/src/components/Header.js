import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery,
  alpha,
  styled,
  Select,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart,
  AccountCircle,
  LocationOn,
  Brightness4,
  Brightness7,
  ElectricBolt,
  Build,
  HomeRepairService,
  MenuOpen,
} from "@mui/icons-material";
import { UserContext } from "../context/UserContext";

// Updated styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: theme.palette.primary.dark,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 600,
  marginLeft: theme.spacing(2),
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}));

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Header = ({ mode, toggleTheme }) => {
  const [location, setLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleServicesClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleServicesClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleAccountClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const servicesMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleServicesClose}
    >
      <MenuItem
        onClick={handleServicesClose}
        component={Link}
        to="/services/appliances"
      >
        <ElectricBolt sx={{ mr: 1 }} /> Appliance Repair
      </MenuItem>
      <MenuItem
        onClick={handleServicesClose}
        component={Link}
        to="/services/electronics"
      >
        <Build sx={{ mr: 1 }} /> Electronics Repair
      </MenuItem>
      <MenuItem
        onClick={handleServicesClose}
        component={Link}
        to="/services/installations"
      >
        <HomeRepairService sx={{ mr: 1 }} /> Installations
      </MenuItem>
    </Menu>
  );

  const mobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/services">
        Services
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/cart">
        Cart
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/account">
        Account
      </MenuItem>
      <MenuItem
        onClick={() => {
          toggleTheme();
          handleMobileMenuClose();
        }}
      >
        {mode === "dark" ? "Light Mode" : "Dark Mode"}
      </MenuItem>
    </Menu>
  );

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo variant="h6" component={Link} to="/">
          <ElectricBolt sx={{ mr: 1 }} />
          RepWeDo
        </Logo>
        {!isMobile && (
          <>
            <StyledButton
              color="inherit"
              onClick={handleServicesClick}
              aria-controls="services-menu"
              aria-haspopup="true"
            >
              Services
            </StyledButton>
            {servicesMenu}
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search repair services..."
            inputProps={{ "aria-label": "search" }}
          />
        </SearchBar>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationOn />
            <Select
              value={location}
              onChange={handleLocationChange}
              displayEmpty
              inputProps={{ "aria-label": "Location" }}
              sx={{ ml: 1, minWidth: 120 }}
            >
              <MenuItem value="">
                <em>Select Location</em>
              </MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="Los Angeles">Los Angeles</MenuItem>
              <MenuItem value="Chicago">Chicago</MenuItem>
            </Select>
          </Box>
        )}
        {!isMobile && (
          <>
            <Tooltip title="Cart">
              <StyledIconButton
                color="inherit"
                aria-label="shopping cart"
                component={Link}
                to="/cart"
              >
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCart />
                </Badge>
              </StyledIconButton>
            </Tooltip>
            <Tooltip title="Account">
              <StyledIconButton
                color="inherit"
                aria-label="account"
                onClick={handleAccountClick}
              >
                <AccountCircle />
              </StyledIconButton>
            </Tooltip>
            <Tooltip
              title={`Switch to ${mode === "dark" ? "Light" : "Dark"} Mode`}
            >
              <StyledIconButton
                color="inherit"
                onClick={toggleTheme}
                aria-label="toggle theme"
              >
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </StyledIconButton>
            </Tooltip>
          </>
        )}
        {isMobile && (
          <StyledIconButton
            color="inherit"
            aria-label="open menu"
            onClick={handleMobileMenuOpen}
          >
            <MenuOpen />
          </StyledIconButton>
        )}
        {mobileMenu}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
