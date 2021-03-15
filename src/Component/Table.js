import React from 'react'

const Column = ({ size, toggle, row }) => {
    return (
        <>
            <div className='row'>
                {
                    [...Array(size)].map((col, index) => {
                        return (
                            <div className='sq' key={index}
                                onClick={() => {
                                    toggle(index)
                                }}
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

const Table = ({ table, setTable, turn , openHistory }) => {
    return (
        <>
            <div>
                <h1>{`เทิร์นของ ${turn == 1 ? 'X' : 'O'}`}</h1>
            </div>
            {
                table.map((row, ridx) => {
                    return <Column
                        size={row.length}
                        key={ridx}
                        toggle={(col) => setTable(ridx, col)}
                        row={row}
                    />
                })
            }
            <div className='history-btn'
                onClick={ () => {
                    openHistory()
                }}
            >
                ดูประวัติ
            </div>
        </>
    )
}

export default Table