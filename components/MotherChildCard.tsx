import React from 'react'

const bulletPointsLeft = [
    { title: 'Left Title 1', description: 'Left description 1 placeholder text.' },
    { title: 'Left Title 2', description: 'Left description 2 placeholder text.' },
    { title: 'Left Title 3', description: 'Left description 3 placeholder text.' },
]

const bulletPointsRight = [
    { title: 'Right Title 1', description: 'Right description 1 placeholder text.' },
    { title: 'Right Title 2', description: 'Right description 2 placeholder text.' },
    { title: 'Right Title 3', description: 'Right description 3 placeholder text.' },
]

const MotherChildCard = () => {
    return (
        <div className='bg-surface-100'>
            <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-center relative">
                {/* Left bullet points */}
                <div className="flex flex-col lg:mb-12 space-y-8 lg:space-y-12 lg:w-1/3 pr-0 lg:pr-12">
                    {bulletPointsLeft.map(({ title, description }, idx) => (
                        <div key={idx} className="flex items-center space-x-4 relative">
                            {/* SVG curved line from image to bullet */}
                            <svg
                                className="absolute left-full mt-8 transform "
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M40 20 C30 20, 20 0, 0 0"
                                    stroke="#2563EB"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                            <div className="flex flex-col items-center z-10">
                                <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
                                {idx !== bulletPointsLeft.length - 1 && (
                                    <span className="flex-1 w-px bg-blue-300"></span>
                                )}
                            </div>
                            <div >
                                <h3 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h3>
                                <p className="text-gray-600 text-sm leading-snug">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Center image */}
                <div className="my-12 lg:my-0 lg:w-1/3 flex justify-center relative">
                    <img
                        src="/mother-child.jpg"
                        alt="Mother and Child"
                        className="w-96 h-96 object-cover shadow-lg border-4 border-white"
                    />
                    <span className="absolute top-4 left-2 -rotate-12 bg-blue-600 text-white px-3 py-1 rounded-full">Anne</span>
                    <span className="absolute top-4 right-2 rotate-12 bg-blue-600 text-white px-3 py-1 rounded-full">Çocuk</span>
                </div>

                {/* Right bullet points */}
                <div className="flex flex-col lg:mt-12 space-y-8 lg:space-y-12 lg:w-1/3 pl-0 lg:pl-12">
                    {bulletPointsRight.map(({ title, description }, idx) => (
                        <div key={idx} className="flex items-center space-x-4 relative">
                            {/* SVG curved line from image to bullet */}
                            <svg
                                className="absolute -left-10  transform -translate-y-1/2"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 20 C10 20, 20 40, 40 40"
                                    stroke="#2563EB"
                                    strokeWidth="2"
                                    fill="none"
                                />
                            </svg>
                            <div className="flex flex-col items-center z-10">
                                <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
                                {idx !== bulletPointsRight.length - 1 && (
                                    <span className="flex-1 w-px bg-blue-300"></span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 leading-snug">{title}</h3>
                                <p className="text-gray-600 text-sm leading-snug">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    )
}

export default MotherChildCard