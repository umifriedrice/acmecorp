# How to run the project

First, please use PNPM version 9.x to install all the required dependencies by running this command below
```
pnpm run install:all
```

There are two methods to run this project

**Method 1 (Run in a single window):**
Just simply run this command in your terminal

```
pnpm run dev
```

**Method 2 (Run in separate terminals):**
Open two terminal windows and open each of this command below in their respective windows

For frontend:
```
pnpm run dev:frontend
```

For backend:
```
pnpm run dev:backend
```

# Thoughts on the application and its design

Each country is isolated into its own strategy, its own configuration, validation logic, and form structure, both in the backend and frontend. This concept is inspired by **Strategy design pattern**, which means each country has its own function and configuration to support its unique fields, rules and characteristics. Adding a new country is a will be an isolated change and can be done without touching the existing ones.

On the database side, addresses are intentionally not isolated by country. All addresses share a single entity that holds every country's possible fields, avoiding schema fragmentation and keeping queries simple.

The tradeoff and the cons of this approach is that as more countries are added, the codebase grows with more strategies and configurations. But because each country's logic is self-contained, that growth stays manageable and predictable, thus making the application scalable.

# What can be improved

To further improve the dynamic capability of the appliation, we can set up a new service and API to generate a data containing the structure, field of the form that should be rendered based on the country inputted. Currently the structure and the fields of the form are still hardcoded in the frontend but we can move this part to backend so we can easily dynamically generate the form with the structure that we want. After the backend generated the form structure data based on the country given. The data will then be fed to the frontend and then the frontend will take care of rendering the form with the structure given from the backend API.

e.g

new API to return form structure
```
/api/address/{:country}/form
```

will return a form config like this example below (I'll use an US form structure for now)
```
[
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
```

By doing this, adding a new country and a new rules or validation for countries should be easily more controlled and maintained.
