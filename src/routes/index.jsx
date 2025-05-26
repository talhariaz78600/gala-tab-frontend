import { Outlet } from "react-router";
import * as layouts from "../layouts";
import ProtectedRoute from "@/components/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <layouts.LandingPageLayout />,
    children: [
      {
        path: "",
        element: <layouts.LandingPage />,
      },
      {
        path: "cart",
        element: <layouts.Cart />,
      },
      {
        path: "after-listining-search",
        element: <layouts.AfterListiningSearch />,
      },
      {
        path: "planning",
        element: <layouts.Planning />,
      },
      {
        path: "contact",
        element: <layouts.Contact />,
      },
      {
        path: "faqs",
        element: <layouts.FAQs />,
      },
      {
        path: "timer",
        element: <layouts.TimerSet />,
      },
      {
        path: "help",
        element: <layouts.HelpCenter />,
      },
      {
        path: "help-detail/:id",
        element: <layouts.OneHelp />,
      },
      {
        path: "alltopics",
        element: <layouts.HelpAllTopics />,
      },
      {
        path: "about",
        element: <layouts.AboutUS />,
      },
      {
        path: "country",
        element: <layouts.CountryBase />,
      },
      {
        path: "listing-detail/:id",
        element: <layouts.ListingServiceDetail />,
      },
      {
        path: "request-book",
        element: <layouts.RequestBook />,
      },
      {
        path: "more-photo",
        element: <layouts.MorePhoto />,
      },
    ],
  },
  {
    path: "maps",
    element: <layouts.Maps />,
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <layouts.Auth />,
      },
      {
        path: "forgot-password",
        element: <layouts.ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <layouts.NewPassword />,
      },
      {
        path: "welcome",
        element: <Outlet />,
        children: [
          {
            path: "signup",
            element: <layouts.SignUp />,
          },
          {
            path: "",
            element: <layouts.WelcomeMessage />,
          },
          {
            path: "login",
            element: <layouts.Login />,
          },
          {
            path: "role",
            element: <layouts.Role />,
          },
          {
            path: "verification",
            element: <layouts.SelectVerification />,
          },
          // {
          //   path: "text-verification",
          //   element: <layouts.TextConfirmation />,
          // },
          {
            path: "email-verification",
            element: <layouts.EmailConfirmation />,
          },

          // Add OTP Verfication, forms, etc screens in sign up flow here
        ],
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute roles={["customer"]}>
        <layouts.UserDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <layouts.UserDash />,
      },
      {
        path: "user-help",
        element: <layouts.UserHelpCenter />,
      },
      {
        path: "user-list",
        element: <layouts.FavouriteListing />,
      },
      {
        path: "user-rating",
        element: <layouts.RatingList />,
      },
      {
        path: "staff",
        element: <layouts.Staff />,
      },
      {
        path: "Add-New-Staff",
        element: <layouts.AddNewStaff mode="new" />,
      },
      {
        path: "edit-Staff/:id",
        element: <layouts.AddNewStaff mode="edit" />,
      },
      {
        path: "user-profile",
        element: <layouts.UserProfile />,
      },
      {
        path: "edit-profile",
        element: <layouts.EditProfile />,
      },
      {
        path: "user-booking",
        element: <layouts.BookingDetail />,
      },
      {
        path: "user-account",
        element: <layouts.AccountDashboard />,
      },
      {
        path: "user-notification",
        element: <layouts.AdminNotifications />,
      },
      {
        path: "user-disputes",
        element: <layouts.VendorDispute type="user" />,
      },
      {
        path: "add-dispute",
        element: <layouts.VendorAddDispute mode="new" />,
      },
      {
        path: "edit-dispute",
        element: <layouts.VendorAddDispute mode="edit" />,
      },
      {
        path: "dispute-details",
        element: <layouts.DisputeDetails />,
      },
      {
        path: "user-client",
        element: <layouts.VendorClient />,
      },
      // {
      //   path: "User-Profile",
      //   element: <layouts.VendorClientProfile />,
      // },
      {
        path: "vendor-profile",
        element: <layouts.ProfileView />,
      },
      {
        path: "report",
        element: <layouts.ReportAnalytics />,
      },
    ],
  },
  {
    path: "User-Manage-Account",
    element: <layouts.UserManageAccount />,
  },
  {
    path: "Request-User-Data",
    element: <layouts.RequestUserData />,
  },
  {
    path: "Delete-User-Account",
    element: <layouts.DeleteUserAccount />,
  },
  {
    path: "User-Delete-Confirmation",
    element: <layouts.UserDeleteConfirmation />,
  },
  {
    path: "User-Payments-And-Payouts",
    element: <layouts.UserPaymentsAndPayouts />,
  },
  {
    path: "User-Global-Preferences",
    element: <layouts.GlobalPreferences />,
  },
  {
    path: "User-Tax-Forums",
    element: <layouts.UserTaxForums />,
  },
  {
    path: "User-Tax-Requirements",
    element: <layouts.UserTaxRequirements />,
  },
  {
    path: "User-Form-W-9",
    element: <layouts.UserFormW9 />,
  },
  // {
  //   path: "user-login",
  //   element: <layouts.UserLogin />,
  // },
  {
    path: "User-Inbox",
    element: <layouts.Inbox />,
  },
  {
    path: "user-stepper",
    element: <layouts.UserStepper />,
  },
  // {
  //   path: "vendor-login",
  //   element: <layouts.VendorLogin />,
  // },
  {
    path: "/vendor-dashboard",
    element: (
      <ProtectedRoute roles={["vendor"]}>
        <layouts.VendorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <layouts.VendorDash />,
      },
      {
        path: "service-listing",
        element: <layouts.ServiceListings />,
      },
      {
        path: "staff",
        element: <layouts.Staff />,
      },
      {
        path: "Add-New-Staff",
        element: <layouts.AddNewStaff mode="new" />,
      },
      {
        path: "edit-Staff/:id",
        element: <layouts.AddNewStaff mode="edit" />,
      },
      {
        path: "booking-requests",
        element: <layouts.BookingRequest />,
      },
      {
        path: "payout",
        element: <layouts.PayOut />,
      },
      {
        path: "services/:id",
        element: <layouts.Services />,
      },
      {
        path: "Confirm-Bookings",
        element: <layouts.ConfirmBookings mode="booked" />,
      },
      {
        path: "complete-Bookings",
        element: <layouts.ConfirmBookings mode="completed" />,
      },
      {
        path: "PayOut-Details",
        element: <layouts.PayOutDetails />,
      },
      {
        path: "Edit-Payout",
        element: <layouts.EditPayout />,
      },
      {
        path: "booking-details/:id",
        element: <layouts.AdminBookingDetails />,
      },
      {
        path: "Vendor-Profile",
        element: <layouts.VendorProfile key="vendor" />,
      },
      {
        path: "Vendor-Account",
        element: <layouts.VendorAccount />,
      },
      {
        path: "edit-profile",
        element: <layouts.EditProfileVendor />,
      },
      {
        path: "vendor-help-center",
        element: <layouts.VendorHelpCenter />,
      },
      {
        path: "Vendor-Notifications",
        element: <layouts.AdminNotifications />,
      },
      {
        path: "vendor-dispute",
        element: <layouts.VendorDispute type="vendor" />,
      },

      {
        path: "add-dispute",
        element: <layouts.VendorAddDispute mode="new" />,
      },
      {
        path: "edit-dispute",
        element: <layouts.VendorAddDispute mode="edit" />,
      },
      {
        path: "dispute-details",
        element: <layouts.DisputeDetails />,
      },
      {
        path: "calendar",
        element: <layouts.CalendarVendor />,
      },
      {
        path: "promo-discount",
        element: <layouts.VendorPromoDiscount />,
      },
      {
        path: "add-discount",
        element: <layouts.VendorAddDiscount mode="new" />,
      },
      {
        path: "edit-discount/:id",
        element: <layouts.VendorAddDiscount mode="edit" />,
      },
      {
        path: "all-client",
        element: <layouts.AllClient />,
      },
      {
        path: "client-profile",
        element: <layouts.ProfileView />,
      },
      {
        path: "vendor-report",
        element: <layouts.VendorReport />,
      },
      {
        path: "payments-and-Payouts",
        element: <layouts.PaymentsAndPayouts />,
      },

      // Add user dashboard routes here and then add them to the user dashboard layout( Sidebar.jsx )
    ],
  },
  {
    path: "vendor-started",
    element: <layouts.VendorGetStarted />,
  },
  {
    path: "vendor-service",
    element: <layouts.VendorStepperService />,
  },

  {
    path: "vendor-stepper",
    element: <layouts.VendorStepper />,
    children: [
      {
        path: "user-verified",
        element: <layouts.GetVerified />,
      },
    ],
  },
  {
    path: "user-review",
    element: <layouts.ReviewId />,
  },
  {
    path: "inbox",
    element: <layouts.Inbox />,
  },
  // {
  //   path: "admin-login",
  //   element: <layouts.AdminLogin />,
  // },

  {
    path: "verified",
    element: <layouts.VendorGetVerified />,
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <layouts.AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <layouts.AdminDashboard />,
      },
      {
        path: "admin-profile",
        element: <layouts.AdminProfile />,
      },
      {
        path: "edit-profile",
        element: <layouts.EditProfileInformation />,
      },
      {
        path: "service-management",
        element: <layouts.ServiceListings />,
      },
      {
        path: "services/:id",
        element: <layouts.Services />,
      },
      {
        path: "Vendor-Management",
        element: <layouts.VendorManagement />,
      },
      {
        path: "add-New-Vendor",
        element: <layouts.AddNewVendor />,
      },
      {
        path: "Add-New-Staff",
        element: <layouts.AddNewStaff mode="new" />,
      },
      {
        path: "edit-Staff/:id",
        element: <layouts.AddNewStaff mode="edit" />,
      },
      {
        path: "Vendor-Details/:id",
        element: <layouts.VendorDetails />,
      },
      {
        path: "New-Request-Profile",
        element: <layouts.NewRequestProfile />,
      },
      {
        path: "Tax-Profile",
        element: <layouts.TaxProfile />,
      },
      {
        path: "ID-Verification-Details",
        element: <layouts.IDVerificationDetails />,
      },
      {
        path: "User-Management",
        element: <layouts.UserManagement />,
      },
      {
        path: "Sub-Admins",
        element: <layouts.SubAdmins />,
      },
      {
        path: "templates",
        element: <layouts.Templates />,
      },
      {
        path: "add-permission-templates",
        element: <layouts.AddTemplate mode="new" />,
      },
      {
        path: "edit-permission-templates/:id",
        element: <layouts.AddTemplate mode="edit" />,
      },
      {
        path: "add-task-templates",
        element: <layouts.AddTaskTemplate mode="new" />,
      },
      {
        path: "edit-task-templates/:id",
        element: <layouts.AddTaskTemplate mode="edit" />,
      },

      {
        path: "Add-New-Sub-Admin",
        element: <layouts.AddNewSubAdmin mode="new" />,
      },
      {
        path: "edit-Sub-Admin/:id",
        element: <layouts.AddNewSubAdmin mode="edit" />,
      },
      {
        path: "sub-admin/change-password/:id",
        element: <layouts.SubAdminPassword mode="edit" />,
      },
      {
        path: "Add-New-User",
        element: <layouts.AddNewUser />,
      },
      {
        path: "add-Payment",
        element: <layouts.AddPayment />,
      },
      {
        path: "calendar",
        element: <layouts.AdminCalendar />,
      },
      {
        path: "booking",
        element: <layouts.TotalBooking mode="admin" />,
      },
      {
        path: "total-booking",
        element: <layouts.TotalBooking mode="all" />,
      },
      {
        path: "Finance",
        element: <layouts.Finance />,
      },
      {
        path: "payouts",
        element: <layouts.AdminPayouts />,
      },
      {
        path: "Admin-Notifications",
        element: <layouts.AdminNotifications />,
      },
      {
        path: "Payment-Gateway",
        element: <layouts.PaymentGateway />,
      },
      {
        path: "Manage-Country",
        element: <layouts.ManageCountry />,
      },
      {
        path: "manage-city",
        element: <layouts.ManageCity />,
      },

      {
        path: "add-Country",
        element: <layouts.AddCountry mode="new" />,
      },
      {
        path: "edit-Country/:id",
        element: <layouts.AddCountry mode="edit" />,
      },
      {
        path: "add-city",
        element: <layouts.AddCity mode="new" />,
      },
      {
        path: "edit-city/:id",
        element: <layouts.AddCity mode="edit" />,
      },
      {
        path: "Review-List",
        element: <layouts.ReviewList />,
      },
      {
        path: "Admin-Booking-Details/:id",
        element: <layouts.AdminBookingDetails />,
      },
      {
        path: "staff",
        element: <layouts.Staff />,
      },
      {
        path: "Reports-And-Analytics",
        element: <layouts.ReportsAndAnalytics />,
      },
      {
        path: "Venue-Reports-Details",
        element: <layouts.VenueReportsDetails />,
      },
      {
        path: "Export-Venue-Reports",
        element: <layouts.ExportVenueReports />,
      },

      {
        path: "setting",
        element: <layouts.Setting />,
      },
      {
        path: "edit-setting",
        element: <layouts.EditGeneralSetting />,
      },
      {
        path: "contact-support",
        element: <layouts.ContactSupport />,
      },
      {
        path: "service-detail",
        element: <layouts.ServiceDetail />,
      },
      {
        path: "accounts",
        element: <layouts.Accounts />,
      },
      {
        path: "accounts-profile",
        element: <layouts.AccountsProfile />,
      },
      {
        path: "vendor-account-profile",
        element: <layouts.VendorAccountProfile />,
      },
      {
        path: "admin-dispute",
        element: <layouts.AdminDispute />,
      },
      {
        path: "dispute-details",
        element: <layouts.AdminDisputeDetails />,
      },
      {
        path: "promo-discount",
        element: <layouts.PromoDiscount />,
      },
      {
        path: "categories",
        element: <layouts.Categories />,
      },
      {
        path: "filters",
        element: <layouts.Filters />,
      },
      {
        path: "add-discount",
        element: <layouts.AddDiscount />,
      },
      {
        path: "pricing",
        element: <layouts.Pricing />,
      },
      {
        path: "advertisement",
        element: <layouts.Advertisment />,
      },
      {
        path: "logs",
        element: <layouts.Logs />,
      },
      {
        path: "logs-detail",
        element: <layouts.LogDetail />,
      },
      {
        path: "news-letter",
        element: <layouts.NewLetter />,
      },
    ],
  },
  {
    path: "/admin-dashboard/new-booking",
    element: <layouts.NewBookingService />,
  },
  {
    path: "/admin-dashboard/get-started",
    element: <layouts.VendorGetStarted />,
  },
  {
    path: "/admin-dashboard/stepper-service",
    element: <layouts.VendorStepperService />,
  },
  {
    path: "/admin-dashboard/new-service",
    element: <layouts.AddNewService />,
  },

  { path: "Vendor-Inbox", element: <layouts.Inbox /> },
  { path: "global-preferences", element: <layouts.GlobalPreferences /> },
  {
    path: "tax-forums",
    element: <layouts.TaxForums />,
  },
  {
    path: "Add-New-Listing",
    element: <layouts.AddNewListing />,
  },
  {
    path: "Verification-Stepper",
    element: <layouts.VerificationStepper />,
  },
  {
    path: "tax-requirements",
    element: <layouts.TaxRequirements />,
  },
  {
    path: "Form-W-9",
    element: <layouts.FormW9 />,
  },
  {
    path: "Manage-Account",
    element: <layouts.ManageAccount />,
  },
  {
    path: "delete-account",
    element: <layouts.DeleteAccount />,
  },
  {
    path: "Delete-Confirmation",
    element: <layouts.DeleteConfirmation />,
  },
  {
    path: "Request-Data",
    element: <layouts.RequestData />,
  },
  {
    path: "Request-Data-Progress",
    element: <layouts.RequestDataProgress />,
  },

  {
    path: "payoneer-card-setup",
    element: <layouts.PayoneerCardSetup />,
  },
  {
    path: "get-started",
    element: <layouts.GetStarted />,
  },
  {
    path: "stepper-service",
    element: <layouts.StepperService />,
  },
  {
    path: "verify-stepper",
    element: <layouts.AdminStepper />,
  },
  {
    path: "profile-verify-start",
    element: <layouts.ProfileVerifyStart />,
  },
  {
    path: "profile-verify/govt-id",
    element: <layouts.KycQRCodeScan />,
  },
  {
    path: "profile-verify/tax",
    element: <layouts.TaxForumVerify />,
  },
  {
    path: "login-success",
    element: <layouts.LoginSuccessPage />,
  },
  {
    path: "login-error",
    element: <layouts.LoginErrorPage />,
  },
];

export { routes };
