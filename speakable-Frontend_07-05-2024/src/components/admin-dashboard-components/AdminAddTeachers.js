import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { imageUpload } from "../../store/actions/teachersActions";
import { Getcourses } from "../../store/actions/coursesActions";
// import AdminNav from "./AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

const AdminAddTeachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courseslist);
  const [timeZone, setTimeZone] = useState(""); // State for selected timezone
  // console.log(courses)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [t, i18n] = useTranslation("global");
  const [formData, setFormData] = useState({
    // teacherName: "",
    password: "",
    phoneNumber: "",
    address: "",
    coursesAssign: [],
    purchasePrice: "",
    description: "",
    shortTitle: "",
    Email: "",
    Profile_Image: [],
    socialLinks: [
      { platform: "facebook", link: "" },
      { platform: "twitter", link: "" },
      { platform: "instagram", link: "" },
      // Add more social media platforms if needed
    ],
  });

  useEffect(() => {
    dispatch(Getcourses());
  }, [dispatch]);

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(userTimeZone);
  }, []);

  const timezonelist = [
    "Africa/Abidjan",
    "Africa/Accra",
    "Africa/Addis_Ababa",
    "Africa/Algiers",
    "Africa/Asmara",
    "Africa/Asmera",
    "Africa/Bamako",
    "Africa/Bangui",
    "Africa/Banjul",
    "Africa/Bissau",
    "Africa/Blantyre",
    "Africa/Brazzaville",
    "Africa/Bujumbura",
    "Africa/Cairo",
    "Africa/Casablanca",
    "Africa/Ceuta",
    "Africa/Conakry",
    "Africa/Dakar",
    "Africa/Dar_es_Salaam",
    "Africa/Djibouti",
    "Africa/Douala",
    "Africa/El_Aaiun",
    "Africa/Freetown",
    "Africa/Gaborone",
    "Africa/Harare",
    "Africa/Johannesburg",
    "Africa/Juba",
    "Africa/Kampala",
    "Africa/Khartoum",
    "Africa/Kigali",
    "Africa/Kinshasa",
    "Africa/Lagos",
    "Africa/Libreville",
    "Africa/Lome",
    "Africa/Luanda",
    "Africa/Lubumbashi",
    "Africa/Lusaka",
    "Africa/Malabo",
    "Africa/Maputo",
    "Africa/Maseru",
    "Africa/Mbabane",
    "Africa/Mogadishu",
    "Africa/Monrovia",
    "Africa/Nairobi",
    "Africa/Ndjamena",
    "Africa/Niamey",
    "Africa/Nouakchott",
    "Africa/Ouagadougou",
    "Africa/Porto-Novo",
    "Africa/Sao_Tome",
    "Africa/Timbuktu",
    "Africa/Tripoli",
    "Africa/Tunis",
    "Africa/Windhoek",
    "America/Adak",
    "America/Anchorage",
    "America/Anguilla",
    "America/Antigua",
    "America/Araguaina",
    "America/Argentina/Buenos_Aires",
    "America/Argentina/Catamarca",
    "America/Argentina/ComodRivadavia",
    "America/Argentina/Cordoba",
    "America/Argentina/Jujuy",
    "America/Argentina/La_Rioja",
    "America/Argentina/Mendoza",
    "America/Argentina/Rio_Gallegos",
    "America/Argentina/Salta",
    "America/Argentina/San_Juan",
    "America/Argentina/San_Luis",
    "America/Argentina/Tucuman",
    "America/Argentina/Ushuaia",
    "America/Aruba",
    "America/Asuncion",
    "America/Atikokan",
    "America/Atka",
    "America/Bahia",
    "America/Bahia_Banderas",
    "America/Barbados",
    "America/Belem",
    "America/Belize",
    "America/Blanc-Sablon",
    "America/Boa_Vista",
    "America/Bogota",
    "America/Boise",
    "America/Buenos_Aires",
    "America/Cambridge_Bay",
    "America/Campo_Grande",
    "America/Cancun",
    "America/Caracas",
    "America/Catamarca",
    "America/Cayenne",
    "America/Cayman",
    "America/Chicago",
    "America/Chihuahua",
    "America/Coral_Harbour",
    "America/Cordoba",
    "America/Costa_Rica",
    "America/Creston",
    "America/Cuiaba",
    "America/Curacao",
    "America/Danmarkshavn",
    "America/Dawson",
    "America/Dawson_Creek",
    "America/Denver",
    "America/Detroit",
    "America/Dominica",
    "America/Edmonton",
    "America/Eirunepe",
    "America/El_Salvador",
    "America/Ensenada",
    "America/Fort_Nelson",
    "America/Fort_Wayne",
    "America/Fortaleza",
    "America/Glace_Bay",
    "America/Godthab",
    "America/Goose_Bay",
    "America/Grand_Turk",
    "America/Grenada",
    "America/Guadeloupe",
    "America/Guatemala",
    "America/Guayaquil",
    "America/Guyana",
    "America/Halifax",
    "America/Havana",
    "America/Hermosillo",
    "America/Indiana/Indianapolis",
    "America/Indiana/Knox",
    "America/Indiana/Marengo",
    "America/Indiana/Petersburg",
    "America/Indiana/Tell_City",
    "America/Indiana/Vevay",
    "America/Indiana/Vincennes",
    "America/Indiana/Winamac",
    "America/Indianapolis",
    "America/Inuvik",
    "America/Iqaluit",
    "America/Jamaica",
    "America/Jujuy",
    "America/Juneau",
    "America/Kentucky/Louisville",
    "America/Kentucky/Monticello",
    " America/Knox_IN",
    " America/Kralendijk",
    " America/La_Paz",
    " America/Lima",
    " America/Los_Angeles",
    " America/Louisville",
    " America/Lower_Princes",
    " America/Maceio",
    " America/Managua",
    " America/Manaus",
    " America/Marigot",
    " America/Martinique",
    " America/Matamoros",
    " America/Mazatlan",
    " America/Mendoza",
    " America/Menominee",
    " America/Merida",
    " America/Metlakatla",
    " America/Mexico_City",
    " America/Miquelon",
    " America/Moncton",
    " America/Monterrey",
    " America/Montevideo",
    "America/Montreal",
    "America/Montserrat",
    "America/Nassau",
    "America/New_York",
    "America/Nipigon",
    "America/Nome",
    "America/Noronha",
    "America/North_Dakota/Beulah",
    "America/North_Dakota/Center",
    "America/North_Dakota/New_Salem",
    "America/Ojinaga",
    "America/Panama",
    "America/Pangnirtung",
    "America/Paramaribo",
    "America/Phoenix",
    "America/Port-au-Prince",
    "America/Port_of_Spain",
    "America/Porto_Acre",
    "America/Porto_Velho",
    "America/Puerto_Rico",
    "America/Punta_Arenas",
    "America/Rainy_River",
    "America/Rankin_Inlet",
    "America/Recife",
    "America/Regina",
    "America/Resolute",
    "America/Rio_Branco",
    "America/Rosario",
    "America/Santa_Isabel",
    "America/Santarem",
    "America/Santiago",
    "America/Santo_Domingo",
    "America/Sao_Paulo",
    "America/Scoresbysund",
    "America/Shiprock",
    "America/Sitka",
    "America/St_Barthelemy",
    "America/St_Johns",
    "America/St_Kitts",
    "America/St_Lucia",
    "America/St_Thomas",
    "America/St_Vincent",
    "America/Swift_Current",
    "America/Tegucigalpa",
    "America/Thule",
    "America/Thunder_Bay",
    "America/Tijuana",
    "America/Toronto",
    "America/Tortola",
    "America/Vancouver",
    "America/Virgin",
    "America/Whitehorse",
    "America/Winnipeg",
    "America/Yakutat",
    "America/Yellowknife",
    "Antarctica/Casey",
    "Antarctica/Davis",
    "Antarctica/DumontDUrville",
    "Antarctica/Macquarie",
    "Antarctica/Mawson",
    "Antarctica/McMurdo",
    "Antarctica/Palmer",
    "Antarctica/Rothera",
    "Antarctica/South_Pole",
    "Antarctica/Syowa",
    "Antarctica/Troll",
    "Antarctica/Vostok",
    "Arctic/Longyearbyen",
    "Asia/Aden",
    "Asia/Almaty",
    "Asia/Amman",
    "Asia/Anadyr",
    "Asia/Aqtau",
    "Asia/Aqtobe",
    "Asia/Ashgabat",
    "Asia/Ashkhabad",
    "Asia/Atyrau",
    "Asia/Baghdad",
    "Asia/Bahrain",
    "Asia/Baku",
    "Asia/Bangkok",
    "Asia/Barnaul",
    "Asia/Beirut",
    "Asia/Bishkek",
    "Asia/Brunei",
    "Asia/Calcutta",
    "Asia/Chita",
    "Asia/Choibalsan",
    "Asia/Chongqing",
    "Asia/Chungking",
    "Asia/Colombo",
    "Asia/Dacca",
    "Asia/Damascus",
    "Asia/Dhaka",
    "Asia/Dili",
    "Asia/Dubai",
    "Asia/Dushanbe",
    "Asia/Famagusta",
    "Asia/Gaza",
    "Asia/Harbin",
    "Asia/Hebron",
    "Asia/Ho_Chi_Minh",
    "Asia/Hong_Kong",
    "Asia/Hovd",
    "Asia/Irkutsk",
    "Asia/Istanbul",
    "Asia/Jakarta",
    "Asia/Jayapura",
    "Asia/Jerusalem",
    "Asia/Kabul",
    "Asia/Kamchatka",
    "Asia/Karachi",
    "Asia/Kashgar",
    "Asia/Kathmandu",
    "Asia/Katmandu",
    "Asia/Khandyga",
    "Asia/Kolkata",
    "Asia/Krasnoyarsk",
    "Asia/Kuala_Lumpur",
    "Asia/Kuching",
    "Asia/Kuwait",
    "Asia/Macao",
    "Asia/Macau",
    "Asia/Magadan",
    "Asia/Makassar",
    "Asia/Manila",
    "Asia/Muscat",
    "Asia/Nicosia",
    "Asia/Novokuznetsk",
    "Asia/Novosibirsk",
    "Asia/Omsk",
    "Asia/Oral",
    "Asia/Phnom_Penh",
    "Asia/Pontianak",
    "Asia/Pyongyang",
    "Asia/Qatar",
    "Asia/Qyzylorda",
    "Asia/Rangoon",
    "Asia/Riyadh",
    "Asia/Saigon",
    "Asia/Sakhalin",
    "Asia/Samarkand",
    "Asia/Seoul",
    "Asia/Shanghai",
    "Asia/Singapore",
    "Asia/Srednekolymsk",
    "Asia/Taipei",
    "Asia/Tashkent",
    "Asia/Tbilisi",
    "Asia/Tehran",
    "Asia/Tel_Aviv",
    "Asia/Thimbu",
    "Asia/Thimphu",
    "Asia/Tokyo",
    "Asia/Tomsk",
    "Asia/Ujung_Pandang",
    "Asia/Ulaanbaatar",
    "Asia/Ulan_Bator",
    "Asia/Urumqi",
    "Asia/Ust-Nera",
    "Asia/Vientiane",
    "Asia/Vladivostok",
    "Asia/Yakutsk",
    "Asia/Yangon",
    "Asia/Yekaterinburg",
    "Asia/Yerevan",
    "Atlantic/Azores",
    "Atlantic/Bermuda",
    "Atlantic/Canary",
    "Atlantic/Cape_Verde",
    "Atlantic/Faeroe",
    "Atlantic/Faroe",
    "Atlantic/Jan_Mayen",
    "Atlantic/Madeira",
    "Atlantic/Reykjavik",
    "Atlantic/South_Georgia",
    "Atlantic/St_Helena",
    "Atlantic/Stanley",
    "Australia/ACT",
    "Australia/Adelaide",
    "Australia/Brisbane",
    "Australia/Broken_Hill",
    "Australia/Canberra",
    "Australia/Currie",
    "Australia/Darwin",
    "Australia/Eucla",
    "Australia/Hobart",
    "Australia/LHI",
    "Australia/Lindeman",
    "Australia/Lord_Howe",
    "Australia/Melbourne",
    "Australia/NSW",
    "Australia/North",
    "Australia/Perth",
    "Australia/Queensland",
    "Australia/South",
    "Australia/Sydney",
    "Australia/Tasmania",
    "Australia/Victoria",
    "Australia/West",
    "Australia/Yancowinna",
    "Brazil/Acre",
    "Brazil/DeNoronha",
    "Brazil/East",
    "Brazil/West",
    "CET",
    "CST6CDT",
    "Canada/Atlantic",
    "Canada/Central",
    "Canada/Eastern",
    "Canada/Mountain",
    "Canada/Newfoundland",
    "Canada/Pacific",
    "Canada/Saskatchewan",
    "Canada/Yukon",
    "Chile/Continental",
    "Chile/EasterIsland",
    "Cuba",
    "EET",
    "EST",
    "EST5EDT",
    "Egypt",
    "Eire",
    "Etc/GMT",
    "Etc/GMT+0",
    "Etc/GMT+1",
    "Etc/GMT+10",
    "Etc/GMT+11",
    "Etc/GMT+12",
    "Etc/GMT+2",
    "Etc/GMT+3",
    "Etc/GMT+4",
    "Etc/GMT+5",
    "Etc/GMT+6",
    "Etc/GMT+7",
    "Etc/GMT+8",
    "Etc/GMT+9",
    "Etc/GMT-0",
    "Etc/GMT-1",
    "Etc/GMT-10",
    "Etc/GMT-11",
    "Etc/GMT-12",
    "Etc/GMT-13",
    "Etc/GMT-14",
    "Etc/GMT-2",
    "Etc/GMT-3",
    "Etc/GMT-4",
    "Etc/GMT-5",
    "Etc/GMT-6",
    "Etc/GMT-7",
    "Etc/GMT-8",
    "Etc/GMT-9",
    "Etc/GMT0",
    "Etc/Greenwich",
    "Etc/UCT",
    "Etc/UTC",
    "Etc/Universal",
    "Etc/Zulu",
    "Europe/Amsterdam",
    "Europe/Andorra",
    "Europe/Astrakhan",
    "Europe/Athens",
    "Europe/Belfast",
    "Europe/Belgrade",
    "Europe/Berlin",
    "Europe/Bratislava",
    "Europe/Brussels",
    "Europe/Bucharest",
    "Europe/Budapest",
    "Europe/Busingen",
    "Europe/Chisinau",
    "Europe/Copenhagen",
    "Europe/Dublin",
    "Europe/Gibraltar",
    "Europe/Guernsey",
    "Europe/Helsinki",
    "Europe/Isle_of_Man",
    "Europe/Istanbul",
    "Europe/Jersey",
    "Europe/Kaliningrad",
    "Europe/Kiev",
    "Europe/Kirov",
    "Europe/Lisbon",
    "Europe/Ljubljana",
    "Europe/London",
    "Europe/Luxembourg",
    "Europe/Madrid",
    "Europe/Malta",
    "Europe/Mariehamn",
    "Europe/Minsk",
    "Europe/Monaco",
    "Europe/Moscow",
    "Europe/Nicosia",
    "Europe/Oslo",
    "Europe/Paris",
    "Europe/Podgorica",
    "Europe/Prague",
    "Europe/Riga",
    "Europe/Rome",
    "Europe/Samara",
    "Europe/San_Marino",
    "Europe/Sarajevo",
    "Europe/Saratov",
    "Europe/Simferopol",
    "Europe/Skopje",
    "Europe/Sofia",
    "Europe/Stockholm",
    "Europe/Tallinn",
    "Europe/Tirane",
    "Europe/Tiraspol",
    "Europe/Ulyanovsk",
    "Europe/Uzhgorod",
    "Europe/Vaduz",
    "Europe/Vatican",
    "Europe/Vienna",
    "Europe/Vilnius",
    "Europe/Volgograd",
    "Europe/Warsaw",
    "Europe/Zagreb",
    "Europe/Zaporozhye",
    "Europe/Zurich",
    "GB",
    "GB-Eire",
    "GMT",
    "GMT+0",
    "GMT-0",
    "GMT0",
    "Greenwich",
    "HST",
    "Hongkong",
    "Iceland",
    "Indian/Antananarivo",
    "Indian/Chagos",
    "Indian/Christmas",
    "Indian/Cocos",
    "Indian/Comoro",
    "Indian/Kerguelen",
    "Indian/Mahe",
    "Indian/Maldives",
    "Indian/Mauritius",
    "Indian/Mayotte",
    "Indian/Reunion",
    "Iran",
    "Israel",
    "Jamaica",
    "Japan",
    "Kwajalein",
    "Libya",
    "MET",
    "MST",
    "MST7MDT",
    "Mexico/BajaNorte",
    "Mexico/BajaSur",
    "Mexico/General",
    "NZ",
    "NZ-CHAT",
    "Navajo",
    "PRC",
    "PST8PDT",
    "Pacific/Apia",
    "Pacific/Auckland",
    "Pacific/Bougainville",
    "Pacific/Chatham",
    "Pacific/Chuuk",
    "Pacific/Easter",
    "Pacific/Efate",
    "Pacific/Enderbury",
    "Pacific/Fakaofo",
    "Pacific/Fiji",
    "Pacific/Funafuti",
    "Pacific/Galapagos",
    "Pacific/Gambier",
    "Pacific/Guadalcanal",
    "Pacific/Guam",
    "Pacific/Honolulu",
    "Pacific/Johnston",
    "Pacific/Kiritimati",
    "Pacific/Kosrae",
    "Pacific/Kwajalein",
    "Pacific/Majuro",
    "Pacific/Marquesas",
    "Pacific/Midway",
    "Pacific/Nauru",
    "Pacific/Niue",
    "Pacific/Norfolk",
    "Pacific/Noumea",
    "Pacific/Pago_Pago",
    "Pacific/Palau",
    "Pacific/Pitcairn",
    "Pacific/Pohnpei",
    "Pacific/Ponape",
    "Pacific/Port_Moresby",
    "Pacific/Rarotonga",
    "Pacific/Saipan",
    "Pacific/Samoa",
    "Pacific/Tahiti",
    "Pacific/Tarawa",
    "Pacific/Tongatapu",
    "Pacific/Truk",
    "Pacific/Wake",
    "Pacific/Wallis",
    "Pacific/Yap",
    "Poland",
    "Portugal",
    "ROC",
    "ROK",
    "Singapore",
    "Turkey",
    "UCT",
    "US/Alaska",
    "US/Aleutian",
    "US/Arizona",
    "US/Central",
    "US/East-Indiana",
    "US/Eastern",
    "US/Hawaii",
    "US/Indiana-Starke",
    "US/Michigan",
    "US/Mountain",
    "US/Pacific",
    "US/Pacific-New",
    "US/Samoa",
    "UTC",
    "Universal",
    "W-SU",
    "WET",
    "Zulu",
  ];

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };
  // Function to check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      //  "teacherName",
      "password",
      "phoneNumber",
      "address",
      "purchasePrice",
      "description",
      "shortTitle",
      "Email",
    ];
    const missingFields = requiredFields.filter(
      (field) => formData[field].trim() === ""
    );
    // if (formData.phoneNumber.replace(/\D/g, "").length < 10) {
    //   missingFields.push("phoneNumber");
    // }
    console.log(missingFields);
    return { isValid: missingFields.length === 0, missingFields };
  };

  const handleCheckboxChange = (course) => {
    setFormData((prevData) => {
      const isSelected = prevData.coursesAssign.includes(course);
      if (isSelected) {
        return {
          ...prevData,
          coursesAssign: prevData.coursesAssign.filter((id) => id !== course),
        };
      } else {
        return {
          ...prevData,
          coursesAssign: [...prevData.coursesAssign, course],
        };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.socialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        socialLinks: updatedSocialLinks,
      };
    });
  };

  const handleFileUpload = async (event) => {
    const image = event.target.files[0];
    const uploadResult = await dispatch(imageUpload(image));
    setFormData({
      ...formData,
      Profile_Image: formData.Profile_Image?.length
        ? [...formData.Profile_Image, uploadResult.payload]
        : [uploadResult.payload],
    });
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img != val)],
    });
    // setMedia([...media.filter((img) => img != val)]);
  };

  const NextHandler = (e) => {
    e.preventDefault();
    const { isValid, missingFields } = isFormValid();
    const Alldata = { ...formData, teacherName: `${firstName} ${lastName}` };

    if (isValid) {
      navigate("/Admin-Dashboard/Teachers/add-teacher/add-availability", {
        state: { Alldata, timeZone },
      });
    } else {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  console.log(formData.phoneNumber, "for");

  return (
    <>
      {/* <AdminNav /> */}
      <div className="Add_Teachers_main_div">
        <h5>{t("AdminAddTeacher.header")}</h5>
        <form>
          {/* Image div */}
          <div className="Addteacherimage_box">
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2 "
                  key={index}
                >
                  <img
                    className="w-100 active"
                    src={"https://ik.imagekit.io/8s3jwexmv/" + md}
                  />

                  <span
                    className="badge bg-danger badge-pill badge-round ml-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleImageRemoval(md);
                    }}
                  >
                    {t("AdminAddTeacher.Delete")}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Image input Links */}
          {formData.Profile_Image?.length < 10 && (
            <div className="widthFormField">
              <div className="card-body">
                <p style={{ fontSize: "12px" }} className="card-text">
                  {t("AdminAddTeacher.SelectImage")}
                </p>
                {/* Basic file uploader */}
                <input
                  className="form-control"
                  encType="multipart/form-data"
                  type="file"
                  name="images"
                  id="formFile"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}
          <div className="form_group_div  mt-2">
            {/* Teacher Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="teacherName"></label> */}
              <input
                type="text"
                className="form-control"
                placeholder={t("AdminAddTeacher.pl1")}
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group widthFormField">
              {/* <label htmlFor="teacherName"></label> */}
              <input
                type="text"
                className="form-control"
                placeholder={t("AdminAddTeacher.pl2")}
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="description"></label> */}
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder={t("AdminAddTeacher.pl3")}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form_group_div mt-2">
            <div className="form-group widthFormField ">
              <PhoneInput
                country={"us"}
                className="mt-2"
                value={formData.phoneNumber}
                name="phoneNumber"
                onChange={(value, country, e, formattedValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    phoneNumber: formattedValue,
                  }));
                }}
                inputProps={{
                  name: "phoneNumber",
                  required: true,
                  autoFocus: true,
                  className: "form-control teacherphonenumberinput",
                }}
              />
            </div>
            {/* Password Links */}
            <div className="form-group widthFormField ">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder={t("AdminAddTeacher.pl4")}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address Links */}
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder={t("AdminAddTeacher.pl5")}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
          </div>
          <div className="form_group_div mt-2">
            <div className="form-group widthFormField ">
              <input
                type="text"
                className="form-control"
                id="shortTitle"
                placeholder={t("AdminAddTeacher.pl6")}
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                required
              />
            </div>
            {/* Course Assign Links */}
            {/* Purchase Links */}
            <div className="form-group widthFormField ">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="number"
                className="form-control"
                id="purchasePrice"
                name="purchasePrice"
                placeholder={t("AdminAddTeacher.pl7")}
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </div>
            {/* Purchase Links */}
            <div className="form-group widthFormField">
              {/* <label htmlFor="purchasePrice"></label> */}
              <input
                type="Email"
                className="form-control"
                id="Email"
                name="Email"
                placeholder={t("AdminAddTeacher.pl8")}
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* <label>Social Links</label> */}
          <div className="form-group mt-2 form_group_div ">
            {formData.socialLinks.map((socialLink, index) => (
              <div key={index} className="social-link-item widthFormField">
                <div className="form-group justify-content-between">
                  {/* <label>{socialLink.platform}</label> */}
                  <input
                    type="text"
                    className="form-control "
                    placeholder={socialLink.platform}
                    value={socialLink.link}
                    onChange={(e) =>
                      handleSocialLinkChange(
                        index,
                        socialLink.platform,
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className="profile-info"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <label htmlFor="timeZone">{t("AdminAddTeacher.TimeZone")}</label>
            <select
              id="timeZone"
              value={timeZone}
              onChange={handleTimeZoneChange}
            >
              <option value="">Select Time Zone</option>
              {timezonelist.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group widthFormField">
            <label htmlFor="Status">{t("AdminAddTeacher.SelectCourses")}</label>{" "}
            &nbsp;&nbsp;
            {courses?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.coursesAssign.includes(values._id)}
                  onChange={() => handleCheckboxChange(values._id)}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Course_Name}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={NextHandler}
            className="btn btn-outline-success mt-3 w-100"
          >
            {t("AdminAddTeacher.NEXT")}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminAddTeachers;
