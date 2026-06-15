import { ID_PROVINCES, US_STATES } from "../constants";
import { AUS_STATES } from "./AUSStateSelect";

export const COUNTRIES = [
  { label: "United States", value: "US" },
  { label: "Australia", value: "AUS" },
  { label: "Indonesia", value: "ID" },
];

export const US_FORM_FIELDS = [
  {
    label: "Address Line 1",
    key: "addressLine1",
    type: "text",
    required: true,
  },
  {
    label: "Address Line 2",
    key: "addressLine2",
    type: "text",
  },
  {
    label: "City",
    key: "city",
    type: "text",
    required: true,
  },
  {
    label: "State",
    key: "state",
    type: "us_select_state",
    required: true,
  },
  {
    label: "Zip Code",
    key: "zipCode",
    type: "text",
    required: true,
  },
];

export const AUS_FORM_FIELDS = [
  {
    label: "Address Line 1",
    key: "addressLine1",
    type: "text",
    required: true,
  },
  {
    label: "Address Line 2",
    key: "addressLine2",
    type: "text",
  },
  {
    label: "Suburb",
    key: "suburb",
    type: "text",
    required: true,
  },
  {
    label: "State",
    key: "state",
    type: "aus_select_state",
    required: true,
  },
  {
    label: "Post Code",
    key: "postCode",
    type: "text",
    required: true,
  },
];

export const ID_FORM_FIELDS = [
  {
    label: "Province",
    key: "province",
    type: "id_select_province",
    required: true,
  },
  {
    label: "City",
    key: "city",
    type: "text",
    required: true,
  },
  {
    label: "District",
    key: "district",
    type: "text",
    required: true,
  },
  {
    label: "Village",
    key: "village",
    type: "text",
    required: true,
  },
  {
    label: "Post Code",
    key: "postCode",
    type: "text",
    required: true,
  },
  {
    label: "Street Address",
    key: "streetAddress",
    type: "text",
  },
];

export const COUNTRY_FORM_FIELDS = {
  US: US_FORM_FIELDS,
  AUS: AUS_FORM_FIELDS,
  ID: ID_FORM_FIELDS,
};

export const FORM_DEFAULT_VALUE = {
  US: {
    state: US_STATES[0],
  },
  AUS: {
    state: AUS_STATES[0],
  },
  ID: {
    state: ID_PROVINCES[0],
  },
};
