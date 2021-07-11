import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const searchHandler = e => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    };

    return (
        <div>
            <form onSubmit={searchHandler}>
                <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder="Enter Product Name ..."
                            onChange={e => setKeyword(e.target.value)}
                        />
                    <div className="input-group-append">
                        <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Search;
