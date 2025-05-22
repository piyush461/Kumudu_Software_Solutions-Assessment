import React, { useEffect, useRef, useState } from 'react';
import { LuMoveDiagonal } from "react-icons/lu";

const CreateFrame = () => {
    // Active aside button state
    const [activeTab, setActiveTab] = useState('Dimensions');

    const frames = [
        { id: 1, name: 'Wooden Frame', img: 'assets/frame1.png' },
        { id: 2, name: 'Metal Frame', img: 'assets/frame2.png' },
        { id: 3, name: 'Golden Frame', img: 'assets/frame3.png' },
        { id: 4, name: 'Arc Frame', img: 'assets/frame4.png' },
        { id: 5, name: 'Aluminuim Frame', img: 'assets/frame5.png' },
        { id: 6, name: 'Textured Frame', img: 'assets/frame6.png' },
    ];


    // Default dimensions in inches
    const [frameHeightInches, setFrameHeightInches] = useState(20);
    const [frameWidthInches, setFrameWidthInches] = useState(10);

    // Convert inches to pixels
    const inchToPx = (inch) => inch * 96;

    const frameHeight = inchToPx(frameHeightInches);
    const frameWidth = inchToPx(frameWidthInches);
    const [numberOfGods, setNumberOfGods] = useState(1);
    const [numberOfGodsInput, setNumberOfGodsInput] = useState(1);
    const [isEditingGods, setIsEditingGods] = useState(false);
    const [godHeight, setGodHeight] = useState(inchToPx(10)); // default 10 inches
    const [godWidth, setGodWidth] = useState(inchToPx(6));   // default 6 inches
    const lampWidth = inchToPx(2);  // default 2 inches (192px)


    const [frameWidthDisplay, setFrameWidthDisplay] = useState(10);
    const [frameHeightDisplay, setFrameHeightDisplay] = useState(20);

    // Temporary input values while editing
    const [frameWidthInput, setFrameWidthInput] = useState(frameWidthDisplay);
    const [frameHeightInput, setFrameHeightInput] = useState(frameHeightDisplay);

    // Edit mode flag
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingFrame, setIsEditingFrame] = useState(false);

    // Selected frame from carousel or dropdown
    const [selectedFrame, setSelectedFrame] = useState(null);
    const [selectedFrameInput, setSelectedFrameInput] = useState(null);

    // Selected gods from carousel
    const [selectedGods, setSelectedGods] = useState([]);
    const [selectedGodsInput, setSelectedGodsInput] = useState([]);

    // God dimensions state
    const [godHeightInput, setGodHeightInput] = useState(10);
    const [godWidthInput, setGodWidthInput] = useState(6);
    const [isEditingGodDimensions, setIsEditingGodDimensions] = useState(false);
    const [godDimensionError, setGodDimensionError] = useState('');

    // State for tracking gods to be removed
    const [godsToRemove, setGodsToRemove] = useState([]);

    // Function to get count of a specific god in the frame
    const getGodCount = (godId) => {
        return selectedGods.filter(god => god.id === godId).length;
    };

    // Function to add a god to the next empty slot
    const addGodToFrame = (god) => {
        if (selectedGods.length < numberOfGods) {
            setSelectedGods([...selectedGods, god]);
        }
    };

    // Function to remove a god from a specific position
    const removeGodFromFrame = (index) => {
        const newSelectedGods = [...selectedGods];
        newSelectedGods.splice(index, 1);
        setSelectedGods(newSelectedGods);
    };

    // Handle edit button click
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle save button click
    const handleSaveClick = () => {
        // Update displayed values only on save
        setFrameWidthInches(frameWidthInput);
        setFrameHeightInches(frameHeightInput);
        setNumberOfGods(numberOfGodsInput);
        setIsEditing(false);
    };

    // Handle edit button click for frame
    const handleEditFrameClick = () => {
        setIsEditingFrame(true);
    };

    // Handle save button click for frame
    const handleSaveFrameClick = () => {
        setSelectedFrame(selectedFrameInput);
        setIsEditingFrame(false);
    };

    // Handle edit button click for gods
    const handleEditGodsClick = () => {
        setIsEditingGods(true);
    };

    // Handle save button click for gods
    const handleSaveGodsClick = () => {
        setSelectedGods(selectedGodsInput);
        setIsEditingGods(false);
    };

    // Calculate available space for gods
    const calculateAvailableSpace = () => {
        const frameInnerWidth = frameWidth * 0.9; // 90% of frame width
        const frameInnerHeight = frameHeight * 0.92; // 92% of frame height
        const padding = 40; // 20px padding on each side
        const gap = 40; // 20px gap between gods

        const availableWidth = (frameInnerWidth - (gap * (numberOfGods - 1))) / numberOfGods;
        const availableHeight = frameInnerHeight;

        return {
            width: availableWidth,
            height: availableHeight
        };
    };

    // Handle god dimensions save
    const handleSaveGodDimensions = () => {
        const availableSpace = calculateAvailableSpace();
        const godHeightPx = inchToPx(godHeightInput);
        const godWidthPx = inchToPx(godWidthInput);

        if (godHeightPx > availableSpace.height || godWidthPx > availableSpace.width) {
            setGodDimensionError(`God dimensions exceed available space. Maximum size: ${Math.floor(availableSpace.width / 96)}" x ${Math.floor(availableSpace.height / 96)}"`);
            return;
        }

        setGodHeight(godHeightPx);
        setGodWidth(godWidthPx);
        setGodDimensionError('');
        setIsEditingGodDimensions(false);
    };

    // Function to toggle god removal
    const toggleGodRemoval = (index) => {
        if (godsToRemove.includes(index)) {
            setGodsToRemove(godsToRemove.filter(i => i !== index));
        } else {
            setGodsToRemove([...godsToRemove, index]);
        }
    };

    // Function to confirm god removal
    const confirmGodRemoval = () => {
        const newSelectedGods = selectedGods.filter((_, index) => !godsToRemove.includes(index));
        setSelectedGods(newSelectedGods);
        setGodsToRemove([]);
    };

    // Function to remove the latest instance of a specific god
    const removeLatestGodInstance = (godId) => {
        const lastIndex = [...selectedGods].reverse().findIndex(god => god.id === godId);
        if (lastIndex !== -1) {
            const actualIndex = selectedGods.length - 1 - lastIndex;
            const newSelectedGods = [...selectedGods];
            newSelectedGods.splice(actualIndex, 1);
            setSelectedGods(newSelectedGods);
        }
    };

    const asideButtons = [
        { title: 'Dimensions', head: 'Frame Dimensions', icon: LuMoveDiagonal },
        { title: 'Frame', head: 'Frame Type', icon: LuMoveDiagonal },
        { title: 'Gods', head: 'Select Gods', icon: LuMoveDiagonal },
        { title: 'Accessories', head: 'Select Accessories', icon: LuMoveDiagonal },
    ];

    const gods = [
        { id: 1, name: 'Laxmi', img: 'assets/GOD1.jpeg' },
        { id: 2, name: 'Ganesha', img: 'assets/GOD2.jpeg' },
        { id: 3, name: 'Krishna', img: 'assets/GOD3.jpeg' },
        { id: 4, name: 'Saraswati', img: 'assets/GOD4.jpeg' },
    ];

    // Initialize selectedGods with first god after gods array is defined
    useEffect(() => {
        setSelectedGods([gods[0]]);
        setSelectedGodsInput([gods[0]]);
    }, []);

    // Carousel scroll index
    const containerRef = useRef(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [visibleFrameCount, setVisibleFrameCount] = useState(1);
    const scrollNeeded = frames.length > visibleFrameCount;
    const maxIndex = scrollNeeded ? frames.length - visibleFrameCount : 0;
    const FRAME_WIDTH = 200; // Approx width (w-44 + mx-4)

    // Carousel scroll index for gods
    const godsContainerRef = useRef(null);
    const [godsCarouselIndex, setGodsCarouselIndex] = useState(0);
    const [visibleGodsCount, setVisibleGodsCount] = useState(1);
    const godsScrollNeeded = gods.length > visibleGodsCount;
    const maxGodsIndex = godsScrollNeeded ? gods.length - visibleGodsCount : 0;

    useEffect(() => {
        const updateVisibleCount = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const count = Math.floor(containerWidth / FRAME_WIDTH);
                setVisibleFrameCount(count);
            }
            if (godsContainerRef.current) {
                const containerWidth = godsContainerRef.current.offsetWidth;
                const count = Math.floor(containerWidth / FRAME_WIDTH);
                setVisibleGodsCount(count);
            }
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    useEffect(() => {
        if (!scrollNeeded && carouselIndex !== 0) {
            setCarouselIndex(0);
        }
        if (!godsScrollNeeded && godsCarouselIndex !== 0) {
            setGodsCarouselIndex(0);
        }
    }, [scrollNeeded, carouselIndex, godsScrollNeeded, godsCarouselIndex]);

    // Handle aside button click
    const handleTabClick = (title) => {
        setActiveTab(title);
    };

    return (
        <div className='bg-gray-200 h-auto w-full overflow-auto'>
            <div className="flex-1 flex justify-between">
                {/* Aside Navigation */}
                <aside className="fixed top-24 left-0 h-screen w-28 z-50 group">
                    <style>
                        {`
                            @keyframes slideOut {
                                0% { 
                                    transform: translateX(0);
                                    opacity: 1;
                                }
                                    70% { 
                                    transform: translateX(20px);
                                    opacity: 0;
                                }
                                100% { 
                                    transform: translateX(24px);
                                    opacity: 0;
                                }
                            }
                            .slide-animation {
                                animation: slideOut 2s infinite;
                            }
                        `}
                    </style>
                    <div className='absolute left-0 top-28 w-8 h-28 rounded-r-xl bg-black animate-pulse flex items-center justify-center slide-animation'>
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
                    </div>
                    <div className='flex flex-col items-center gap-6 bg-white py-5 px-5 transform -translate-x-[150%] group-hover:translate-x-0 transition-transform duration-300 rounded-r-xl overflow-hidden bg-blue-300'>
                        {asideButtons.map((btn) => (
                            <div key={btn.title} className="flex items-center flex-col">
                                <button
                                    className={`cursor-pointer rounded-md p-2 group shadow-lg hover:shadow-sm hover:bg-[#8b72cb] transition-all duration-300 ${activeTab === btn.title ? 'bg-[#8b72cb]' : 'bg-white'}`}
                                    onClick={() => handleTabClick(btn.title)}
                                >
                                    <btn.icon
                                        style={{ color: activeTab === btn.title ? 'white' : 'black' }}
                                        className="transition-colors duration-300 group-hover:text-white"
                                    />
                                </button>
                                <h1 className="text-sm font-semibold text-gray-600">
                                    {btn.title}
                                </h1>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex flex-col flex-1">
                    {/* DropArea */}
                    <div className='flex-1 p-7'>
                        {asideButtons.map((btn) => activeTab == btn.title ? (<h1 key={btn.title} className="font-bold ml-28 text-2xl my-3 text-gray-600">{btn.head}</h1>) : '')}
                        <div className="p-2" style={{ height: `${frameHeight}px`, width: `${frameWidth}px` }}>
                            <div
                                className={`DropArea relative ${selectedFrame ? '' : 'bg-gray-800'} w-full h-full flex items-center justify-center p-10`}
                            >
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex item center justify-around gap-10 shrink-0 h-[92%] w-[90%] bg-gray-800 z-30 p-10"
                                >
                                    {Array.from({ length: numberOfGods }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="bg-white shrink-0 flex-1 flex-nowrap outline h-full w-full relative flex items-center justify-center"
                                            style={{
                                                maxWidth: `${calculateAvailableSpace().width}px`,
                                                maxHeight: `${calculateAvailableSpace().height}px`
                                            }}
                                        >
                                            {selectedGods[i] && (
                                                <img
                                                    src={selectedGods[i].img}
                                                    alt={selectedGods[i].name}
                                                    className="object-contain"
                                                    style={{
                                                        maxWidth: `${godWidth}px`,
                                                        maxHeight: `${godHeight}px`
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="Frame absolute inset-0 z-10" >
                                    <img className='h-full w-full object-fill' src={selectedFrame?.img} alt="" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* Right Panel */}
                <div className="max-w-72 w-72 p-3 flex flex-col fixed top-24 z-50 right-10">
                    {/* Frame Dimensions - Always Visible */}
                    <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 rounded-lg shadow-md bg-white">
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
                                value={numberOfGodsInput}
                                onChange={(e) => setNumberOfGodsInput(parseInt(e.target.value))}
                                readOnly={!isEditing}
                                className="text-sm px-2 text-gray-700 max-w-8 font-bold"
                            />
                        </div>

                        {!isEditing && !isEditingFrame && (
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

                    {/* Frame Type - Only visible when Frame tab is active or frame is selected */}
                    {(activeTab === 'Frame' || selectedFrame) && (
                        <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 rounded-lg shadow-md bg-white">
                            <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                                <p className="text-xs font-semibold text-gray-500">Frame Type</p>
                                <div className="flex items-center text-xs text-gray-700 font-bold">
                                    <select
                                        id="frameSelect"
                                        className="w-full p-1"
                                        value={selectedFrameInput?.id || ''}
                                        onChange={(e) => {
                                            const frameId = parseInt(e.target.value, 10);
                                            const frame = frames.find((f) => f.id === frameId);
                                            setSelectedFrameInput(frame);
                                        }}
                                        disabled={!isEditingFrame}
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
                            {!isEditing && !isEditingFrame && (
                                <button
                                    className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300"
                                    onClick={handleEditFrameClick}
                                    aria-label="Edit Frame Type"
                                >
                                    ✏️
                                </button>
                            )}
                            {isEditingFrame && (
                                <button
                                    className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300"
                                    onClick={handleSaveFrameClick}
                                    aria-label="Save Frame Type"
                                >
                                    ✔️
                                </button>
                            )}
                        </div>
                    )}

                    {/* God Dimensions - Only visible when Gods tab is active */}
                    {activeTab === 'Gods' && (
                        <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 rounded-lg shadow-md bg-white">
                            <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                                <p className="text-xs font-semibold text-gray-500">God Dimensions</p>
                                <div className="flex items-center text-xs text-gray-700 font-bold">
                                    <input
                                        type="number"
                                        className="w-6 p-1"
                                        value={godWidthInput}
                                        onChange={(e) => setGodWidthInput(parseInt(e.target.value))}
                                        readOnly={!isEditingGodDimensions}
                                    />
                                    <span className="flex items-center mx-1">x</span>
                                    <input
                                        type="number"
                                        className="w-6 p-1"
                                        value={godHeightInput}
                                        onChange={(e) => setGodHeightInput(parseInt(e.target.value))}
                                        readOnly={!isEditingGodDimensions}
                                    />
                                    <span className="flex items-center ml-1">Inches</span>
                                </div>
                                {godDimensionError && (
                                    <p className="text-xs text-red-500 mt-1">{godDimensionError}</p>
                                )}
                            </div>
                            {!isEditingGodDimensions && (
                                <button
                                    className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300"
                                    onClick={() => setIsEditingGodDimensions(true)}
                                    aria-label="Edit God Dimensions"
                                >
                                    ✏️
                                </button>
                            )}
                            {isEditingGodDimensions && (
                                <button
                                    className="cursor-pointer hover:drop-shadow-md hover:drop-shadow-amber-300"
                                    onClick={handleSaveGodDimensions}
                                    aria-label="Save God Dimensions"
                                >
                                    ✔️
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* Frame carousel: only visible when 'Frame' tab active */}
            {activeTab === 'Frame' && (
                <div className="bg-white w-full">
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
                                onClick={() => setCarouselIndex(Math.min(carouselIndex + 1, maxIndex))}
                                disabled={carouselIndex >= maxIndex}
                                className="h-10 w-10 shadow-blue-300 hover:shadow-md active:shadow-lg border border-[#c6d2f0] cursor-pointer shadow-lg rounded disabled:opacity-50"
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                    <div
                        ref={containerRef}
                        className="overflow-hidden w-full"
                    >
                        <div
                            className="flex transition-transform duration-300 py-5"
                            style={{
                                transform: `translateX(-${carouselIndex * FRAME_WIDTH}px)`
                            }}
                        >
                            {frames.map((frame) => (
                                <div
                                    key={frame.id}
                                    onClick={() => {
                                        setSelectedFrame(frame);
                                        setSelectedFrameInput(frame);
                                    }}
                                    className={`cursor-pointer relative h-44 w-44 flex justify-center items-center mx-4 rounded 
                                ${selectedFrame?.id === frame.id ? 'border-indigo-600 border-3' : 'hover:border-3 hover:border-indigo-600'}`}
                                >
                                    <img
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

            {/* Gods carousel: only visible when 'Gods' tab active */}
            {activeTab === 'Gods' && (
                <div className="bg-white w-full pl-28">
                    <div className='flex justify-between items-center py-3 px-5 w-full'>
                        <h1 className='font-bold text-2xl text-gray-700'>
                            Select your Gods
                        </h1>
                        <div className='flex gap-5'>
                            <button
                                onClick={() => setGodsCarouselIndex(Math.max(godsCarouselIndex - 1, 0))}
                                disabled={godsCarouselIndex === 0}
                                className="h-10 w-10 shadow-blue-300 border hover:shadow-md active:shadow-lg border-[#c6d2f0] shadow-lg cursor-pointer rounded disabled:opacity-50"
                            >
                                ◀
                            </button>
                            <button
                                onClick={() => setGodsCarouselIndex(Math.min(godsCarouselIndex + 1, maxGodsIndex))}
                                disabled={godsCarouselIndex >= maxGodsIndex}
                                className="h-10 w-10 shadow-blue-300 hover:shadow-md active:shadow-lg border border-[#c6d2f0] cursor-pointer shadow-lg rounded disabled:opacity-50"
                            >
                                ▶
                            </button>
                        </div>
                    </div>
                    <div
                        ref={godsContainerRef}
                        className="overflow-hidden w-full"
                    >
                        <div
                            className="flex transition-transform duration-300 py-5"
                            style={{
                                transform: `translateX(-${godsCarouselIndex * FRAME_WIDTH}px)`
                            }}
                        >
                            {gods.map((god) => (
                                <div
                                    key={god.id}
                                    className={`cursor-pointer relative h-44 w-44 flex justify-center items-center mx-4 rounded 
                                ${getGodCount(god.id) > 0 ? 'border-indigo-600 border-3' : 'hover:border-3 hover:border-indigo-600'}`}
                                >
                                    <img
                                        src={god.img}
                                        alt={god.name}
                                        className='w-40 h-40'
                                        onClick={() => addGodToFrame(god)}
                                    />
                                    <div className='absolute bottom-8 text-sm bg-white/50 w-full text-center font-semibold'>{god.name}</div>
                                    {getGodCount(god.id) > 0 && (
                                        <>
                                            <div className="absolute -top-3.5 -right-3.5 h-9 w-9 flex justify-center items-center rounded-full bg-indigo-600">
                                                <span className="text-white font-bold">{getGodCount(god.id)}</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeLatestGodInstance(god.id);
                                                }}
                                                className="absolute -top-3.5 -left-3.5 h-9 w-9 flex justify-center items-center rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                                            >
                                                <span className="text-white text-xl font-bold">−</span>
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Floating confirm button */}
            {godsToRemove.length > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={confirmGodRemoval}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-200"
                    >
                        <span>Remove {godsToRemove.length} {godsToRemove.length === 1 ? 'God' : 'Gods'}</span>
                        <span className="text-xl">✓</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateFrame;
