import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export const ShowStars = ({ stars }) =>
    Array.from({ length: 5 }, (_, index) => (
        <span className="stars" key={index}>
            {stars >= index + 1 ? (
                <BsStarFill />
            ) : stars >= index + 0.5 ? (
                <BsStarHalf />
            ) : (
                <BsStar />
            )}
        </span>
    ))

export const ShowColors = ({
    colors,
    colorIndex,
    setColorIndex,
    setSelectedColor,
}) =>
    colors.map((color, index) => (
        <button
            key={index}
            type="button"
            id="color"
            className={`color ${index === colorIndex && 'outline'}`}
            style={{ background: color }}
            onClick={() => {
                setColorIndex(index)
                setSelectedColor(color)
            }}
        ></button>
    ))

    