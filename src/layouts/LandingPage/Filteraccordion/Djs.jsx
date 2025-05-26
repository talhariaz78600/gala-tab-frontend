import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import PriceRangeSlider from "./PriceRangeSlider";
import InputNumber from "../../../components/VendorDashboard/InputNumber";

const Djs = () => {
  const [guestCount, setGuestCount] = useState(0);
  const checkboxArray = [
    {
      id: "Lighting",
      label: "Lighting",
    },
    {
      id: "Sound3",
      label: "Sound",
    },
    {
      id: "av",
      label: "A/V",
    },
    {
      id: "Progressive_house",
      label: "Progressive house",
    },
    {
      id: "ind",
      label: "Indian",
    },
    {
      id: "french2",
      label: "French",
    },
    {
      id: "Middle_Eastern",
      label: "Middle Eastern",
    },
    {
      id: "Mediterranean",
      label: "Mediterranean",
    },
    {
      id: "MC",
      label: "MC",
    },
    {
      id: "Wireless Mic",
      label: "Wireless Mic",
    },
    {
      id: "Sparklers",
      label: "Sparklers",
    },
    {
      id: "Fog_machine",
      label: "Fog machine",
    },
    {
      id: "Genre",
      label: "Genre",
    },
    {
      id: "Top 40",
      label: "Top 40",
    },
    {
      id: "Open_format",
      label: "Open format",
    },
    {
      id: "Kids_music",
      label: "Kids music",
    },
    {
      id: "Rap",
      label: "Rap",
    },
    {
      id: "Trap",
      label: "Trap",
    },
    {
      id: "RB",
      label: "R&B",
    },
    {
      id: "Reggae",
      label: "Reggae",
    },
    {
      id: "Dance_Hall",
      label: "Dance Hall",
    },
    {
      id: "soca",
      label: "soca",
    },
    {
      id: "compa",
      label: "compa",
    },
    {
      id: "Afrobeat",
      label: "Afrobeat",
    },
    {
      id: "Latin",
      label: "Latin",
    },
    {
      id: "latin_rock",
      label: "Latin rock",
    },
    {
      id: "Latin_pop",
      label: "Latin Pop",
    },
    {
      id: "salsa",
      label: "Salsa",
    },
    {
      id: "Merengue",
      label: "Merengue",
    },
    {
      id: "Tipico",
      label: "Tipico",
    },
    {
      id: "Bachata",
      label: "Bachata",
    },
    {
      id: "Rogation",
      label: "Rogation",
    },
    {
      id: "Dembow",
      label: "Dembow",
    },
    {
      id: "Cumbia",
      label: "Cumbia",
    },
    {
      id: "Rock",
      label: "Rock",
    },
    {
      id: "Electronic_music",
      label: "Electronic music",
    },
    {
      id: "Jazz",
      label: "Jazz",
    },
    {
      id: "Heavy_metal",
      label: "Heavy metal",
    },
    {
      id: "Soul_music",
      label: "Soul music",
    },
    {
      id: "World_music",
      label: "World music",
    },
    {
      id: "Punk_rock",
      label: "Punk rock",
    },
    {
      id: "Pop_rock",
      label: "Pop rock",
    },
    {
      id: "Folk_music",
      label: "Folk music",
    },
    {
      id: "House_music",
      label: "House music",
    },
    {
      id: "Easy_listening",
      label: "Easy listening",
    },
    {
      id: "K_pop",
      label: "K-pop",
    },
    {
      id: "Pop_music",
      label: "Pop music",
    },
    {
      id: "Hip_hop_music",
      label: "Hip hop music",
    },
    {
      id: "Arabic_music",
      label: "Arabic music",
    },
    {
      id: "Indian_music",
      label: "Indian music",
    },
    {
      id: "Blues",
      label: "Blues",
    },
    {
      id: "Country_music",
      label: "Country music",
    },
    {
      id: "Rhythm_and_blues",
      label: "Rhythm and blues",
    },
    {
      id: "Popular_music",
      label: "Popular music",
    },
    {
      id: "Classical_music",
      label: "Classical music",
    },
    {
      id: "Alternative_rock",
      label: "Alternative rock",
    },
    {
      id: "Dance_music",
      label: "Dance music",
    },
    {
      id: "Folk_music",
      label: "Folk music",
    },
    {
      id: "Music_of_Latin_America",
      label: "Music of Latin America",
    },
    {
      id: "Synth_pop",
      label: "Synth-pop",
    },
    {
      id: "Gospel_music",
      label: "Gospel music",
    },
    {
      id: "Christian_music",
      label: "Christian music",
    },
    {
      id: "Electronic_dance_music",
      label: "Electronic dance music",
    },
    {
      id: "Indie_rock",
      label: "Indie rock",
    },
    {
      id: "Funk",
      label: "Funk",
    },
    {
      id: "Christian_music",
      label: "Christian music",
    },
    {
      id: "Disco",
      label: "Disco",
    },
    {
      id: "Ska",
      label: "Ska",
    },
    {
      id: "Trance_music",
      label: "Trance music",
    },
    {
      id: "Grunge",
      label: "Grunge",
    },
    {
      id: "Deep_house",
      label: "Deep house",
    },
    {
      id: "Electro_house_and_bass",
      label: "Electro house and bass",
    },
    {
      id: "Acid_house",
      label: "Acid house",
    },
    {
      id: "Bass_house",
      label: "Bass house",
    },
    {
      id: "Dance",
      label: "Dance",
    },
    {
      id: "Garage",
      label: "Garage",
    },
    {
      id: "Dubstep",
      label: "Dubstep",
    },
    {
      id: "Techno",
      label: "Techno",
    },
    {
      id: "Tech_house",
      label: "Tech house",
    },
    {
      id: "Afro_House",
      label: "Afro House",
    },
    {
      id: "Breakbeat",
      label: "Breakbeat",
    },
    {
      id: "Happy_hardcore",
      label: "Happy hardcore",
    },
    {
      id: "Hardcore",
      label: "Hardcore",
    },
    {
      id: "Drop_Track",
      label: "Drop Track",
    },
    {
      id: "House",
      label: "House",
    },
    {
      id: "Trance",
      label: "Trance",
    },
    {
      id: "Ambient",
      label: "Ambient",
    },
    {
      id: "Future_house",
      label: "Future house",
    },
    {
      id: "Hardstyle",
      label: "Hardstyle",
    },
  ];

  return (
    <div>
      <form action="">
        <h5 className="font-medium text-xl">Type of Music</h5>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 border-t py-3 mt-3">
          <div>
            <div className="flex items-center justify-between gap-2 py-2 border-r pe-2">
              <div>
                <label className="text-[#535353]">Capacity</label>
              </div>
              <InputNumber count={guestCount} setCount={setGuestCount} />
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 border-t border-b py-3">
          {checkboxArray.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 border-r px-3"
            >
              <input
                type="checkbox"
                id={item.id}
                className="accent-black w-4 h-4 msx-w-[16px]"
              />
              <label htmlFor={item.id} className="text-[#535353]">
                {item.label}
              </label>
            </div>
          ))}
        </div>
        <div>
          <PriceRangeSlider />
        </div>
        <div className="flex justify-between items-center gap-3 py-3 border-b">
          <div>
            <input
              type="reset"
              value="Clear"
              className="underline text-black"
            />
          </div>
          <div>
            <button className="bg-black text-white py-2 px-9 rounded-md">
              Show 1000+ DJ's
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Djs;
