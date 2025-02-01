import {
  Drawer,
  List,
  Box,
  useMediaQuery,
  useTheme,
  MenuItem,
} from "@mui/material";
import { AddBox, Inventory, People } from "@mui/icons-material";
import { useAppSelector } from "@/redux/hooks";
import { selectAuthUser } from "@/redux/features/auth/authSlice";
import SidebarItems from "./utils/SidebarItems";
import PersonIcon from "@mui/icons-material/Person";

const sidebarWidth = 250;

const Sidebar = ({
  open,
  toggleSidebar,
}: {
  open: boolean;
  toggleSidebar: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const user = useAppSelector(selectAuthUser);

  const menuItems = [
    {
      label: "All Product",
      path: "products",
      icon: <Inventory />,
      role: "Admin",
    },
    {
      label: "Create Product",
      path: "create-product",
      icon: <AddBox />,
      role: "Admin",
    },
    { label: "All User", path: "all-user", icon: <People />, role: "Admin" },

    {
      label: "Profile",
      path: "customer-profile",
      icon: <PersonIcon />,
      role: "Customer",
    },
  ];

  return (
    <>
      {/* For Mobile */}
      {isMobile ? (
        <Drawer anchor="left" open={open} onClose={toggleSidebar}>
          <Box
            sx={{
              width: sidebarWidth,
              bgcolor: "#1e293b",
              color: "white",
              height: "100vh",
            }}>
            <MenuItem
              sx={{
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "600",
                paddingTop: "25px",
              }}>
              {`${user?.role}'s Dashboard`}
            </MenuItem>
            <List>
              {menuItems
                .filter(
                  (item) => item.role === "all" || item.role === user?.role // Filter items based on role
                )
                .map((item) => (
                  <SidebarItems
                    key={item.path}
                    item={item}
                    toggleSidebar={toggleSidebar}
                  />
                ))}
            </List>
          </Box>
        </Drawer>
      ) : (
        //  For Desktop
        <Box
          sx={{
            width: sidebarWidth,
            height: "100vh",
            bgcolor: "#1e293b",
            color: "white",
            padding: 2,
            position: "fixed",
          }}>
          <MenuItem
            sx={{
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "600",
            }}>
            {`${user?.role}'s Dashboard`}
          </MenuItem>
          <List sx={{ marginTop: "20px" }}>
            {menuItems
              .filter((item) => item.role === "all" || item.role === user?.role)
              .map((item) => (
                <SidebarItems key={item.path} item={item} />
              ))}
          </List>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
