/**
 * Imports
 */
import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import {FormattedMessage} from 'react-intl';

import {slugify} from '../../../utils/strings';

// Flux
import CategoriesStore from '../../../stores/Categories/CategoriesStore';
import IntlStore from '../../../stores/Application/IntlStore';
import ProductsListStore from '../../../stores/Products/ProductsListStore';

import fetchProducts from '../../../actions/Products/fetchProducts';

// Required components
import NotFound from '../../pages/NotFound/NotFound';
import ProductList from '../../common/products/ProductList';
import CategoriesNavigation from '../../common/navigation/CategoriesNavigation';

// Translation data for this component
import intlData from './CategoryProductsPage.intl';

/**
 * Component
 */
class CategoryProductsPage extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired,
        router: React.PropTypes.func.isRequired
    };

    //*** Required Data ***//

    static fetchData = function (context, params, query, done) {
        let productsQuery = {tags: params.categorySlug};
        if (query.page) {
            productsQuery.page = query.page;
        }
        if (query.sort) {
            productsQuery.sort = query.sort;
        }
        context.executeAction(fetchProducts, productsQuery, done);
    };

    //*** Page Title and Snippets ***//

    static pageTitleAndSnippets = function (context, params, query) {
        let category = context.getStore(CategoriesStore).getCategory(params.categoryId);
        if (category) {
            return {
                title: category.name
            }
        } else {
            return {
                title: 'Category Not Found'
            }
        }
    };

    //*** Initial State ***//

    state = {
        categories: this.context.getStore(CategoriesStore).getCategories(),
        products: this.context.getStore(ProductsListStore).getProducts(),
        totalPages: this.context.getStore(ProductsListStore).getTotalPages(),
        currentPage: this.context.getStore(ProductsListStore).getCurrentPage()
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CategoryProductsPage.scss');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps._categories,
            products: nextProps._products,
            totalPages: nextProps._totalPages,
            currentPage: nextProps._currentPage
        });
    }

    //*** View Controllers ***//

    handleSortChange = (value) => {
        this.context.router.transitionTo('category', {
            locale: this.context.getStore(IntlStore).getCurrentLocale(),
            categoryId: this.props.params.categoryId
        }, {sort: value});
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //

        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: intlStore.getCurrentLocale()}; // Base route params
        let category = this.context.getStore(CategoriesStore).getCategory(this.props.params.categoryId);

        // Stuff that only makes sense (and will crash otherwise) if category exists
        if (category) {

            // Breadcrumbs
            var breadcrumbs = [
                {
                    name: <FormattedMessage
                              message={intlStore.getMessage(intlData, 'homepage')}
                              locales={intlStore.getCurrentLocale()} />,
                    to: 'homepage',
                    params: routeParams
                },
                {
                    name: <FormattedMessage
                        message={intlStore.getMessage(intlData, 'productsList')}
                        locales={intlStore.getCurrentLocale()} />,
                    to: 'products',
                    params: routeParams
                },
                {
                    name: <FormattedMessage
                              message={intlStore.getMessage(category.name)}
                              locales={intlStore.getCurrentLocale()} />
                }
            ];
        }

        let categories = this.state.categories.map(function (category) {
            return {
                name: category.name,
                to: 'category-slug',
                params: {
                    categoryId: category.id,
                    categorySlug: slugify(category.value)
                }
            };
        });

        //
        // Return
        //
        return (
            <div className="category-products-page">
                {category ?
                    <div>
                        <div className="category-products-page__header">
                            <CategoriesNavigation links={categories} category={category}/>
                        </div>

                        <div className="category-products-page__products">
                            <ProductList title={<FormattedMessage message={category.name}
                                                                  locales={intlStore.getCurrentLocale()} />}
                                         category={category}
                                         products={this.state.products}
                                         routeParams={Object.assign({categoryId: category.id}, routeParams)}
                                         totalPages={this.state.totalPages}
                                         currentPage={this.state.currentPage} />
                        </div>
                    </div>
                    :
                    <div>
                        <NotFound />
                    </div>
                }
            </div>
        );
    }
}

/**
 * Flux
 */
CategoryProductsPage = connectToStores(CategoryProductsPage, [CategoriesStore, ProductsListStore], (context) => {
    return {
        _products: context.getStore(ProductsListStore).getProducts(),
        _totalPages: context.getStore(ProductsListStore).getTotalPages(),
        _currentPage: context.getStore(ProductsListStore).getCurrentPage(),
        _categories: context.getStore(CategoriesStore).getCategories(),
    };
});

/**
 * Exports
 */
export default CategoryProductsPage;
