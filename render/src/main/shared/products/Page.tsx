import * as React from 'react';
import { Link } from 'react-router-dom';

export interface PageProps {
    changePageSizeFn: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    changePageFn: (page: number) => (event: React.MouseEvent<HTMLAnchorElement>) => void;
    pages: number[];
    term: string;
    pageSize: number;
}

export class Page extends React.Component<PageProps, {}> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div className='products-page'>
                <div className='products-page-size'>
                    <select onChange={this.props.changePageSizeFn}>
                        <option value='16'>16 produtos por página</option>
                        <option value='30'>30 produtos por página</option>
                        <option value='50'>50 produtos por página</option>
                    </select>
                </div>
                <div className='products-page-number'>
                    {this.props.pages &&
                        this.props.pages.map((page, i) =>
                            <Link
                                key={i}
                                onClick={this.props.changePageFn(page)}
                                to={`/?q=${this.props.term}&size=${this.props.pageSize}&page=${page}`}>{page}</Link>
                        )}
                </div>
            </div>
        );
    }
}


