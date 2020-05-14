import React from 'react'

export const Loader = () => (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '2rem',paddingBottom: '2rem',}}>
        <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);