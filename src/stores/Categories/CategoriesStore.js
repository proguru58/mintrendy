/**
 * Imports
 */
import BaseStore from 'fluxible/addons/BaseStore';
import categoryActions from '../../constants/categories';

/**
 * Store
 */
class CategoriesStore extends BaseStore {

    static storeName = 'CategoriesStore';

    static handlers = {
        [categoryActions.CATEGORIES]: 'handleRequest',
        [categoryActions.CATEGORIES_SUCCESS]: 'handleSuccess',
        [categoryActions.CATEGORIES_ERROR]: 'handleError',

        [categoryActions.CATEGORIES_ITEM_SAVE_SUCCESS]: 'handleItemSaveSuccess',

        [categoryActions.CATEGORIES_BULK_SAVE]: 'handleBulkSaveRequest',
        [categoryActions.CATEGORIES_BULK_SAVE_SUCCESS]: 'handleBulkSaveSuccess',
        [categoryActions.CATEGORIES_BULK_SAVE_ERROR]: 'handleBulkSaveError'
    };

    constructor(dispatcher) {
        super(dispatcher);
        this.loading = false;
        this.error = undefined;
        this.categories = undefined;
    }

    getState() {
        return {
            loading: this.loading,
            error: this.error,
            categories: this.categories,
        }
    }

    //
    // Isomorphic stuff
    //

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.loading = state.loading;
        this.error = state.error;
        this.categories = state.categories;
    }

    //
    // Getters
    //

    isLoading() {
        return this.loading === true;
    }

    getError() {
        return this.error;
    }

    /**
     * Returns the categories ordered by position
     */
    getCategories() {
        if (this.categories) {
            let categories = this.categories.items;
            categories.sort(function (a, b) {
                if (a.position < b.position)
                    return -1;
                else if (a.position > b.position)
                    return 1;
                else
                    return 0;
            });
            return categories;
        } else {
            return [];
        }
    }

    /**
     * Returns the Category with the given ID
     */
    getCategory(id) {
        if (this.categories && this.categories.items) {
            return this.categories.items.filter(function (item) {
                return item.id === id;
            })[0];
        } else {
            return null;
        }
    }

    //
    // Handlers
    //

    // Request List

    handleRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleSuccess(payload) {
        this.loading = false;
        this.error = null;
        this.categories = payload;
        this.emitChange();
    }

    handleError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }

    // Item Update

    handleItemSaveSuccess(payload) {
        let updatedCategory = payload;
        if (this.categories && this.categories.items) {
            for (let i=0, len=this.categories.items.length; i<len; i++) {
                if (this.categories.items[i].id === updatedCategory.id) {
                    this.categories.items[i] = updatedCategory;
                }
            }
        }
        this.emitChange();
    }

    // Bulk Update

    handleBulkSaveRequest() {
        this.loading = true;
        this.emitChange();
    }

    handleBulkSaveSuccess(payload) {
        this.loading = false;
        this.error = null;
        if (this.categories && this.categories.items) {
            payload.forEach((updatedCategory) => {
                for (let i=0, len=this.categories.items.length; i<len; i++) {
                    if (this.categories.items[i].id === updatedCategory.id) {
                        this.categories.items[i] = updatedCategory;
                    }
                }
            });
        }
        this.emitChange();
    }

    handleBulkSaveError(payload) {
        this.loading = false;
        this.error = payload;
        this.emitChange();
    }
}

/**
 * Export
 */
export default CategoriesStore;
