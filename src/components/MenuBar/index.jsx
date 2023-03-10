import React from "react"
import { HiOutlineRefresh } from "react-icons/hi"

const MenuBar = ({ id, setId }) => {
    const handleRandom = () => {
        let tempId = Math.floor(Math.random() * 890) + 1
        while (id === tempId) {
            tempId = Math.floor(Math.random() * 890) + 1
        }
        setId(tempId)
    }

    return (
        <div className="w-full py-8 flex flex-wrap gap-8 items-center justify-between">
            <h1 className="text-white text-2xl">Pokemon Card Generator</h1>
            <button
                className="flex items-center gap-3 text-white text-lg border border-white px-4 py-2 rounded-md ml-auto"
                onClick={handleRandom}
            >
                Random <HiOutlineRefresh />
            </button>
        </div>
    )
}

export default MenuBar
