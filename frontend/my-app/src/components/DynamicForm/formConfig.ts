import { ID_PROVINCES, US_STATES, AUS_STATES } from "../../constants";

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
    defaultValue: US_STATES[0],
    required: true,
  },
  {
    label: "Zip Code",
    key: "zipCode",
    type: "text",
    required: true,
    validation: "5_digit_code",
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
    defaultValue: AUS_STATES[0],
    required: true,
  },
  {
    label: "Post Code",
    key: "postCode",
    type: "text",
    required: true,
    validation: "4_digit_code",
  },
];

export const ID_FORM_FIELDS = [
  {
    label: "Province",
    key: "province",
    type: "id_select_province",
    defaultValue: ID_PROVINCES[0],
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
  },
  {
    label: "Post Code",
    key: "postCode",
    type: "text",
    required: true,
    validation: "5-digit",
  },
  {
    label: "Street Address",
    key: "streetAddress",
    type: "text",
    required: true,
  },
];

export const COUNTRY_FORM_FIELDS = {
  US: US_FORM_FIELDS,
  AUS: AUS_FORM_FIELDS,
  ID: ID_FORM_FIELDS,
};
