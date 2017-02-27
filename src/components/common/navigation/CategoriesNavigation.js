/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';
import TreeMenu from './TreeMenu';

/**
 * Component
 */
class CategoriesNavigation extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./CategoriesNavigation.scss');
    }

    //*** Template ***//

    render() {

        // Base route params
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};
        let category = this.props.category;

        // Return
        return (
            <div className="categories-navigation__tab">
                {this.props.links.slice(0, 9).map(function (link, idx) {
                    return (
                        <Link key={idx} to={link.to} params={Object.assign(link.params || {}, routeParams)} className={category && category.name == link.name ? 'active' : ''}>
                            {link.name}
                        </Link>
                    );
                })}
                <div className="categories-navigation__dropdown">
                    <button className="categories-navigation__dropbtn">More</button>
                    <div className="categories-navigation__dropdown-content">
                        {this.props.links.slice(9).map(function (link, idx) {
                            return (
                                <Link key={idx} to={link.to} params={Object.assign(link.params || {}, routeParams)} className={category && category.name == link.name ? 'active' : ''}>
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default CategoriesNavigation;
