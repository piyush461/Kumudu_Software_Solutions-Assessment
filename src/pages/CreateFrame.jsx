import React, { useState } from 'react';

const CreateFrame = () => {
    // Active aside button state
    const [activeTab, setActiveTab] = useState('Dimensions');
    // Carousel scroll index
    const [carouselIndex, setCarouselIndex] = useState(0);
    // Default dimensions in inches
    const [frameHeightInches, setFrameHeightInches] = useState(20);
    const [frameWidthInches, setFrameWidthInches] = useState(10);

    // Convert inches to pixels
    const inchToPx = (inch) => inch * 96;

    const frameHeight = inchToPx(frameHeightInches);
    const frameWidth = inchToPx(frameWidthInches);
    const [numberOfGods, setNumberOfGods] = useState(3);
    const godHeight = inchToPx(10); // default 10 inches
    const godWidth = inchToPx(6);   // default 6 inches
    const lampWidth = inchToPx(2);  // default 2 inches (192px)


    const [frameWidthDisplay, setFrameWidthDisplay] = useState(10);
    const [frameHeightDisplay, setFrameHeightDisplay] = useState(20);

    // Temporary input values while editing
    const [frameWidthInput, setFrameWidthInput] = useState(frameWidthDisplay);
    const [frameHeightInput, setFrameHeightInput] = useState(frameHeightDisplay);

    // Edit mode flag
    const [isEditing, setIsEditing] = useState(false);

    // Handle edit button click
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle save button click
    const handleSaveClick = () => {
        // Update displayed values only on save
        setFrameWidthInches(frameWidthInput);
        setFrameHeightInches(frameHeightInput);
        setIsEditing(false);
    };



    const asideButtons = [
        { title: 'Dimensions', img: "assets/dimension.png" },
        { title: 'Frame', img: 'assets/frame.png' },
        { title: 'Finish', img: 'assets/finish.png' },
        { title: 'Gods', img: 'assets/gods.png' },
        { title: 'Accessories', img: 'assets/accessories.png' },
    ];

    const frames = [
        { id: 1, name: 'Wooden Frame', img: 'assets/frame1.png' },
        { id: 2, name: 'Metal Frame', img: 'assets/frame2.png' },
        { id: 3, name: 'Golden Frame', img: 'assets/frame3.png' },
        { id: 4, name: 'Arc Frame', img: 'assets/frame4.png' },
        { id: 5, name: 'Aluminuim Frame', img: 'assets/frame5.png' },
        { id: 6, name: 'Textured Frame', img: 'assets/frame6.png' },
    ];

    // Selected frame from carousel or dropdown
    const [selectedFrame, setSelectedFrame] = useState(frames[0]);

    // Handle aside button click
    const handleTabClick = (title) => {
        setActiveTab(title);
        // Reset carouselIndex or other state if needed here
    };

    return (
        <div className='bg-gray-200 h-auto w-full border-5 overflow-scroll'>
            <div className="flex-1 flex justify-between">
                {/* Aside Navigation */}
                <aside className="flex flex-col items-center max-w-28 py-5 px-5 gap-6">
                    {asideButtons.map((btn) => (
                        <div key={btn.title} className="flex items-center flex-col">
                            <button
                                className={`cursor-pointer rounded-md p-2 shadow-lg hover:shadow-sm ${activeTab === btn.title ? 'bg-[#8b72cb]' : 'bg-white'
                                    }`}
                                onClick={() => handleTabClick(btn.title)}
                            >
                                <img
                                    className="h-6 w-6"
                                    src={btn.img}
                                    alt={btn.title}
                                />
                            </button>
                            <h1
                                className={`text-sm font-semibold text-gray-600'
                                    }`}
                            >
                                {btn.title}
                            </h1>
                        </div>
                    ))}
                </aside>

                {/* Main Content Area */}
                <div className="flex flex-col flex-1">
                    {/* DropArea */}
                    <div className='flex-1 p-7'>
                        <h1 className="font-bold text-2xl text-gray-600">Frame Dimensions</h1>
                        <div className="p-2" style={{ height: `${frameHeight}px`, width: `${frameWidth}px` }}>
                            <div
                                className="DropArea relative bg-gray-800 w-full border-2 h-full flex items-center justify-center p-10"
                            >
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid h-[95%] w-[88%] bg-inherit z-30 outline"
                                >
                                    {/* {Array.from({ length: numberOfGods }).map((_, i) => (
                                        <div key={i} className="bg-white h-[${godHeight}px] w-[${godWidth}px] rounded shadow-md">
                                        </div>
                                    ))} */}
                                </div>
                                <div className="Frame absolute inset-0 z-10" >
                                    <img className='h-full w-fit object-fill' src={selectedFrame.img} alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Right Panel */}
                <div className="max-w-72 w-72 p-3 flex flex-col mt-16">
                    {/* linkComponent1 (unchanged except active tab highlighting) */}
                    <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 bg-white rounded-lg">
                        <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                            <p className="text-xs font-semibold text-gray-500">Frame</p>
                            <div className="flex items-center text-xs text-gray-700 font-bold">
                                <input
                                    type="number"
                                    className="w-6 p-1"
                                    value={frameWidthInput}
                                    onChange={(e) => setFrameWidthInput(e.target.value)}
                                    readOnly={!isEditing}
                                />
                                <span className="flex items-center mx-1">x</span>
                                <input
                                    type="number"
                                    className="w-6 p-1"
                                    value={frameHeightInput}
                                    onChange={(e) => setFrameHeightInput(e.target.value)}
                                    readOnly={!isEditing}
                                />
                                <span className="flex items-center ml-1">Inches</span>
                            </div>
                        </div>

                        <div className="flex-1 rounded-md p-1 px-2 bg-gray-100">
                            <p className="text-xs text-nowrap font-semibold text-gray-500">No. of Gods</p>
                            <input
                                type="number"
                                value={numberOfGods}
                                onChange={(e) => setNumberOfGods(parseInt(e.target.value))}
                                className="text-sm px-2 text-gray-700 max-w-8 font-bold"
                            />
                        </div>

                        {!isEditing && (
                            <button
                                className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300"
                                onClick={handleEditClick}
                                aria-label="Edit Frame Dimensions"
                            >
                                ✏️
                            </button>
                        )}

                        {isEditing && (
                            <button
                                className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300"
                                onClick={handleSaveClick}
                                aria-label="Save Frame Dimensions"
                            >
                                ✔️
                            </button>
                        )}
                    </div>
                    {activeTab === 'Frame' && (
                        <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 bg-white rounded-lg">
                            <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                                <p className="text-xs font-semibold text-gray-500">Frame Type</p>
                                <div className="flex items-center text-xs text-gray-700 font-bold">
                                    <select
                                        id="frameSelect"
                                        className="w-full p-1"
                                        value={selectedFrame?.id || ''}
                                        onChange={(e) => {
                                            const frameId = parseInt(e.target.value, 10);
                                            const frame = frames.find((f) => f.id === frameId);
                                            setSelectedFrame(frame);
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select a frame
                                        </option>
                                        {frames.map((frame) => (
                                            <option className='font-semibold' key={frame.id} value={frame.id}>
                                                {frame.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300">✏️</button>
                        </div>
                    )}
                </div>
            </div>
            {/* Frame carousel: only visible when 'Frame' tab active */}
            {activeTab === 'Frame' && (
                <div className=" bg-white w-full">
                    <div className='flex justify-between items-center py-3 px-5 w-full'>
                        <h1 className='font-bold text-2xl text-gray-700'>
                            Select your Frame Type
                        </h1>
                        <div className='flex gap-5'>
                            <button
                                onClick={() => setCarouselIndex(Math.max(carouselIndex - 1, 0))}
                                disabled={carouselIndex === 0}
                                className="h-10 w-10 shadow-blue-300 border hover:shadow-md active:shadow-lg border-[#c6d2f0] shadow-lg cursor-pointer rounded disabled:opacity-50"
                            >
                                ◀
                            </button>
                            <button
                                onClick={() =>
                                    setCarouselIndex(Math.min(carouselIndex + 1, frames.length - 3))
                                }
                                disabled={carouselIndex >= frames.length - 3}
                                className="h-10 w-10 shadow-blue-300 hover:shadow-md active:shadow-lg border border-[#c6d2f0] cursor-pointer shadow-lg rounded disabled:opacity-50"
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                    <div className="flex overflow-hidden w-full p-5 bg-gray-300">
                        <div
                            className="flex transition-transform duration-300"
                            style={{ transform: `translateX(-${carouselIndex * 10}px)` }}
                        >
                            {frames.map((frame) => (
                                <div onClick={() => setSelectedFrame(frame)} className={`cursor-pointer relative h-44 w-44 flex justify-center items-center mx-4 rounded ${selectedFrame?.id === frame.id ? 'border-indigo-600 border-3' : 'hover:border-3 hover:border-indigo-600'}`}>
                                    <img
                                        key={frame.id}
                                        src={frame.img}
                                        alt={frame.name}
                                        className='w-40 h-40'
                                    />
                                    <div className='absolute text-sm font-semibold'>{frame.name}</div>
                                    <div className={`absolute -top-3.5 -right-3.5 h-9 w-9 flex justify-center items-center rounded-full bg-indigo-600 ${selectedFrame?.id === frame.id ? '' : 'opacity-0 '}`}>
                                        <img className='h-8' src="assets/tick.png" alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'Frame' && (
                <div className="mt-2 p-3 border rounded bg-white shadow">

                    {selectedFrame && (
                        <div className="mt-3">
                            <p className="font-semibold mb-2">{selectedFrame.name} Frame Preview:</p>
                            <img
                                src={selectedFrame.img}
                                alt={selectedFrame.name}
                                className="w-full h-48 object-contain rounded border"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateFrame;
