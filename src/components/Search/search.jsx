import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import './Search.css';

const MIN_CHARS = 2; // don't fire an API call for 1 stray character

function Search({ updateSearchTerm }) {
    const [inputValue, setInputValue] = useState('');
    const debouncedSearch = useDebounce((value) => updateSearchTerm(value));

    function handleChange(e) {
        const raw = e.target.value;
        setInputValue(raw);

        const cleaned = raw.trim().toLowerCase();
        // clear results immediately if the box is emptied, otherwise
        // only search once we actually have a meaningful term
        if (!cleaned) {
            updateSearchTerm('');
        } else if (cleaned.length >= MIN_CHARS) {
            debouncedSearch(cleaned);
        }
    }

    function handleClear() {
        setInputValue('');
        updateSearchTerm('');
    }

    return (
        <div className="search-wrapper">
            <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14" />
                </svg>
                <input
                    id="pokemon-name-search"
                    type="text"
                    placeholder="pokemon name...."
                    value={inputValue}
                    onChange={handleChange}
                    autoComplete="off"
                />
                {inputValue && (
                    <button type="button" className="clear-btn" onClick={handleClear} aria-label="Clear search">
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export default Search;
