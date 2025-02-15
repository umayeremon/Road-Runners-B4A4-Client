/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/Logo/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut, selectAuthUser } from "@/redux/features/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/features/user/userManagementApi";

function Navbar() {
  const user = useAppSelector(selectAuthUser);
  const pages = [
    { label: "Home", path: "/" },
    { label: "All Products", path: "/allProducts" },
    { label: "About", path: "/about" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const email = user?.email;
  const { data: userdata } = useGetSingleUserQuery(email as string);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "#f9f9f1",
        padding: "10px 0 10px 0",
        // height: "100px",
      }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* large device image */}
          <img src={logo} alt="" className="w-24 hidden lg:block" />
          {/* small device menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <NavLink
                  key={page.path}
                  to={page.path}
                  onClick={handleCloseNavMenu}>
                  <MenuItem>{page?.label}</MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          {/* small & medium device image */}
          <div className="w-full  flex justify-center items-center lg:hidden">
            <img src={logo} alt="" className="w-24" />
          </div>
          {/* medium & large device nav item */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}>
            {pages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#FF6600]"
                    : "text-gray-800 hover:text-[#FF6600]"
                }>
                <h1 className="mr-8 font-bold">{page?.label}</h1>
              </NavLink>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <IconButton onClick={handleClick}>
                <Avatar src={userdata?.data?.userImage} className="" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleClose();
                  }}>
                  My Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/dashboard");
                    handleClose();
                  }}>
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                  }}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <div className="flex flex-row gap-2">
              {/* <LoginDialog /> */}
              <NavLink to="/login" className="text-gray-800">
                Login
              </NavLink>
              {/* <span>/</span>
              <NavLink to="/register">SignUp</NavLink> */}
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
