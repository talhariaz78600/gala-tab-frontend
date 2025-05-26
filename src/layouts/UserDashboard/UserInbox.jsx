import React, { useState } from "react";
import { Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LeftSide from "./InboxTiles/LeftSide";
import MessageSide from "./InboxTiles/MessageSide";
import RightSide from "./InboxTiles/RightSide";
import UserTopBar from "../../components/UserDashboard/UserTopBar";

const UserInbox = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <UserTopBar />
      <div
      className="px-4 py-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 justify-between inbox-h">
          <div className="inbox-h bg-[#F7F7F7] rounded-xl relative p-3">
            <LeftSide />
          </div>
          <div className="hidden lg:block lg:col-start-2 md:col-end-5 inbox-h">
            <div className="grid grid-cols-3 gap-4 inbox-h">
              <div className="lg:col-start-1 lg:col-end-4 xl:col-start-1 xl:col-end-3 border border-black h-full rounded-xl bg-[#F7F7F7]">
                <MessageSide />
              </div>
              <div className="inbox-h overflow-y-auto scroll-x-hidden hidden xl:block rounded-xl p-3 bg-[#F7F7F7]">
                <RightSide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInbox;
