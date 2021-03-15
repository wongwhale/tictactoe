import React from 'react'

const NumberInput = ({ setNumber, setIsReady , setTable }) => {
    const [inputText, setInputText] = React.useState('')
    const handleSubmit = () => {
        const check = /^\d{1,}$/.test(inputText)
        if (check) {
            if( parseInt(inputText) >= 3) {
                const table = [...Array(parseInt(inputText))].map( () => {
                    return [...Array(parseInt(inputText))].map( () => {
                        return 0
                    })
                })
                setNumber(parseInt(inputText))
                setTable(table)
                setIsReady(true)
            }else{
                alert('กรุณาใส่เลขให้มากกว่าเท่ากลับ 3')
            }
        } else {
            alert('กรุณาใส่ข้อมูลให้ถูกต้อง')
        }
    }
    return (
        <>
            <span className='header-text'>Tic Tac Toe</span>
            <input
                className='number-input'
                placeholder='ระบุจำนวนตาราง (ตัวเลข)'
                value={inputText}
                onChange={({ target: { value } }) => setInputText(value)}
            />
            <button
                className='submit-btn'
                onClick={() => {
                    handleSubmit()
                }}

            >
                ตกลง
                </button>
        </>
    )
}

export default NumberInput