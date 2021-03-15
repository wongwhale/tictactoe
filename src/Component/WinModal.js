import React from 'react'

const WinModal = ({ isVisible, text, onRestart, onShowHistory }) => {
    return (
        <>
            {
                isVisible ? (
                    <div className='modal-container'>
                        <div className='win-container'>
                            <span className='congrat-text'>{text}</span>
                            <div
                                className='restart-btn'
                                onClick={() => {
                                    onRestart()
                                }}
                            >
                                เริ่มใหม่
                            </div>
                            <div
                                className='history-btn'
                                onClick={() => {
                                    onShowHistory()
                                }}
                            >
                                ดูประวัติ
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default WinModal