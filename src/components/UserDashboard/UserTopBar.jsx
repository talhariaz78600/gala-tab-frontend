import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import NotifyBell from "../../assets/img/notify-bell.png";
import Profile from "../../assets/img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { resetChatState } from "@/store/chatSlice";
import { persistor } from "@/store/store";

export default function UserTopBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.auth.user);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("token-removed"));
    dispatch(logout());
    dispatch(resetChatState());
    persistor.purge();
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  };
  return (
    <div>
      <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E]">
        <div className="mycontainer">
          <div className="flex items-center justify-between py-3">
            <div>
              <Link
                to="/user-dashboard/dashboard"
                className="bg-gradient-to-b inline-block from-gray-500 to-gray-900 text-white me-2 text-nowrap font-semibold py-3 px-5 sm:px-8 rounded-full border-4 border-black shadow-md"
              >
                Gala Tab
              </Link>
            </div>
            <div className="flex items-center justify-end ms-auto gap-2">
              <div>
                <Link
                  to="/user-dashboard/user-notification"
                  className="bg-white p-3 border block rounded-full"
                >
                  <img
                    className="size-[15px] max-w-[15px] object-contain max-w-15px"
                    src={NotifyBell}
                    alt=""
                  />
                </Link>
              </div>
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <div className="flex items-center border rounded-3xl py-2 px-3 bg-white gap-2">
                    <div className="relative">
                      <img
                        src={user?.profilePicture || Profile}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full max-w-[30px] object-cover"
                      />
                      <div className="absolute w-[10px] h-[10px] bg-[#20C54C] rounded-full border-white border-2 shadow bottom-0 left-0"></div>
                    </div>
                    <FaCaretDown className="text-[#4A4A4A] text-xl" />
                  </div>
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    sx={{ fontFamily: "tt_chocolates" }}
                    onClick={() => {
                      navigate("/user-dashboard/user-profile");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/user-dashboard/user-profile");
                    }}
                    sx={{ fontFamily: "tt_chocolates" }}
                  >
                    My account
                  </MenuItem>
                  <MenuItem
                    sx={{ fontFamily: "tt_chocolates" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
