import AccountDetail from "../assets/img/account-detail.png";
import InboxDash from "../assets/img/inbox.png";
import BookingHistory from "../assets/img/bookinghistory.png";
import ReviewRating from "../assets/img/reviewrating.png";
import FavouriteListing from "../assets/img/favouritelisting.png";
import Profile from "../assets/img/profile-dashboard.png";
import Notification from "../assets/img/notification.png";
import Setting from "../assets/img/setting.png";
import HelpIcon from "../assets/img/help-icon.png";
import Calendar from "../assets/img/Calendar.png";
import Service from "../assets/img/ServicesManagement.png";
import Vendor from "../assets/img/vendorsmanagemnet.png";
import UserMana from "../assets/img/usermanagement.png";
import SubAdmins from "../assets/img/subadmins.png";
import Template from "../assets/img/role.png";
import reportsAnalytics from "../assets/img/reports&analytics.png";
import managecountry from "../assets/img/managecountry.png";
import Finance from "../assets/img/finance.png";
import totalookings from "../assets/img/totalookings.png";
import paymentgateway from "../assets/img/paymentgateway.png";
import despute from "../assets/img/despute.png";
import discount from "../assets/img/discount.png";
import dollorIcon from "../assets/img/dollorIcon.png";
import staffIcon from "../assets/img/staff.png";
import log from "../assets/img/log.png";
import newletter from "../assets/img/send.png";

import Payout from "../assets/img/Pay-out.png";

export const sideNavItems = [
  {
    id: "dashboard",
    text: "Dashboard",
    image: AccountDetail,
    path: "/admin-dashboard/dashboard",
  },
  {
    id: "inbox",
    text: "Inbox",
    image: InboxDash,
    path: "/inbox",
  },
  {
    id: "calendar",
    text: "Calendar",
    image: Calendar,
    path: "/admin-dashboard/calendar",
  },
  {
    id: "serviceManagement",
    text: "Platform Services",
    image: Service,
    path: "/admin-dashboard/service-management",
    activePaths: [
      "/admin-dashboard/service-detail",
      "/admin-dashboard/services",
    ],
  },
  {
    id: "vendorManagement",
    text: "Vendors Management",
    image: Vendor,
    path: "/admin-dashboard/Vendor-Management",
    activePaths: [
      "/admin-dashboard/Add-New-Vendor",
      "/admin-dashboard/New-Request-Profile",
      "/admin-dashboard/add-new-vendor",
      "/admin-dashboard/Tax-Profile",
      "/admin-dashboard/ID-Verification-Details",
      "/admin-dashboard/Vendor-details",
    ],
  },
  // {
  //   id: "userManagement",
  //   text: "User Management",
  //   image: UserMana,
  //   path: "/admin-dashboard/User-Management",
  //   activePaths: ["/admin-dashboard/add-new-user"],
  // },
  {
    id: "subAdmins",
    text: "Sub Admins",
    image: SubAdmins,
    path: "/admin-dashboard/Sub-Admins",
    activePaths: [
      "/admin-dashboard/Add-New-Sub-Admin",
      "/admin-dashboard/edit-Sub-Admin",
    ],
  },
  {
    id: "template",
    text: "Template",
    image: Template,
    path: "/admin-dashboard/templates",
    activePaths: [
      "/admin-dashboard/add-permission-templates",
      "/admin-dashboard/edit-permission-templates",
      "/admin-dashboard/add-task-templates",
      "/admin-dashboard/edit-task-templates",
    ],
  },
  {
    id: "bookings",
    text: "Bookings",
    image: totalookings,
    path: "/admin-dashboard/booking",
    activePaths: ["/admin-dashboard/Admin-Booking-Details"],
  },
  {
    id: "totalBookings",
    text: "Total Bookings",
    image: totalookings,
    path: "/admin-dashboard/total-booking",
    activePaths: ["/admin-dashboard/Admin-Booking-Details"],
  },
  {
    id: "finance",
    text: "Finance",
    image: Finance,
    path: "/admin-dashboard/finance",
  },
  {
    id: "payouts",
    text: "Payouts",
    image: Payout,
    path: "/admin-dashboard/payouts",
  },
  {
    id: "pricing",
    text: "Pricing",
    image: dollorIcon,
    path: "/admin-dashboard/pricing",
  },
  {
    id: "notification",
    text: "Notification",
    image: Notification,
    path: "/admin-dashboard/Admin-Notifications",
  },
  {
    id: "paymentGateway",
    text: "Payment Gateway",
    image: paymentgateway,
    path: "/admin-dashboard/payment-gateway",
    activePaths: [
      "/admin-dashboard/payment-gateway",
      "/admin-dashboard/add-Payment",
    ],
  },
  {
    id: "manageCountry",
    text: "Manage Country",
    image: managecountry,
    path: "/admin-dashboard/manage-country",
    activePaths: [
      "/admin-dashboard/add-country",
      "/admin-dashboard/edit-Country",
    ],
  },
  {
    id: "manageCity",
    text: "Manage City",
    image: managecountry,
    path: "/admin-dashboard/manage-city",
    activePaths: ["/admin-dashboard/add-city", "/admin-dashboard/edit-city"],
  },
  {
    id: "staff",
    text: "Staff",
    image: staffIcon,
    path: "/admin-dashboard/staff",
    activePaths: [
      "/admin-dashboard/Add-New-Staff",
      "/admin-dashboard/edit-staff",
    ],
  },
  {
    id: "review",
    text: "Review List",
    image: ReviewRating,
    path: "/admin-dashboard/review-list",
  },
  {
    id: "reports",
    text: "Reports & Analytics",
    image: reportsAnalytics,
    path: "/admin-dashboard/reports-and-analytics",
  },
  {
    id: "accounts",
    text: "Accounts",
    image: Profile,
    path: "/admin-dashboard/accounts",
    activePaths: [
      "/admin-dashboard/vendor-account-profile",
      "/admin-dashboard/accounts-profile",
    ],
  },
  {
    id: "disputes",
    text: "Dispute",
    image: despute,
    path: "/admin-dashboard/admin-dispute",
    activePaths: ["/admin-dashboard/dispute-details"],
  },
  {
    id: "logs",
    text: "Logs",
    image: log,
    path: "/admin-dashboard/logs",
    activePaths: ["/admin-dashboard/logs", "/admin-dashboard/logs-detail"],
  },
  {
    id: "advertisement",
    text: "Advertisement",
    image: discount,
    path: "/admin-dashboard/advertisement",
  },
  {
    id: "newsletter",
    text: "News Letter",
    image: newletter,
    path: "/admin-dashboard/news-letter",
  },
  {
    id: "help",
    text: "Help & Support",
    image: HelpIcon,
    path: "/admin-dashboard/contact-support",
  },
  {
    id: "settings",
    text: "Settings",
    image: Setting,
    path: "/admin-dashboard/setting",
    activePaths: ["/admin-dashboard/edit-setting"],
  },
];
