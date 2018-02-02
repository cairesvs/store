import * as React from 'react';

export interface TypedProps {
    term: string;
}

export class Typed extends React.Component<TypedProps, {}> {
    constructor(props: TypedProps) {
        super(props);
    }

    render() {
        return (
            <div className='typed' >
                <span>{this.props.term}</span>
            </div>
        );
    }
}


