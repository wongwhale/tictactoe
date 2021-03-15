import React from 'react'
import NumberInput from '../Component/NumberInput'
import Table from '../Component/Table'
import WinModal from '../Component/WinModal'
import HistoryModal from '../Component/HistoryModal'

const App = () => {
    const [isReady, setIsReady] = React.useState(false)
    const [number, setNumber] = React.useState(0)
    const [table, setTable] = React.useState([])
    const [turn, setTurn] = React.useState(1)
    const [isEnd, setIsEnd] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [text, setText] = React.useState('')
    const [historyLists , setHistoryList] = React.useState([])
    const [historyVisible, setHistoryVisible] = React.useState(false)
    // 1 = X
    // 2 = O

    const handleRestart = () => {
        // for (let i in table) {
        //     for (let j in table) {
        //         table[i][j] = 0
        //     }
        // }
        // setCount(2)
        // setIsEnd(false)
        // setHistoryList([])
        window.location.reload()
    }

    const congrat = (isDraw) => {
        if (turn == 1) {
            setText('O ชนะ')
        } else {
            setText('X ชนะ')
        }
        setIsEnd(true)
    }

    React.useEffect(() => {
        checkHorizontal()
            .then(() => {
                congrat()
            }).catch(() => {
                checkVertical()
                    .then(() => {
                        congrat()
                    }).catch(() => {
                        checkCross()
                            .then(() => {
                                if (isReady) congrat()
                            }).catch(() => {
                                if (count === (table.length * table.length) + 1) {
                                    setText('เสมอ')
                                    setIsEnd(true)
                                }
                            })
                    })
            })
        setCount(count + 1)
    }, [table])


    const checkCross = () => {
        let check = true
        return new Promise((resolve, reject) => {
            for (let i in table) {
                if (table[0][0] === 0) {
                    check = false
                    break
                }
                else {
                    if (table[i][i] !== table[0][0]) {
                        check = false
                        break
                    }
                }
            }
            if (check) resolve()
            else check = true
            const t_length = table.length - 1
            for (let i in table) {
                if (table[i][t_length - i] === 0) {
                    check = false
                    break
                }
                else {
                    if (table[i][t_length - i] !== table[0][t_length]) {
                        check = false
                        break
                    }
                }
            }
            if (check) resolve()
            else reject()

        })
    }

    const checkVertical = () => {
        let check = true
        return new Promise((resolve, reject) => {
            for (let col in table) {
                check = true
                for (let row in table) {
                    if (table[row][col] === 0) {
                        check = false
                        break
                    }
                    else {
                        if (table[row][col] !== table[0][col]) {
                            check = false
                            break
                        }
                    }
                }
                if (check) resolve()
            }
            if (!check) reject()
        })
    }


    const checkHorizontal = () => {
        let check = true

        return new Promise((resolve, reject) => {
            for (let row in table) {
                check = true
                for (let col in table) {
                    if (table[row][col] === 0) {
                        check = false
                        break
                    } else {
                        if (table[row][col] !== table[row][0]) {
                            check = false
                            break
                        }
                    }
                }
                if (check) resolve()
            }
            reject()
        })


    }

    const handleClick = (row, col) => {
        return new Promise((resolve, reject) => {
            let temp_table = [...table]
            if (table[row][col] === 0) {
                if (turn === 1) {
                    temp_table[row][col] = 1
                    setTable(temp_table)
                    setTurn(2)
                    resolve(temp_table)
                }
                else {
                    temp_table[row][col] = 2
                    setTable(temp_table)
                    setTurn(1)
                    resolve(temp_table)
                }
            } else {
                reject()
            }
        })
    }




    return (
        <>
            <div className='container'>
                <WinModal isVisible={isEnd} text={text} onRestart={() => handleRestart()} onShowHistory={ () => setHistoryVisible(true)} />
                <HistoryModal isVisible={historyVisible} history={historyLists} onClosed={() => setHistoryVisible(false)} />
                {
                    !isReady
                        ? <NumberInput setNumber={(num) => setNumber(num)} setIsReady={(bool) => setIsReady(bool)} setTable={(tb) => setTable(tb)} />
                        : <Table
                            table={table}
                            setTable={(row, col) => {
                                handleClick(row, col)
                                    .then((res_table) => {
                                        let pos = res_table.map( (item) => {
                                            return item.slice()
                                        })
                                        setHistoryList( old => [ ...old , pos])
                                    }).catch(() => {
                                        alert('กรุณาเลือกช่างที่ว่าง')
                                    })
                            }}
                            openHistory={() => {
                                setHistoryVisible(true)
                            }}
                            turn={turn}
                        />

                }
            </div>

        </>
    )
}

export default App