import { useEffect, useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete from "../../hooks/usePlacesAutocomplete";
import "./PlacesAutocomplete.css";

// This is a demo API key so it should be safe to put the key in this file for now.
// The best practice for this should be putting the key in a environmental safe storage somewhere that can be referenced back inside the project
const apiKey = "AIzaSyAEYGgUbofHO7IEnl_ttwEXzJPUdPs6CFE";

function AutocompleteInner({ countryCode, onAddressSelect }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const {
    ready,
    inputValue,
    setInputValue,
    suggestions,
    selectSuggestion,
    isLoading,
    clearSuggestions,
  } = usePlacesAutocomplete({ countryCode, onSelect: onAddressSelect });

  useEffect(() => {
    const handleMouseDownEvent = (node: Node) =>
      rootRef.current && !rootRef.current.contains(node) && clearSuggestions();
    document.addEventListener("mousedown", (e) =>
      handleMouseDownEvent(e.target as Node)
    );
    return () =>
      document.removeEventListener("mousedown", handleMouseDownEvent);
  }, [clearSuggestions]);

  return (
    <div className="pa" ref={rootRef}>
      <label className="pa-label">Search address</label>

      <div className="pa-input-wrap">
        <span className="pa-icon">🔍</span>
        <input
          className="pa-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={ready ? "Start typing your address…" : "Loading…"}
          disabled={!ready}
          autoComplete="off"
          onKeyDown={(e) => e.key === "Escape" && clearSuggestions()}
        />
        {isLoading && <span className="pa-spinner">⟳</span>}
      </div>

      {suggestions.length > 0 && (
        <ul className="pa-list" role="listbox">
          {suggestions.map((suggestion, index) => {
            const prediction = suggestion.placePrediction;
            return (
              <li
                key={prediction.placeId || index}
                role="option"
                className="pa-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectSuggestion(suggestion);
                }}
              >
                <span className="pa-pin">📍</span>
                <span className="pa-text">
                  <span className="pa-main">
                    {prediction.mainText?.text || prediction.text.text}
                  </span>
                  {prediction.secondaryText?.text && (
                    <span className="pa-secondary">
                      {prediction.secondaryText.text}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const PlacesAutocomplete = (props: Props) => {

  return (
    <APIProvider apiKey={apiKey}>
      <AutocompleteInner {...props} />
    </APIProvider>
  );
}

export type AddressData = { [key: string]: string };

interface Props {
  countryCode: string;
  onAddressSelect: (
    addressData:  AddressData,
    formateddAddress: string
  ) => void;
}

export default PlacesAutocomplete;