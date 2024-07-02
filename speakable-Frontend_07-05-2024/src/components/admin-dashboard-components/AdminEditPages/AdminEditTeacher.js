import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Getcourses } from "../../../store/actions/coursesActions";
import {
  GetTeachers,
  imageUpload,
  updateTeacher,
} from "../../../store/actions/teachersActions";
import AdminNav from "../AdminNav";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import Deleteimage from "../Delete.png";
import { useLocation } from "react-router-dom";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";

const AdminEditTeacher = () => {
  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courseslist);
  const teachers = useSelector((state) => state.teachers.AllTeacherlist);
  const currentTeacher = teachers.find((teacher) => teacher._id === id);
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editModalIndex, setEditModalIndex] = useState(null);
  const [editModalDate, setEditModalDate] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editModalTimeIndex, setEditModalTimeIndex] = useState(null);
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [timeZone, setTimeZone] = useState(""); // State for selected timezone
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(userTimeZone);
  }, []);

  const handleTimeZoneChange = (event) => {
    setTimeZone(event.target.value);
  };

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

  // Function to open the edit modal and populate with existing time slot
  const handleEditTime = (index, date, timeIndex) => {
    const availability = formData.Availability[index];
    const selectedTimeSlot = availability[date][timeIndex];

    console.log(selectedTimeSlot, "selectedTimeSlot");
    // --------------------------------------------------------------------

    // Extract hours and minutes from startTime
    const formattedStart_time = formatTime(selectedTimeSlot.start);
    // console.log(formattedStart_time, "----startTime");
    const formattedEnd_time = formatTime(selectedTimeSlot.end);
    // console.log(formattedEnd_time, "----endTime");

    // let currentDate = new Date(selectedDate);
    // console.log(currentDate, "-currentDate");
    // let [start_hours, start_minutes] = selectedDate.start.split(":").map(Number);
    // // Set the hours and minutes to the current date
    // currentDate.setHours(start_hours);
    // currentDate.setMinutes(start_minutes);
    // // Format the date
    // let formattedDate_Starttime = currentDate.toLocaleString("en-US", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true, // Set to false if you prefer 24-hour format
    //   timeZone: timeZone,
    // });

    // console.log(formattedDate_Starttime, "formattedDate_Starttime");

    // // For End time value
    // // Extract hours and minutes from startTime
    // let [end_hours, end_minutes] = endTime.split(":").map(Number);
    // // Set the hours and minutes to the current date
    // currentDate.setHours(end_hours);
    // currentDate.setMinutes(end_minutes);
    // // Format the date
    // let formattedDate_endtime = currentDate.toLocaleString("en-US", {
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   hour12: true, // Set to false if you prefer 24-hour format
    //   timeZone: timeZone,
    // });

    // console.log(formattedDate_endtime, "formattedDate_Starttime");

    // // ------------------------------------------------------
    setEditStartTime(formattedStart_time);
    setEditEndTime(formattedEnd_time);
    setIsEditModalVisible(true);
    setEditModalIndex(index);
    setEditModalDate(date);
    setEditModalTimeIndex(timeIndex);
  };

  console.log(editStartTime, "------ editStartTime----");
  console.log(editEndTime, "------ editEndTime----");

  const formatTime = (time) => {
    console.log(time);
    const parsedDate = moment(time, "MMMM D, YYYY [at] h:mm A");
    if (!parsedDate.isValid()) {
      return "Invalid Date";
    }
    const formattedTime = parsedDate.format("h:mm");
    // console.log(formattedTime, "formattedTime at return");
    return formattedTime;
  };

  const formatTimewithtimezone = (time) => {
    console.log(time);
    const parsedDate = moment.tz(time, "MMMM D, YYYY [at] h:mm A", timeZone);
    if (!parsedDate.isValid()) {
      return "Invalid Date";
    }
    const formattedTime = parsedDate.format("h:mm A");
    return formattedTime;
  };

  const handleEditModalOk = (index, date, timeIndex) => {
    const timeSlotsArray = formData.Availability[index][date];
    if (timeSlotsArray && timeIndex >= 0 && timeIndex < timeSlotsArray.length) {
      let currentDate = new Date(selectedDate);
      console.log(currentDate, "-currentDate");
      console.log(editStartTime, "-editStartTime");
      let [start_hours, start_minutes] = editStartTime.split(":").map(Number);
      // Set the hours and minutes to the current date
      currentDate.setHours(start_hours);
      currentDate.setMinutes(start_minutes);
      // Format the date
      let formattedDate_Starttime = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true, // Set to false if you prefer 24-hour format
        timeZone: timeZone,
      });

      console.log(formattedDate_Starttime, "formattedDate_Starttime");

      // For End time value
      // Extract hours and minutes from startTime
      let [end_hours, end_minutes] = editEndTime.split(":").map(Number);
      // Set the hours and minutes to the current date
      currentDate.setHours(end_hours);
      currentDate.setMinutes(end_minutes);
      // Format the date
      let formattedDate_endtime = currentDate.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true, // Set to false if you prefer 24-hour format
        timeZone: timeZone,
      });

      console.log(formattedDate_endtime, "formattedDate_endtime");

      const updatedTimeSlotsArray = timeSlotsArray.map((timeSlot, idx) => {
        if (idx !== timeIndex) return timeSlot;
        return {
          ...timeSlot,
          start: formattedDate_Starttime,
          end: formattedDate_endtime,
        };
      });
      console.log(updatedTimeSlotsArray, "---------updatedTimeSlotsArray");
      const updatedAvailability = [...formData.Availability];
      updatedAvailability[index] = {
        ...updatedAvailability[index],
        [date]: updatedTimeSlotsArray,
      };
      // console.log(updatedAvailability, "---- updatedAvailability --");
      setFormData({ ...formData, Availability: updatedAvailability });
    }
    setIsEditModalVisible(false);
  };

  // Function to handle cancellation of edit modal
  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const [formData, setFormData] = useState({
    Username: "",
    Password: "",
    Phone_Number: "",
    Address: "",
    Courses_assign: [],
    Purchase_Price: "",
    Description: "",
    Short_Title: "",
    Email: "",
    Availability: [],
    Profile_Image: [],
    SocialLinks: [
      { platform: "facebook", link: "" },
      { platform: "twitter", link: "" },
      { platform: "instagram", link: "" },
    ],
  });

  useEffect(() => {
    if (currentTeacher) {
      const [first, ...last] = currentTeacher.Username.split(" ");
      setFirstName(first);
      setLastName(last.join(" "));
      setFormData({ ...currentTeacher, Username: `${first} ${last}` });
    }
  }, []);

  // console.log(formData);

  useEffect(() => {
    dispatch(Getcourses());
    dispatch(GetTeachers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (courseid) => {
    setFormData((prevData) => {
      const isSelected = prevData.Courses_assign.some(
        (course) => course._id === courseid
      );
      if (isSelected) {
        return {
          ...prevData,
          Courses_assign: prevData.Courses_assign.filter(
            (course) => course._id !== courseid
          ),
        };
      } else {
        return {
          ...prevData,
          Courses_assign: [...prevData.Courses_assign, { _id: courseid }],
        };
      }
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

  const handleSocialLinkChange = (index, platform, value) => {
    setFormData((prevData) => {
      const updatedSocialLinks = [...prevData.SocialLinks];
      updatedSocialLinks[index] = {
        ...updatedSocialLinks[index],
        platform,
        link: value,
      };
      return {
        ...prevData,
        SocialLinks: updatedSocialLinks,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = id;
    const newUsername = `${firstName} ${lastName}`;
    // Update formData with new username and other data
    const updatedData = { ...formData, Username: newUsername };
    // console.log(updatedData, "------- befor submit");
    try {
      // console.log(formData);
      await dispatch(
        updateTeacher({
          teacherId,
          updatedData,
        })
      );
      navigate("/Admin-Dashboard/Teachers");
    } catch (error) {
      console.error("Error editing teacher:", error);
    }
  };

  const handleImageRemoval = async (val) => {
    setFormData({
      ...formData,
      Profile_Image: [...formData.Profile_Image.filter((img) => img !== val)],
    });
  };

  const handleDeleteAvailability = () => {
    setFormData((prevData) => ({
      ...prevData,
      Availability: [],
    }));
  };

  const handleAddAvailability = (id) => {
    const newUsername = `${firstName} ${lastName}`;
    const updatedData = { ...formData, Username: newUsername };
    navigate(`/Admin-Dashboard/Teachers/edit-teacher/add-availability/${id}`, {
      state: { updatedData, timeZone },
    });
  };

  const handleDeleteTime = (index, date, timeIndex) => {
    setFormData((prevFormData) => {
      const updatedAvailability = [...prevFormData.Availability];
      const dateObj = updatedAvailability[index];
      const timeSlots = dateObj[date];
      const newTimeSlots = timeSlots?.filter((time, idx) => idx !== timeIndex);
      const newDateObj = { ...dateObj, [date]: newTimeSlots };
      if (newTimeSlots === undefined || newTimeSlots.length === 0) {
        const updatedDateObj = { ...updatedAvailability[index] };
        delete updatedDateObj[date];
        updatedAvailability[index] = updatedDateObj;
        if (
          updatedAvailability[index] &&
          Object.keys(updatedAvailability[index]).length === 0
        ) {
          updatedAvailability.splice(index, 1);
        }
      } else {
        updatedAvailability[index] = newDateObj;
      }
      return {
        ...prevFormData,
        Availability: updatedAvailability,
      };
    });
  };

  const hasAvailability = formData.Availability.length > 0;
  // console.log(formData.Availability);

  useEffect(() => {
    let availability = formData.Availability;
    setTimeSlots(...availability, timeSlots);
    // console.log(availability);
  }, [formData.Availability]);

  const handleAddSlot = () => {
    if (startTime && endTime) {
      const newSlot = {
        start: startTime,
        end: endTime,
      };
      const updatedTimeSlots = { ...timeSlots };
      const dateKey = selectedDate.toDateString();
      updatedTimeSlots[dateKey] = [
        ...(updatedTimeSlots[dateKey] || []),
        newSlot,
      ];
      setTimeSlots(updatedTimeSlots);
      setStartTime("");
      setEndTime("");
    }
  };

  const handleCalendarClick = (value) => {
    setSelectedDate(value);
    setModalOpen(true);
  };

  // const formatTime = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   const formattedHours = parseInt(hours) % 12 || 12;
  //   const ampm = parseInt(hours) < 12 ? "AM" : "PM";
  //   return `${formattedHours}:${minutes} ${ampm}`;
  // };

  const tileClassName = ({ date }) => {
    const dateKey = date.toDateString();
    return timeSlots[dateKey] && timeSlots[dateKey].length > 0
      ? "has-slots"
      : null;
  };

  return (
    <>
      {/* <AdminNav /> */}
      <div className="Add_Teachers_main_div">
        <h5>{t("AdminEditTeacher.header")}</h5>
        <form onSubmit={handleSubmit}>
          {/* Image div */}
          <div className="Addteacherimage_box">
            {formData.Profile_Image?.map((md, index) => {
              return (
                <div
                  className="col-6 col-sm-6 col-lg-3 mt-2 mt-md-0 mb-md-0 mb-2"
                  key={index}
                >
                  <a href="#">
                    <img
                      className="w-100 active"
                      src={"https://ik.imagekit.io/8s3jwexmv/" + md}
                      alt={`Image ${index + 1}`}
                    />
                  </a>
                  <span
                    className="badge bg-danger badge-pill badge-round ml-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleImageRemoval(md);
                    }}
                  >
                    {t("AdminEditTeacher.Delete")}
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
                  {t("AdminEditTeacher.selectimage")}.
                </p>
                {/* Basic file uploader */}
                <input
                  className="form-control widthFormField"
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
            <div className="form-group  widthFormField">
              <input
                type="text"
                className="form-control"
                placeholder={t("AdminEditTeacher.pl1")}
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                placeholder={t("AdminEditTeacher.pl2")}
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            {/* Description Links */}
            <div className="form-group widthFormField ">
              <input
                type="text"
                className="form-control"
                id="Description"
                name="Description"
                placeholder={t("AdminEditTeacher.pl3")}
                value={formData.Description}
                onChange={handleChange}
                required
              />
            </div>
            {/* Phone number Links */}
          </div>
          <div className="form_group_div mt-2">
            {/* Password Links */}
            <div className="form-group widthFormField">
              <PhoneInput
                country={"us"}
                className="mt-2"
                value={formData.Phone_Number}
                onChange={(phone, country, e, formattedValue) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    Phone_Number: formattedValue,
                  }));
                }}
                inputProps={{
                  name: "Phone_Number",
                  required: true,
                  autoFocus: true,
                  style: { marginLeft: "40px", width: "260px" },
                }}
                required
              />
            </div>
            <div className="form-group widthFormField">
              <input
                type="Password"
                className="form-control"
                id="Password"
                name="Password"
                placeholder={t("AdminEditTeacher.pl4")}
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Address Links */}
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                placeholder={t("AdminEditTeacher.pl5")}
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
            {/* Short Title Links */}
          </div>
          <div className="form_group_div mt-2">
            {/* Course Assign Links */}
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="Short_Title"
                placeholder={t("AdminEditTeacher.pl6")}
                name="Short_Title"
                value={formData.Short_Title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Purchase Links */}
            <div className="form-group widthFormField">
              <input
                type="number"
                className="form-control"
                id="Purchase_Price"
                name="Purchase_Price"
                placeholder={t("AdminEditTeacher.pl7")}
                value={formData.Purchase_Price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group widthFormField">
              <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                placeholder={t("AdminEditTeacher.pl8")}
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email Links */}
          </div>
          {/* Social Links */}

          <div className="form_group_div mt-2">
            {formData.SocialLinks?.map((socialLink, index) => (
              <div key={index} className="social-link-item widthFormField">
                <div className="form-group justify-content-between">
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
          <div className="form-group widthFormField">
            <label htmlFor="Status">
              {t("AdminEditTeacher.SelectCourses")}
            </label>{" "}
            &nbsp;&nbsp;
            {courses?.map((values) => (
              <div key={values._id} className="form-check">
                <input
                  type="checkbox"
                  id={values._id}
                  value={values._id}
                  checked={formData.Courses_assign.some(
                    (course) => course._id === values._id
                  )}
                  onChange={() => handleCheckboxChange(values._id)}
                  className="form-check-input"
                />
                <label htmlFor={values._id} className="form-check-label">
                  {values.Course_Name}
                </label>
              </div>
            ))}
          </div>
          {/* Availability Links */}
          <div
            className="profile-info"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <label htmlFor="timeZone">{t("AdminEditTeacher.TimeZone")}:</label>
            <select
              id="timeZone"
              value={timeZone}
              onChange={handleTimeZoneChange}
            >
              <option value="">{t("AdminEditTeacher.SelectTimeZone")}</option>
              {timezonelist.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mt-2">
            <div className="font-weight-bold">
              {t("AdminEditTeacher.SelecttheDate")}
            </div>

            <div className="calendar">
              <Calendar
                onChange={handleCalendarClick}
                value={selectedDate}
                tileClassName={tileClassName}
              />
            </div>

            <label htmlFor="availability">
              {t("AdminEditTeacher.Availability")}
            </label>
            {formData?.Availability?.map((availability, index) => (
              <div key={index} className="availability-item p-2 mb-2">
                <div className="form-group">
                  {Object?.entries(availability)?.map(
                    ([date, times], dateIndex) => {
                      if (date === selectedDate.toDateString()) {
                        return (
                          <div className="form-group" key={dateIndex}>
                            <span>{date}</span>
                            <div className="d-flex flex-wrap justify-content-center TimeListBox">
                              {times?.map((time, timeIndex) => (
                                <div className="TimeItemBox" key={timeIndex}>
                                  <label>
                                    {formatTimewithtimezone(time.start)} -{" "}
                                    {formatTimewithtimezone(time.end)}
                                  </label>
                                  <button
                                    type="button"
                                    className="btn btn-primary btn-delete-teacher"
                                    onClick={() =>
                                      handleEditTime(index, date, timeIndex)
                                    }
                                  >
                                    {t("AdminEditTeacher.Edit")}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-delete-teacher"
                                    onClick={() =>
                                      handleDeleteTime(index, date, timeIndex)
                                    }
                                  >
                                    {t("AdminEditTeacher.Delete")}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    }
                  )}
                </div>
                <div className="d-flex flex-column">
                  <button
                    type="button"
                    className="btn btn-outline-success btn-delete-teacher delete-time mb-3"
                    onClick={() => handleAddAvailability(id)}
                  >
                    {t("AdminEditTeacher.AddMoreAvailability")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-delete-teacher delete-time"
                    onClick={() => handleDeleteAvailability(index)}
                  >
                    {t("AdminEditTeacher.DeleteEntireAvailability")}
                  </button>
                </div>
              </div>
            ))}

            {!hasAvailability && (
              <button
                type="button"
                onClick={() => handleAddAvailability(id)}
                className="btn btn-outline-success mt-3 w-100"
              >
                {t("AdminEditTeacher.AddAvailability")}
              </button>
            )}
          </div>

          {/* Submit button */}
          {hasAvailability && (
            <button
              type="submit"
              className="btn btn-outline-success mt-3 w-100"
            >
              {t("AdminEditTeacher.Submit")}
            </button>
          )}
          <Modal
            title="Edit Time Slot"
            open={isEditModalVisible} // changed from open to visible
            onOk={() =>
              handleEditModalOk(
                editModalIndex,
                editModalDate,
                editModalTimeIndex
              )
            }
            onCancel={handleEditModalCancel}
          >
            <label htmlFor="editStartTime">
              {t("AdminEditTeacher.StartTime")}:
            </label>
            <Input
              type="time"
              id="editStartTime"
              value={editStartTime}
              onChange={(e) => setEditStartTime(e.target.value)}
            />
            <label htmlFor="editEndTime">
              {t("AdminEditTeacher.EndTime")}:
            </label>
            <Input
              type="time"
              id="editEndTime"
              value={editEndTime}
              onChange={(e) => setEditEndTime(e.target.value)}
            />
          </Modal>
        </form>
      </div>
    </>
  );
};

export default AdminEditTeacher;
