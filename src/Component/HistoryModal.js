import React from 'react'


const Column = ({ size, row }) => {
    return (
        <>
            <div className='row'>
                {
                    [...Array(size)].map((col, index) => {
                        return (
                            <div className='sq' key={index}
                                
                            >
                                {
                                    row[index] === 0 ? ' ' :
                                        row[index] === 1 ? 'X' : 'O'
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

const Table = ({ table }) => {
    return (
        <>
        <div className='history-row'>
            {
                table.map((row, ridx) => {
                    return <Column
                        size={row.length}
                        key={ridx}
                        row={row}
                    />
                })
            }
        </div>
        </>
    )
}

const HistoryModal = ({ isVisible , onClosed , history }) => {
    return (
        <>
            {
                isVisible ? (
                    <>
                        <div className='modal-container'>
                            <div className='history-modal'>
                                {
                                    history.map( (item , index) => {
                                        return <Table key={index} table={item} />
                                    })
                                }
                            </div>
                        </div>
                        <div className='x-btn' onClick={ () => onClosed()} >x</div>
                    </>
                ) : null
            }

        </>
    )
}

export default HistoryModal