import { INPUT_UPDATED } from "../types";

/**
 * Update the current search value`
 * @param {string} newValue 
 */
export const updateSearchInput = (newSearch) => {
    return { type: INPUT_UPDATED, newSearch };
}