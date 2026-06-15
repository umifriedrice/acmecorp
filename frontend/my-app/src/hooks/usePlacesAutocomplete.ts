import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useRef, useEffect, useCallback } from "react";

function parseAddressComponents(components, countryCode) {
  const get = (type, short = false) => {
    const c = components.find((comp) => comp.types.includes(type));
    return c ? (short ? c.shortText : c.longText) : "";
  };
  const line1 = [get("street_number"), get("route")].filter(Boolean).join(" ");

  switch (countryCode) {
    case "US":
      return {
        addressLine1: line1,
        city: get("locality"),
        state: get("administrative_area_level_1", true),
        zipCode: get("postal_code"),
      };
    case "AUS":
      return {
        addressLine1: line1,
        suburb: get("locality"),
        state: get("administrative_area_level_1", true),
        zipCode: get("postal_code"),
      };
    case "ID":
      return {
        province: get("administrative_area_level_1"),
        city: get("administrative_area_level_2") || get("locality"),
        district:
          get("administrative_area_level_3") || get("sublocality_level_1"),
        village:
          get("administrative_area_level_4") ||
          get("sublocality_level_1") ||
          get("sublocality"),
        postCode: get("postal_code"),
      };
    default:
      return { addressLine1: line1, zipCode: get("postal_code") };
  }
}

export default function usePlacesAutocomplete({ countryCode, onSelect }) {
  const placesLib = useMapsLibrary("places");

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sessionTokenRef = useRef(null);
  const debounceRef = useRef(null);

  // Create a session token once the library is ready
  useEffect(() => {
    if (placesLib && !sessionTokenRef.current) {
      sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
    }
  }, [placesLib]);

  // Debounced prediction fetch
  useEffect(() => {
    if (!placesLib || !inputValue) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const request = {
          input: inputValue,
          sessionToken: sessionTokenRef.current,
          ...(countryCode && {
            includedRegionCodes: [
              countryCode === "AUS" ? "AU" : countryCode.toLowerCase(),
            ],
          }),
        };
        const { suggestions: results } =
          await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            request
          );
        setSuggestions(results || []);
      } catch (e) {
        console.error("[places] fetch failed", e);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [inputValue, placesLib, countryCode]);

  const selectSuggestion = useCallback(
    async (suggestion) => {
      const prediction = suggestion.placePrediction;
      setInputValue(prediction.text.text);
      setSuggestions([]);

      try {
        const place = prediction.toPlace();
        await place.fetchFields({
          fields: ["addressComponents", "formattedAddress"],
        });
        // New session after a completed selection (billing)
        sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
        onSelect?.(
          parseAddressComponents(place.addressComponents || [], countryCode),
          place.formattedAddress
        );
      } catch (e) {
        console.error("Failed to fetch places detail, error:", e);
      }
    },
    [placesLib, countryCode, onSelect]
  );

  return {
    ready: Boolean(placesLib),
    inputValue,
    setInputValue,
    suggestions,
    selectSuggestion,
    isLoading,
    clearSuggestions: () => setSuggestions([]),
  };
}
