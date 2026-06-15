import { useEffect, useRef } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete from "../hooks/usePlacesAutocomplete";

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
      rootRef.current &&
      !rootRef.current.contains(node) &&
      clearSuggestions();
    document.addEventListener("mousedown", (e) => handleMouseDownEvent(e.target as Node));
    return () => document.removeEventListener("mousedown", handleMouseDownEvent);
  }, [clearSuggestions]);

  return (
    <div className="pa" ref={rootRef}>
      <style>{CSS}</style>
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
                    <span className="pa-secondary">{prediction.secondaryText.text}</span>
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

export default function PlacesAutocomplete(props: Props) {
  const apiKey = "AIzaSyAEYGgUbofHO7IEnl_ttwEXzJPUdPs6CFE";

//   if (!apiKey) {
//     return (
//       <div className="pa">
//         <style>{CSS}</style>
//         <div className="pa-warning">
//           Set <code>VITE_GOOGLE_MAPS_API_KEY</code> and enable “Places API
//           (New)” to use autocomplete.
//         </div>
//       </div>
//     );
//   }

  return (
    <APIProvider apiKey={apiKey}>
      <AutocompleteInner {...props} />
    </APIProvider>
  );
}

const CSS = `
  .pa { position: relative; font-family: 'Inter', system-ui, sans-serif; }
  .pa-label { display: block; font-size: .8rem; font-weight: 600; color: #3a3a52; margin-bottom: 6px; }
  .pa-warning { background: #fffbeb; border: 1px solid #fcd34d; color: #92400e;
                font-size: .8rem; padding: 8px 10px; border-radius: 8px; }
  .pa-warning code { background: #fef3c7; padding: 1px 4px; border-radius: 4px; }
  .pa-input-wrap { position: relative; display: flex; align-items: center; }
  .pa-icon { position: absolute; left: 12px; pointer-events: none; font-size: .9rem; }
  .pa-input { width: 100%; padding: 11px 38px 11px 36px; font-size: .9rem; font-family: inherit;
              border: 1.5px solid #e0e0ec; border-radius: 9px; transition: border-color .15s, box-shadow .15s; }
  .pa-input:focus { outline: none; border-color: #5b5bd6; box-shadow: 0 0 0 3px rgba(91,91,214,.14); }
  .pa-input:disabled { background: #f5f5fa; color: #9a9ab0; }
  .pa-spinner { position: absolute; right: 12px; animation: pa-spin 1s linear infinite; }
  @keyframes pa-spin { to { transform: rotate(360deg); } }
  .pa-list { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 50;
             margin: 0; padding: 4px; list-style: none; background: #fff;
             border: 1.5px solid #e0e0ec; border-radius: 9px; box-shadow: 0 8px 24px rgba(20,20,50,.12); }
  .pa-item { display: flex; align-items: flex-start; gap: 8px; padding: 9px 10px; border-radius: 6px; cursor: pointer; }
  .pa-item:hover { background: #f0f0fb; }
  .pa-pin { flex-shrink: 0; }
  .pa-text { display: flex; flex-direction: column; }
  .pa-main { font-size: .88rem; color: #1a1a2e; }
  .pa-secondary { font-size: .78rem; color: #6b6b80; }
  .pa-manual { margin-top: 10px; background: none; border: 1.5px solid #e0e0ec; border-radius: 8px;
               padding: 8px 14px; font-size: .82rem; font-family: inherit; color: #6b6b80; cursor: pointer; }
  .pa-manual:hover { border-color: #5b5bd6; color: #5b5bd6; }
`;

interface Props {
  countryCode: string;
  onAddressSelect: (addressData: { [key: string]: string }, formateddAddress: string) => void;
}
