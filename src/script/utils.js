/**
 *
 * @typedef {Object} Todo
 * @property {number } id
 * @property {string} title
 * @property {boolean} completed
 */
/**
 *
 * @param {Todo[]} value
 */

export const setLocalStorageValue = value => {
    localStorage.setItem('todos', JSON.stringify(value));
};
/**
 *
 * @returns {Todo[]}
 */
export const getLocalStorageValue = () => {
    return JSON.parse(localStorage.getItem('todos'));
};
