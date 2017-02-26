/**
 * Imports
 */
import superagent from 'superagent';

/**
 * Atlas Categories API wrapper
 */
class CategoriesAPI {

    /**
     * Constructor
     * @param options - Object containing ATLAS settings
     * @param getAuthToken - Method that returns the Authorization token
     */
    constructor({options, getAuthToken}) {
        this.baseUrl = options.baseUrl;
        this.getAuthToken = getAuthToken;
    }

    /**
     * All API calls should be wrapped/handled/called by this in method order
     * for any common additional stuff to be done (e.g. adding Authorization headers)
     */
    _wrapAndRequest(request, resolve, reject) {
        if (this.getAuthToken()) {
            request.set('Authorization', this.getAuthToken());
        }
        request.end(function (err, result) {
            if (err) {
                reject({status: err.status, result: (result) ? result.body : null});
            } else {
                resolve(result.body);
            }
        });
    }

    /**
     * Create new Category
     */
    create(payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.post(`${this.baseUrl}/categories`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Categories collection
     */
    find(params) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/categories`).query(params || {});
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch Category with given ID
     */
    get(categoryId) {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/categories/${categoryId}`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Fetch all the Categories
     */
    getAll() {
        return new Promise((resolve, reject) => {
            let request = superagent.get(`${this.baseUrl}/categories`);
            this._wrapAndRequest(request, resolve, reject);
        });
    }

    /**
     * Update Category
     */
    update(categoryId, payload) {
        return new Promise((resolve, reject) => {
            let request = superagent.put(`${this.baseUrl}/categories/${categoryId}`).send(payload);
            this._wrapAndRequest(request, resolve, reject);
        });
    }
}

/**
 * Exports
 */
export default CategoriesAPI;
