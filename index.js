import React from 'react'

import { render } from 'react-dom'
import App from './src/Pages/index'
import './src/style'

const TicTecToeApp = () => {
    return (
        <>
            <App />
        </>
    )
}

render(<TicTecToeApp /> , document.getElementById('app'))