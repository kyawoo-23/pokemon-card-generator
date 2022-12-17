import React from "react"
import useSwr from "swr"
import fetch from "unfetch"

const MoveSet = ({ moveId }) => {
    const fetcher = (url) => fetch(url).then((r) => r.json())

    const { data, isLoading } = useSwr(moveId, fetcher)

    return (
        <div className="w-full grid grid-cols-6 font-semibold">
            {!isLoading && (
                <>
                    <div className="col-span-1">
                        <img
                            className="h-6 w-6"
                            src={`/types/Pokemon_Type_Icon_${data?.type.name}.svg`}
                            alt={data?.type.name}
                        />
                    </div>
                    <p className="col-span-3 capitalize">{data?.name}</p>
                    <p className="col-span-2 text-right">{data?.power}</p>
                </>
            )}
        </div>
    )
}

export default MoveSet
