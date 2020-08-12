import React, { Fragment }  from 'react';
import ItemList  from "../itemList";
import { dashboardItemList, userItemList, searchList } from '../../models';
import './index.scss';

const ListingPage = ( props ) =>  {

    const { listType, searchQuery } = props;
    const { api, apiKey, categories } = 'dashboardItemList' === listType ? dashboardItemList: 'searchList' === listType ? searchList: userItemList ;

    return(
        <Fragment>
            {
                categories.map( ( item, index ) => {
                    return (
                        <ItemList
                            key= { `${index}__${item.title}`}
                            api = { api } 
                            apiKey = { apiKey }
                            title = { item.title }
                            param = { item.param ? item.param: searchQuery }
                            type = { listType }
                            category = { item.title }
                        />
                    );
                } )
            }
            
        </Fragment>
    );
    
};

export default ListingPage;