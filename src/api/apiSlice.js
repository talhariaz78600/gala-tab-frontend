import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { provideedTags } from "./tags";
import { END_POINTS } from "./endpoints";
import { prepareQueryParams } from "./utils";
import { sideNavItems } from "@/lib/adminSideNav";
import { logout } from "@/store/authSlice";
import { persistor } from "@/store/store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        const currentPath = window.location.pathname;
        const currentTab = sideNavItems.find((item) => {
          return (
            currentPath.startsWith(item.path) ||
            (item.activePaths &&
              item.activePaths.some((activePath) =>
                currentPath.startsWith(activePath)
              ))
          );
        })?.id;

        if (currentTab) {
          headers.set("x-tab", currentTab);
        }

        return headers;
      },
    });

    const result = await rawBaseQuery(args, api, extraOptions);

    // 🔒 Handle unauthorized error globally
    if (result?.error?.status === 401) {
      api.dispatch(logout());
      window.dispatchEvent(new Event("token-removed"));
      localStorage.removeItem("token");
      persistor.purge();
      api.dispatch(api.util.resetApiState());
      window.location.href = "/";
    }

    return result;
  },
  tagTypes: provideedTags,
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (userData) => ({
        url: END_POINTS.REGISTER,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Admin"],
    }),
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: END_POINTS.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
    sendEmailOtp: builder.mutation({
      query: (data) => ({
        url: END_POINTS.SENDOTP,
        method: "POST",
        body: data,
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: END_POINTS.VERIFYOTP,
        method: "POST",
        body: data,
      }),
    }),
    // sending
    sendPhoneOtp: builder.mutation({
      query: (data) => ({
        url: END_POINTS.PHONEOTP,
        method: "POST",
        body: data,
      }),
    }),
    // verifying
    verifyPhoneOtp: builder.mutation({
      query: (data) => ({
        url: END_POINTS.VERIFYPHONE,
        method: "POST",
        body: data,
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: END_POINTS.FORGETPASSWORD,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: END_POINTS.RESETPASSWORD,
        method: "PATCH",
        body: data,
      }),
    }),
    getAdminProfile: builder.query({
      query: () => END_POINTS.PROFILE,
      providesTags: ["Admin"],
    }),
    getServiceType: builder.query({
      query: () => END_POINTS.SERVICETYPE,
    }),
    getAmenities: builder.query({
      query: () => END_POINTS.AMENITY,
      providesTags: ["Amenities"],
    }),
    amenitiesCreate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.AMENITY}/addcategory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Amenities"],
    }),
    getGadgets: builder.query({
      query: (params) => ({
        url: END_POINTS.GADGET,
        params,
      }),
    }),
    getServiceListing: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: END_POINTS.SERVICELISTING,
          method: "GET",
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service"],
    }),
    getServiceDetails: builder.query({
      query: (id) => ({
        url: `${END_POINTS.SERVICELIST}/${id}`,
      }),
      providesTags: ["Service"],
    }),
    serviceCreate: builder.mutation({
      query: (data) => ({
        url: END_POINTS.SERVICELIST,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    serviceUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.SERVICELIST}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.SERVICELIST}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),

    getLandingService: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.SERVICELIST}/landingpage/services`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service"],
    }),

    getMapServiceList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.SERVICELIST}/map`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service"],
    }),

    getLandingServiceDetails: builder.query({
      query: (id) => ({
        url: `${END_POINTS.SERVICELIST}/landingpage/${id}`,
      }),
      providesTags: ["Service"],
    }),

    getfaqsList: builder.query({
      query: (id) => ({
        url: `${END_POINTS.FAQ}/${id}`,
      }),
      providesTags: ["Faq"],
    }),
    getAllfaqsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.FAQ}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Faq"],
    }),
    faqCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.FAQ}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    faqUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.FAQ}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),
    faqDelete: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.FAQ}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
    getKYCQrCode: builder.query({
      query: () => ({
        url: `${END_POINTS.KYC}/initiate-kyc`,
      }),
    }),
    kycUpload: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.KYC}/upload-kyc`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "Kyc"],
    }),
    getAccountUser: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.ACCOUNT_USER}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["AccountUser", "Sub-Admin"],
    }),
    updateAccountUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `user/updatestatus/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AccountUser"],
    }),
    sendAccountMessage: builder.mutation({
      query: (data) => ({
        url: `user/sendmessage`,
        method: "POST",
        body: data,
      }),
    }),
    getDisputeProperties: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.DISPUTE}/properties`,
          ...(queryParams && { params: queryParams }),
        };
      },
    }),
    addDispute: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.DISPUTE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dispute"],
    }),
    getDisputeList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.DISPUTE}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Dispute"],
    }),
    getDisputeDetails: builder.query({
      query: (id) => ({
        url: `${END_POINTS.DISPUTE}/${id}`,
      }),
      providesTags: ["Dispute"],
    }),
    getAdminDisputeList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.DISPUTE}/admindisputes`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Dispute"],
    }),
    updateAdminDispute: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.DISPUTE}/updatestatus/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dispute"],
    }),
    getAdminDisputeDetails: builder.query({
      query: (id) => ({
        url: `${END_POINTS.DISPUTE}/updatestatus/${id}`,
      }),
      providesTags: ["Dispute"],
    }),
    updateDispute: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.DISPUTE}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dispute"],
    }),
    deleteDispute: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.DISPUTE}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dispute"],
    }),
    requestBookingCreate: builder.mutation({
      query: (data) => ({
        url: `/request-booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getBookingsListVendor: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `/request-booking/vendor`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Booking"],
    }),
    getBookingListCustomer: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `/request-booking/customer`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Booking"],
    }),
    getBookingListAdmin: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `/request-booking`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Booking"],
    }),
    updateBookingVendor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/request-booking/${id}/updateStatus`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    updateBookingCustomer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/request-booking/customer/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),
    getUserProfileDetail: builder.query({
      query: (id) => ({
        url: `/user/service/${id}`,
      }),
    }),
    getTemplatesList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.TEMPLATES}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Templates"],
    }),
    templatesCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.TEMPLATES}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
    templatesUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.TEMPLATES}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
    templatesDelete: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.TEMPLATES}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Templates"],
    }),
    getSelectTemplateList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.TEMPLATES}/templeteNames`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Templates"],
    }),
    getTaskTemplateList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.TEMPLATES}/task`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Templates"],
    }),
    taskTemplatesCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.TEMPLATES}/task`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
    taskTemplatesUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.TEMPLATES}/task/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Templates"],
    }),
    taskTemplatesDelete: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.TEMPLATES}/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Templates"],
    }),
    getTaskTemplateSelectList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.TEMPLATES}/task/templeteNames`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Templates"],
    }),

    subAdminCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.SUBADMIN}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sub-Admin"],
    }),
    subAdminUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.SUBADMIN}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sub-Admin"],
    }),
    subAdminPasswordUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.SUBADMIN}/changePassword/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sub-Admin"],
    }),
    getAdminDashboardDetails: builder.query({
      query: () => ({
        url: `${END_POINTS.SUBADMIN}`,
      }),
      providesTags: ["Admin", "Sub-Admin"],
    }),
    subAdminExport: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.SUBADMIN}/export`,
          ...(queryParams && { params: queryParams }),
        };
      },
    }),
    getCountryList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.COUNTRY}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Country"],
    }),
    countryCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.COUNTRY}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Country"],
    }),
    countryUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.COUNTRY}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Country"],
    }),
    countryDelete: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.COUNTRY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Country"],
    }),
    getCityList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.CITY}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["City"],
    }),
    cityCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.CITY}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["City"],
    }),
    cityUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.CITY}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["City"],
    }),
    cityDelete: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.CITY}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["City"],
    }),
    getSelectCountryList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.COUNTRY}/getCountriesNames`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Country"],
    }),
    getSelectCityList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.CITY}/getCitiesNames`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["City"],
    }),
    taxForumCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.TAXFORUM}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TaxForum", "user"],
    }),
    getTaxForumList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.TAXFORUM}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["TaxForum"],
    }),
    textForumVerify: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.TAXFORUM}/verify/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["TaxForum"],
    }),
    getIDKYCList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.KYC}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Kyc"],
    }),
    updateKYC: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.KYC}/update-kyc-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Kyc"],
    }),
    getUserDetails: builder.query({
      query: (id) => ({
        url: `user/getUser/${id}`,
      }),
      providesTags: ["user"],
    }),
    getVendorServiceList: builder.query({
      query: ({ id, params }) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `vendor/${id}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service"],
    }),
    vendorCreate: builder.mutation({
      query: (data) => ({
        url: `user/CreateVendor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AccountUser", "Sub-Admin"],
    }),
    getUserLogsList: builder.query({
      query: ({ id, params }) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `logs/${id}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["AccountUser"],
    }),
    getPricingList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `vendor`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Pricing"],
    }),
    getDefaultPricingList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `vendor/defaultPricing`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Pricing"],
    }),
    updateCustomPricing: builder.mutation({
      query: ({ id, data }) => ({
        url: `vendor/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Pricing"],
    }),
    updateDefaultPricing: builder.mutation({
      query: ({ id, data }) => ({
        url: `vendor/defaultPricing/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Pricing"],
    }),
    getAdvertisementList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `${END_POINTS.ADVERTISEMENT}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Advertisement"],
    }),
    advertisementCreate: builder.mutation({
      query: (data) => ({
        url: `${END_POINTS.ADVERTISEMENT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Advertisement"],
    }),
    advertisementUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `${END_POINTS.ADVERTISEMENT}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Advertisement"],
    }),
    advertisementDelete: builder.mutation({
      query: (id) => ({
        url: `${END_POINTS.ADVERTISEMENT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Advertisement"],
    }),
    serviceListingLike: builder.mutation({
      query: (data) => ({
        url: `servicelisting/like`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service", "Booking"],
    }),
    getLikeServiceList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `servicelisting/like`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service"],
    }),
    reviewCreate: builder.mutation({
      query: (data) => ({
        url: `review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service", "Booking"],
    }),
    reviewEdit: builder.mutation({
      query: ({ id, data }) => ({
        url: `review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Service", "Booking"],
    }),
    getServiceReviewList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `review/service/${params.serviceId}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service", "Booking"],
    }),
    getAllReviewsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `review`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service", "Booking"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service", "Booking"],
    }),
    discountCreate: builder.mutation({
      query: (data) => ({
        url: `discount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Discount"],
    }),
    discountUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `discount/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Discount"],
    }),
    discountDelete: builder.mutation({
      query: (id) => ({
        url: `discount/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Discount"],
    }),
    getDiscountVendorList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `discount/getdiscountForVendor`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Discount"],
    }),
    verifyDiscountCode: builder.mutation({
      query: (data) => ({
        url: `discount/verifyDiscount`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Discount"],
    }),
    getNotificationSettings: builder.query({
      query: () => ({
        url: `setting/notification`,
      }),
      providesTags: ["Notification"],
    }),
    updateNotificationSettings: builder.mutation({
      query: (data) => ({
        url: `setting/notification`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    getPayOutsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `payout`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Payout"],
    }),
    exportAllPayOutsFile: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `payout/downloadfile`,
          ...(queryParams && { params: queryParams }),
        };
      },
    }),
    topicCreate: builder.mutation({
      query: (data) => ({
        url: `topic`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Topic"],
    }),
    topicUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `topic/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Topic"],
    }),
    topicDelete: builder.mutation({
      query: (id) => ({
        url: `topic/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Topic"],
    }),
    getTopicsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `topic`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Topic"],
    }),
    subTopicCreate: builder.mutation({
      query: (data) => ({
        url: `topic/subtopic`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Topic"],
    }),
    subTopicUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `topic/subtopic/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Topic"],
    }),
    subTopicDelete: builder.mutation({
      query: (id) => ({
        url: `topic/subtopic/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Topic"],
    }),
    calenderModeUpdate: builder.mutation({
      query: (data) => ({
        url: `vendor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getSelectServiceList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `servicelisting/serviceTitle`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service"],
    }),
    getCalenderBookingsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `calendar`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Calender", "Booking"],
    }),
    calendarReserve: builder.mutation({
      query: (data) => ({
        url: `calendar`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Calender"],
    }),
    deleteCalenderBooking: builder.mutation({
      query: (id) => ({
        url: `calendar/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Calender"],
    }),
    stripeConnect: builder.mutation({
      query: (data) => ({
        url: `vendor/stripeConnect`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAdminPayoutsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `payment`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Payout"],
    }),
    getSinglePayout: builder.query({
      query: (id) => ({
        url: `payment/${id}`,
      }),
      providesTags: ["Payout"],
    }),
    getVendorPayoutsList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `payment/vendor`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Payout"],
    }),
    sendPaymenttoVendor: builder.mutation({
      query: ({ data }) => ({
        url: `payment/vendor`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payout"],
    }),
    getVendorDashboardAnalytics: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `report/vendordashboard`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Payout", "Service", "Payout", "Booking"],
    }),
    getVendorReportAnalytics: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `report/vendor`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service", "Booking"],
    }),
    getSingleVendorReportAnalytics: builder.query({
      query: ({ params, id }) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `report/vendor/${id}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service", "Booking"],
    }),
    getAllVendorsServicesReport: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `report/admin`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Service", "Booking"],
    }),
    getCustomerDashboardAnalytics: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `report/customerdashboard`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Payout", "Service", "Payout", "Booking", "Dashboard"],
    }),
    getAdminDashboardAnalytics: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `report/admindashboard`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Payout", "Service", "Payout", "Booking"],
    }),
    createRecentViewedListing: builder.mutation({
      query: (data) => ({
        url: `user/addLastViewedService`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    createStaff: builder.mutation({
      query: (data) => ({
        url: `/staff`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
    getStaffList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `/staff`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Staff"],
    }),
    getVendorStaffList: builder.query({
      query: ({ id, params }) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `/staff/${id}`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["Staff"],
    }),
    createNewsLetter: builder.mutation({
      query: (data) => ({
        url: `/newsletter`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewsLetter"],
    }),
    getNewsLetterList: builder.query({
      query: (params) => {
        const queryParams = prepareQueryParams(params);
        return {
          url: `/newsletter`,
          ...(queryParams && { params: queryParams }),
        };
      },
      providesTags: ["NewsLetter"],
    }),
    deleteNewsLetter: builder.mutation({
      query: (id) => ({
        url: `/newsletter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsLetter"],
    }),
    sendMessagetoNewsLetter: builder.mutation({
      query: (data) => ({
        url: `/newsletter/send`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["NewsLetter"],
    }),
    getnewsletterSettings: builder.query({
      query: () => ({
        url: `/newsletter/settings`,
      }),
      providesTags: ["NewsLetter"],
    }),
    updateNewsLetterSettings: builder.mutation({
      query: (data) => ({
        url: `newsletter/settings`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["NewsLetter"],
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useGetAdminProfileQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useSendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useSendPhoneOtpMutation,
  useVerifyPhoneOtpMutation,
  useGetServiceTypeQuery,
  useGetAmenitiesQuery,
  useAmenitiesCreateMutation,
  useGetGadgetsQuery,
  useServiceCreateMutation,
  useServiceUpdateMutation,
  useGetServiceDetailsQuery,
  useGetServiceListingQuery,
  useDeleteServiceMutation,
  useFaqCreateMutation,
  useGetfaqsListQuery,
  useFaqUpdateMutation,
  useFaqDeleteMutation,
  useGetKYCQrCodeQuery,
  useLazyGetKYCQrCodeQuery,
  useKycUploadMutation,
  useGetLandingServiceQuery,
  useGetMapServiceListQuery,
  useGetLandingServiceDetailsQuery,
  useGetAccountUserQuery,
  useUpdateAccountUserMutation,
  useSendAccountMessageMutation,
  useGetDisputePropertiesQuery,
  useLazyGetDisputePropertiesQuery,
  useAddDisputeMutation,
  useGetDisputeListQuery,
  useUpdateDisputeMutation,
  useDeleteDisputeMutation,
  useGetAdminDisputeListQuery,
  useUpdateAdminDisputeMutation,
  useGetAdminDisputeDetailsQuery,
  useGetDisputeDetailsQuery,
  useRequestBookingCreateMutation,
  useGetBookingsListVendorQuery,
  useUpdateBookingVendorMutation,
  useGetBookingListCustomerQuery,
  useLazyGetBookingListCustomerQuery,
  useLazyGetBookingsListVendorQuery,
  useUpdateBookingCustomerMutation,
  useGetBookingListAdminQuery,
  useGetUserProfileDetailQuery,
  useGetTemplatesListQuery,
  useTemplatesCreateMutation,
  useTemplatesUpdateMutation,
  useTemplatesDeleteMutation,
  useGetSelectTemplateListQuery,
  useSubAdminCreateMutation,
  useSubAdminUpdateMutation,
  useSubAdminPasswordUpdateMutation,
  useGetAdminDashboardDetailsQuery,
  useLazySubAdminExportQuery,
  useGetTaskTemplateListQuery,
  useTaskTemplatesCreateMutation,
  useTaskTemplatesUpdateMutation,
  useTaskTemplatesDeleteMutation,
  useGetTaskTemplateSelectListQuery,
  useGetCountryListQuery,
  useCountryCreateMutation,
  useCountryUpdateMutation,
  useCountryDeleteMutation,
  useGetCityListQuery,
  useCityCreateMutation,
  useCityUpdateMutation,
  useCityDeleteMutation,
  useGetSelectCountryListQuery,
  useGetSelectCityListQuery,
  useTaxForumCreateMutation,
  useGetTaxForumListQuery,
  useTextForumVerifyMutation,
  useGetIDKYCListQuery,
  useUpdateKYCMutation,
  useGetUserDetailsQuery,
  useGetVendorServiceListQuery,
  useVendorCreateMutation,
  useGetUserLogsListQuery,
  useGetPricingListQuery,
  useGetDefaultPricingListQuery,
  useUpdateCustomPricingMutation,
  useUpdateDefaultPricingMutation,
  useGetAdvertisementListQuery,
  useAdvertisementCreateMutation,
  useAdvertisementUpdateMutation,
  useAdvertisementDeleteMutation,
  useServiceListingLikeMutation,
  useGetLikeServiceListQuery,
  useReviewCreateMutation,
  useReviewEditMutation,
  useGetServiceReviewListQuery,
  useGetAllReviewsListQuery,
  useDeleteReviewMutation,
  useGetAllfaqsListQuery,
  useGetDiscountVendorListQuery,
  useDiscountCreateMutation,
  useDiscountUpdateMutation,
  useDiscountDeleteMutation,
  useVerifyDiscountCodeMutation,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useGetPayOutsListQuery,
  useLazyExportAllPayOutsFileQuery,
  useTopicCreateMutation,
  useTopicUpdateMutation,
  useTopicDeleteMutation,
  useSubTopicCreateMutation,
  useSubTopicUpdateMutation,
  useSubTopicDeleteMutation,
  useGetTopicsListQuery,
  useCalenderModeUpdateMutation,
  useGetSelectServiceListQuery,
  useGetCalenderBookingsListQuery,
  useCalendarReserveMutation,
  useDeleteCalenderBookingMutation,
  useStripeConnectMutation,
  useGetAdminPayoutsListQuery,
  useGetVendorPayoutsListQuery,
  useSendPaymenttoVendorMutation,
  useGetVendorDashboardAnalyticsQuery,
  useGetCustomerDashboardAnalyticsQuery,
  useCreateRecentViewedListingMutation,
  useGetVendorReportAnalyticsQuery,
  useGetAdminDashboardAnalyticsQuery,
  useGetAllVendorsServicesReportQuery,
  useGetSinglePayoutQuery,
  useGetSingleVendorReportAnalyticsQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffListQuery,
  useGetVendorStaffListQuery,
  useCreateNewsLetterMutation,
  useGetNewsLetterListQuery,
  useDeleteNewsLetterMutation,
  useSendMessagetoNewsLetterMutation,
  useGetnewsletterSettingsQuery,
  useUpdateNewsLetterSettingsMutation,
} = apiSlice;
