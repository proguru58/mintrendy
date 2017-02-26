import categoryActions from '../../constants/categories';

export default function fetchAllCategories(context) {
    context.dispatch(categoryActions.CATEGORIES);
    context.api.categories.getAll().then(function successFn(result) {
        context.dispatch(categoryActions.CATEGORIES_SUCCESS, result);
    }, function errorFn(err) {
        context.dispatch(categoryActions.CATEGORIES_ERROR, err.result);
    });
}
