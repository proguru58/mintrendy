/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';

import InputField from '../forms/InputField';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

/**
 * Component
 */
class MainNavigation extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./MainNavigation.scss');
    }

    //*** Template ***//

    render() {

        // Base route params
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()};

        // Return
        return (
            <div className="main-navigation">
                <div className="main-navigation__search-term">
                    <InputField placeholder='Search' />
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default MainNavigation;
