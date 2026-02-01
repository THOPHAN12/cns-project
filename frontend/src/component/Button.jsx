export default function Button({content}) {
    return (
        <button className="bg-gray-400 opacity-75 text-white px-5 py-2 hover:scale-120 hover:cursor-pointer transition-all rounded-lg text-2xl">
            {content}
        </button>
    )
}