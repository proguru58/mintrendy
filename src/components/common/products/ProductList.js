/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

import {slugify} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Heading from '../typography/Heading';
import Pagination from '../navigation/Pagination';
import ProductListItem from './ProductListItem';
import Text from '../typography/Text';
import TreeMenu from '../navigation/TreeMenu';

// Translation data for this component
import intlData from './ProductList.intl';

/**
 * Component
 */
class ProductList extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./ProductList.scss');
    }

    //*** Template ***//

    render() {

        let intlStore = this.context.getStore(IntlStore);

        let hasDescription = () => {
            return this.props.category && this.props.category.description && this.props.category.description[intlStore.getCurrentLocale()];
        };

        return (
            <div className="product-list">
                <div className="product-list__container">
                    {this.props.title ?
                        <div className="product-list__title">
                            <Heading size="medium">{this.props.title}</Heading>
                        </div>
                        :
                        null
                    }
                    {hasDescription() ?
                        <div className="product-list__category-description">
                            <Text size="small">
                                {this.props.category.name}
                            </Text>
                        </div>
                        :
                        null
                    }
                    {this.props.children ?
                        <div className="product-list__content">
                            {this.props.children}
                        </div>
                        :
                        null
                    }
                    <div className="product-list__items">
                        {this.props.products.length > 0 ?
                            this.props.products.map(function (item, idx) {
                                return (
                                    <div key={idx} className="product-list__product-item">
                                        <ProductListItem product={item} />
                                    </div>
                                );
                            })
                            :
                            <div className="product-list__no-results">
                                <Text size="medium">
                                    <FormattedMessage
                                        message={intlStore.getMessage(intlData, 'noResults')}
                                        locales={intlStore.getCurrentLocale()} /> :(
                                </Text>
                            </div>
                        }
                    </div>
                    {this.props.totalPages && this.props.currentPage && this.props.routeParams && this.props.totalPages > 1 ?
                        <div className="product-list__pagination">
                            <Pagination to={this.props.paginateTo || 'category'}
                                        params={this.props.routeParams}
                                        totalPages={this.props.totalPages}
                                        currentPage={this.props.currentPage} />
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default ProductList;
