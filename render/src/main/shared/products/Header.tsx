import * as React from 'react';
const logo = require('./logo.svg') as string;
const search = require('./search.svg') as string;


export interface HeaderProps {
    submitFn: (event: React.FormEvent<HTMLFormElement>) => void;
    changeTermFn: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class Header extends React.Component<HeaderProps, {}> {
    constructor(props: HeaderProps) {
        super(props);
    }

    render() {
        return (
            <header className='default-header'>
                <img src={logo} />
                <div className='search-container'>
                    <form onSubmit={this.props.submitFn}>
                        <input type='search' className='search' placeholder='Buscar produtos...' onChange={this.props.changeTermFn} />
                    </form>
                </div>
            </header>
        );
    }
}


