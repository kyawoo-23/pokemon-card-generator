import React from "react"
import useSwr from "swr"
import fetch from "unfetch"
import MoveSet from "../../components/MoveSet"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { typeBgColor } from "../../../constants/type-bgcolor"

const HomePage = ({ id }) => {
    const fetcher = (url) => fetch(url).then((r) => r.json())

    const { data, isLoading, error } = useSwr(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
        fetcher
    )

    let moveId = [0]
    let styles = {
        gradient: {
            backgroundColor: "#f2f2f2",
        },
    }
    if (!isLoading) {
        const doc = typeBgColor.find((t) => t.type === data?.types[0].type.name)
        styles = {
            gradient: {
                background: `linear-gradient(90deg, ${doc.colors[0]} 0%, ${doc.colors[1]} 50%, ${doc.colors[2]} 100%)`,
            },
        }

        let movesLength = data?.moves.length - 1
        if (movesLength > 1) {
            moveId[0] = Math.floor(Math.random() * movesLength) + 1
            do {
                moveId[1] = Math.floor(Math.random() * movesLength) + 1
            } while (moveId[0] === moveId[1])
        }
    }

    return (
        <div className="my-8">
            <div
                className={`w-full sm:w-[70%] md:w-[50%] lg:w-[35%] mx-auto h-fit py-3 px-5 flex flex-col gap-4 rounded shadow-lg`}
                style={styles.gradient}
            >
                {!isLoading && !error ? (
                    <>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg capitalize stroke-white">
                                {data?.species.name}
                            </h3>
                            <h4 className="font-semibold flex items-center gap-2">
                                <span>{data?.stats[0].base_stat} HP</span>

                                <img
                                    className="h-6 w-6"
                                    src={`/types/Pokemon_Type_Icon_${data?.types[0].type.name}.svg`}
                                    alt={data?.types[0].type.name}
                                />
                            </h4>
                        </div>
                        <div className="h-52 w-full mb-10">
                            <img
                                className="h-52 w-full object-contain"
                                src={data?.sprites.other.home.front_default}
                                alt={data?.species.name}
                            />
                        </div>
                        {moveId?.map((mid, idx) => (
                            <MoveSet
                                key={idx}
                                moveId={data?.moves[mid]?.move.url}
                            />
                        ))}
                    </>
                ) : (
                    <SkeletonTheme baseColor="#404040" highlightColor="#444">
                        <Skeleton count={15} />
                    </SkeletonTheme>
                )}
                {error && (
                    <p className="text-red-600">An error occured, {error}</p>
                )}
            </div>
        </div>
    )
}

export default HomePage
