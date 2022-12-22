import {
  blood_group,
  educational_Area,
  education_Level,
  FavouriteMusic,
  FavouriteSport,
  GoodQualities,
  languageList,
  physical_activity,
  RaceList,
  Relation,
  relegion,
  smoking_habit,
  Star,
  Visiblity,
  WorstQualities,
} from "./list";

export const variant = "outlined";
export const errors = {
  somethingWentWrong: "display.helperText.errors.somethingWentWrong",
};

export const fieldType = {
  TextField: "textField",
  Suggestion: "suggestion",
  DropDown: "dropDown",
  Chip: "chip",
  AutoSizeTextFields: "autoSizeTextField",
  DatePicker: "datepicker",
};

export const Api = {
  signUp: "https://lifograf.com/lg_api/signup",
  googleAuth: "https://lifograf.com/lg_api/gAuth",
  login: "https://lifograf.com/lg_api/login",
  localhost: "http://localhost:3000/",
  verifyEmail: "https://lifograf.com/lg_api/verifyEmail",
  getUserSummary: "https://lifograf.com/lg_api/getUsrSummary",
  lgAbout: "https://lifograf.com/lg_api/lgBasic",
  lgPersonal: "https://lifograf.com/lg_api/lgPersonal",
  lgEducation: "https://lifograf.com/lg_api/lgEduWork",
  lgHealth: "https://lifograf.com/lg_api/lgHealth",
  lgPersonality: "https://lifograf.com/lg_api/lgPersonality",
  profilePic: "https://lifograf.com/lg_api/profPic",
};

export const regularExpressions = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
};

export const titleDropdown = ["Mr", "Mrs", "Baby", "Miss", "Master"];
export const genderDropdown = ["Male", "Female"];
export const yesNoDropdown = ["Yes", "No"];

export const language = languageList;
export const race = RaceList;
export const religion = relegion;
export const star = Star;
export const visiblity = Visiblity;
export const education = education_Level;
export const education_Area = educational_Area;
export const bloodGroup = blood_group;
export const smoking = smoking_habit;
export const physicalActivity = physical_activity;
export const bestQualities = GoodQualities;
export const worstQualities = WorstQualities;
export const favouriteSport = FavouriteSport;
export const favouriteMusic = FavouriteMusic;
export const relation = Relation;
