import React from "react";
import ImgOne from "../../assets/img/img-1.png";
import ImgTwo from "../../assets/img/img-2.png";
import ImgThree from "../../assets/img/img-3.png";
import ImgFour from "../../assets/img/img-4.png";
import ImgFive from "../../assets/img/img-5.png";
import ImgSix from "../../assets/img/img-6.png";
import ImgSeven from "../../assets/img/img-7.png";
import PlaceOne from "../../assets/img/place-1.png";
import PlaceTwo from "../../assets/img/place-2.png";
import TeamOne from "../../assets/img/team-1.png";
import TeamTwo from "../../assets/img/team-2.png";
import TeamThree from "../../assets/img/team-3.png";
import TrustOne from "../../assets/img/trust-1.png";
import TrustTwo from "../../assets/img/trust-2.png";
import TrustThree from "../../assets/img/trust-3.png";
import TrustFour from "../../assets/img/trust-4.png";
import TrustFive from "../../assets/img/trust-5.png";
import TrustSix from "../../assets/img/trust-6.png";
import TrustSeven from "../../assets/img/trust-7.png";
import Call from "../../assets/img/call.png";
import Mail from "../../assets/img/mail.png";
import { Link, useNavigate } from "react-router";
import FaqsSection from "../../components/LandingPage/FaqsSection";
import { Modal } from "@mui/material";
import { IoCloseCircle } from "react-icons/io5";
import EmailModal from "./EmailModal";
import RequestCallModal from "./RequestCallModal";
import LoginRequiredModal from "@/components/LandingPage/LoginRequiredModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { useGetAllfaqsListQuery } from "@/api/apiSlice";

const AboutUs = () => {
  const navigate = useNavigate();
  const [Spaceopen, setSpaceOpen] = React.useState(false);

  const handleSpaceOpen = () => setSpaceOpen(true);
  const handleSpaceClose = () => setSpaceOpen(false);

  const user = useSelector((state) => state.auth.user);
  const [loginModal, setLoginModal] = React.useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { data, isLoading } = useGetAllfaqsListQuery({
    faqType: "landing",
    search: delayedSearch,
  });

  const handleClick = (type) => {
    if (!user) {
      setLoginModal(true);
    } else {
      type === "call" ? setShowCallModal(true) : setShowEmailModal(true);
    }
  };

  return (
    <div className="bg-[#F5F5F5]">
      {loginModal && (
        <LoginRequiredModal
          open={loginModal}
          handleClose={() => setLoginModal(false)}
        />
      )}

      {showCallModal && (
        <RequestCallModal
          open={showCallModal}
          onClose={() => setShowCallModal(false)}
        />
      )}

      {showEmailModal && (
        <EmailModal
          open={showEmailModal}
          onClose={() => setShowEmailModal(false)}
        />
      )}
      <div className="bg-[#F5F5F5] rounded-b-xl sm:py-20 py-14">
        <div className="mycontainer">
          <div>
            <h2 className="text-center font-black xl:text-6xl md:text-4xl text-2xl text-[#1C1C1C]">
              Welcome to where<br></br>
              extraordinary begins
            </h2>
            <p className="xl:text-lg text-base text-center mt-3 text-black">
              Dive into the ultimate summer party experience with Platform
              Celebrations!
            </p>
          </div>
          <div className="grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 mt-8">
            <div className="">
              <img
                src={ImgOne}
                alt=""
                className="w-full h-full object-contain mx-auto lg:mt-14"
              />
            </div>
            <div>
              <img
                src={ImgTwo}
                alt=""
                className="w-full h-full object-contain mx-auto sm:mt-9"
              />
            </div>
            <div>
              <img
                src={ImgThree}
                alt=""
                className="w-full h-full object-contain mx-auto"
              />
            </div>
            <div>
              <img
                src={ImgFour}
                alt=""
                className="w-full h-full object-contain mx-auto md:mt-14"
              />
            </div>
            <div>
              <img
                src={ImgFive}
                alt=""
                className="w-full h-full object-contain mx-auto md:mt-0 sm:mt-8"
              />
            </div>
            <div>
              <img
                src={ImgSix}
                alt=""
                className="w-full h-full object-contain mx-auto lg:mt-14"
              />
            </div>
            <div>
              <img
                src={ImgSeven}
                alt=""
                className="w-full h-full object-contain mx-auto lg:mt-0 sm:mt-8"
              />
            </div>
          </div>
        </div>
      </div>
      <div className=" mycontainer">
        <div className="my-20">
          <h3 className="text-center font-semibold xl:text-5xl text-3xl text-black">
            We have just the place
          </h3>
          <p className="text-center xl:text-lg mt-5 text-black">
            Gala Tab is a highly reputable company with over 20 years of
            experience in hosting events worldwide, encompassing a multitude of
            diverse cultures and backgrounds. Our team at Gala Tab holds
            extensive expertise in venue ownership and management, as well as in
            the coordination of music, catering, transportation, decorations,
            cakes, beauty services, fashion, and various other facets of the
            entertainment industry. Their unwavering dedication to client and
            business satisfaction sets them apart as a premier provider of
            flawless event experiences
          </p>
          <div className="grid md:grid-cols-2 gap-6 bg-[#F7F7F7] p-4 rounded-xl mt-6">
            <div>
              <div>
                <img src={PlaceOne} alt="" className="w-full h-full " />
              </div>
              <div className="sm:mx-8 flex flex-col justify-between mx-3 min-h-[160px] relative -top-6 shadow-xl  bg-white bg-opacity-90 p-3 rounded-lg">
                <div className="">
                  <h4 className="font-bold text-2xl font-Caveat text-black">
                    Guests
                  </h4>
                  <p className="mt-2 text-sm text-black">
                    Find a space. Fulfil your vision. Meet, create, and
                    celebrate in inspiring locations around the globe.
                  </p>
                </div>
                <div className="w-full mt-3">
                  <button
                    onClick={() => {
                      navigate("/");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#1C1C1C]  w-full block sm:text-base text-sm text-center py-2 rounded-lg shadow-xl text-white"
                  >
                    Find a Space
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div>
                <img src={PlaceTwo} alt="" className="w-full h-full " />
              </div>
              <div className="sm:mx-8 flex flex-col justify-between mx-3 min-h-[160px] relative -top-6 shadow-xl  bg-white bg-opacity-90 p-3 rounded-lg">
                <div className="">
                  <h4 className="font-bold text-2xl font-Caveat text-black">
                    Vendor
                  </h4>
                  <p className="mt-2 text-sm text-black">
                    Your vacancy might be another’s dream venue. By launching
                    your very own Event hub, you can earn passive income from
                    hourly renters in your area.
                  </p>
                </div>
                <div className="w-full mt-3">
                  <button
                    onClick={() => {
                      navigate("/");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-[#1C1C1C] w-full block sm:text-base text-sm text-center py-2 rounded-lg shadow-xl text-white"
                  >
                    Find a Space
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black sm:py-20 py-14">
        <div className="mycontainer">
          <div className="grid xl:grid-cols-2 gap-6">
            <div className="pr-6">
              <h5 className="font-semibold text-white md:text-5xl text-3xl">
                Join our team
              </h5>
              <p className="md:text-xl text-white mt-3">
                Our people are the heart of Gala Tab. We believe in creating a
                healthy company culture where people are excited to come into
                work everyday and make an impact.
              </p>
              <p className="md:text-xl text-white mt-3">
                Since launching in 2024, we've seen over 1 million people bring
                their vision to life in Event hub locations around the world.
                Gala Tab is committed to supporting the creation of something
                extraordinary - not only with our guests, but our team as well.
                We are a team hungry for singularity, authenticity, difference,
                and excellence.
              </p>
              <p className="md:text-xl text-white mt-3">
                If this sounds like something you’d like to be a part of, please
                get in touch! We’d love to speak to you.
              </p>
              <div className="mt-4">
                <Link
                  to="#"
                  className="py-2 px-6 text-black bg-[#fff] md:text-lg font-medium rounded-lg drop-shadow-[0px 16.03px 24.04px 0px #00000033] inline-block"
                >
                  View open positions
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img
                  src={TeamOne}
                  alt=""
                  className="h-full object-cover w-full rounded-2xl"
                />
              </div>
              <div>
                <div>
                  <img
                    src={TeamTwo}
                    alt=""
                    className="xl:h-56 h-full object-cover w-full rounded-2xl"
                  />
                </div>
                <div className="mt-3">
                  <img
                    src={TeamThree}
                    alt=""
                    className="h-full object-cover w-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <h4 className="text-[#1C1C1C] mt-20 font-bold md:text-5xl text-3xl text-center">
          Trusted
        </h4>
        <p className="text-center text-black">
          From indie films to boardroom decisions, remarkable things are Event
          Hub.
        </p>
        <div className="grid xl:grid-cols-7 lg:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-6 items-center mt-8">
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustOne}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustTwo}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustThree}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustFour}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustFive}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustSix}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <div className="bg-gray-100 w-full px-3 py-2 rounded-xl">
            <img
              src={TrustSeven}
              alt=""
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <div className="flex justify-center mt-20 items-center w-full p-6 bg-white relative">
          <p className="Contacttext Contecttext mt-4 relative  before:content-[''] before:block before:h-1 before:w-[300px] before:absolute before:-left-80 before:top-1/2 after:content-[''] after:block after:h-1 after:w-[300px] after:absolute after:-right-80 after:top-1/2">
            Contact Us
          </p>
        </div>
        <div className="bg-[#F7F7F7] p-5 md:p-12 rounded-xl mt-5">
          <h4 className="font-semibold text-3xl text-[#1E2327] text-center">
            How can we help you?
          </h4>
          <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 mt-5">
            <div className="xl:col-start-2 xl:col-end-3 border bg-white rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div>
                  <img
                    src={Call}
                    alt=""
                    className="bg-black p-3 w-12 rounded-md mx-auto"
                  />
                </div>
                <h5 className="text-3xl font-semibold mt-5 text-[#1E2327] text-center">
                  Request a call
                </h5>
                <p className="text-center text-[#171717] mt-3">
                  Billing issues only
                </p>
              </div>
              <div className="mt-10">
                <button
                  onClick={() => handleClick("call")}
                  className="text-white bg-black py-2 block w-full rounded-lg text-center px-2"
                >
                  Send Request
                </button>
              </div>
            </div>
            <div className="xl:col-start-3 xl:col-end-4 border bg-white rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div>
                  <img
                    src={Mail}
                    alt=""
                    className="bg-black p-3 w-12 rounded-md mx-auto"
                  />
                </div>
                <h5 className="text-3xl font-semibold mt-5 text-[#1E2327] text-center">
                  Email us
                </h5>
                <p className="text-center text-[#171717] mt-3">
                  Send Email Soon as possible to get in touch
                </p>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => handleClick("email")}
                  className="text-white bg-black py-2 block w-full rounded-lg text-center px-2"
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mycontainer">
        <div className="rounded-2xl justify-center items-center mx-auto my-20">
          <FaqsSection faqData={data?.data} />
        </div>
      </div>

      <Modal
        open={Spaceopen}
        onClose={handleSpaceClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <div>
            <div className="flex justify-between items-center border-b p-3">
              <div></div>
              <div>
                <h4 className="font-semibold text-xl">Find a space</h4>
              </div>
              <div>
                <IoCloseCircle
                  onClick={handleSpaceClose}
                  className="text-xl text-[#979797] cursor-pointer"
                />
              </div>
            </div>
            <div className="p-3">
              <form action="">
                <div>
                  <label htmlFor="">What are you planning?</label>
                  <input
                    type="search"
                    className="bg-[#F7FBFF] px-2 py-3 w-full border rounded-lg"
                    placeholder="Search here"
                  />
                </div>
                <div>
                  <label htmlFor="">Where?</label>
                  <input
                    type="search"
                    className="bg-[#F7FBFF] px-2 py-3 w-full border rounded-lg"
                    placeholder="Search here"
                  />
                </div>
                <div className="mt-12">
                  <button
                    type="button"
                    className="bg-[#1C1C1C] py-2 px-7 text-white w-full rounded-lg shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AboutUs;
