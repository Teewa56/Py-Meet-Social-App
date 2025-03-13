import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <div className='h-screen flex items-center justify-center' >
                <div className='text-center' >
                    <h1 className='text-3xl font-bold' >Something went wrong.</h1>
                    <p className='text-lg font-bold'>Check your Internet Connection or <br /> try again later</p>
                </div>
            </div> ;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
