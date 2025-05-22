import React, { useEffect, useRef, useState } from 'react';
import { LuMoveDiagonal } from "react-icons/lu";
import '../styles/animations.css';
import '../styles/fonts.css';

const CreateFrame = () => {
    // Active aside button state
    const [activeTab, setActiveTab] = useState('Dimensions');

    const frames = [
        { id: 1, name: 'Wooden Frame', img: '/assets/frame1.png' },
        { id: 2, name: 'Metal Frame', img: '/assets/frame2.png' },
        { id: 3, name: 'Golden Frame', img: '/assets/frame3.png' },
        { id: 4, name: 'Arc Frame', img: '/assets/frame4.png' },
        { id: 5, name: 'Aluminuim Frame', img: '/assets/frame5.png' },
        { id: 6, name: 'Textured Frame', img: '/assets/frame6.png' },
    ];

    const gods = [
        { id: 1, name: 'Laxmi', img: '/assets/GOD1.jpeg' },
        { id: 2, name: 'Ganesha', img: '/assets/GOD2.jpeg' },
        { id: 3, name: 'Krishna', img: '/assets/GOD3.jpeg' },
        { id: 4, name: 'Saraswati', img: '/assets/GOD4.jpeg' },
    ];

    const asideButtons = [
        { title: 'Dimensions', head: 'Frame Dimensions', icon: LuMoveDiagonal },
        { title: 'Frame', head: 'Frame Type', icon: LuMoveDiagonal },
        { title: 'Gods', head: 'Select Gods', icon: LuMoveDiagonal },
        { title: 'Accessories', head: 'Select Accessories', icon: LuMoveDiagonal },
    ];

    // Convert inches to pixels using standard 96 PPI (CSS standard)
    // Note: This is a CSS standard where 1 inch = 96 pixels
    // This ensures consistent sizing across different displays
    const inchToPx = (inch) => inch * 96;
    const pxToInch = (px) => px / 96;

    // Frame dimensions state
    const [frameHeightInches, setFrameHeightInches] = useState(20);
    const [frameWidthInches, setFrameWidthInches] = useState(10);
    const [frameWidthInput, setFrameWidthInput] = useState(frameWidthInches);
    const [frameHeightInput, setFrameHeightInput] = useState(frameHeightInches);
    const frameHeight = inchToPx(frameHeightInches);
    const frameWidth = inchToPx(frameWidthInches);
    
    // God dimensions state - 6" × 10" default size
    const defaultGodWidth = inchToPx(6);  // 6 inches = 576px (6 * 96)
    const defaultGodHeight = inchToPx(10); // 10 inches = 960px (10 * 96)
    const [godWidth, setGodWidth] = useState(defaultGodWidth);
    const [godHeight, setGodHeight] = useState(defaultGodHeight);
    const [godWidthInput, setGodWidthInput] = useState(6);  // in inches
    const [godHeightInput, setGodHeightInput] = useState(10); // in inches
    const [isEditingGodDimensions, setIsEditingGodDimensions] = useState(false);
    const [godDimensionError, setGodDimensionError] = useState('');

    // Image loading states
    const [imageLoadingStates, setImageLoadingStates] = useState({});
    const [imageErrorStates, setImageErrorStates] = useState({});

    // Gods state
    const [numberOfGods, setNumberOfGods] = useState(1);
    const [numberOfGodsInput, setNumberOfGodsInput] = useState(1);
    const [selectedGods, setSelectedGods] = useState([]);
    const [godsToRemove, setGodsToRemove] = useState([]);
    const [godsCountError, setGodsCountError] = useState('');

    // Frame editing state
    const [isEditingFrame, setIsEditingFrame] = useState(false);
    const [selectedFrameInput, setSelectedFrameInput] = useState(null);
    const [isEditingFrameDimensions, setIsEditingFrameDimensions] = useState(false);
    const [isEditingGodCount, setIsEditingGodCount] = useState(false);

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

    // Calculate available space for gods
    const calculateAvailableSpace = () => {
        const frameInnerWidth = frameWidth * 0.9; // 90% of frame width for padding
        const frameInnerHeight = frameHeight * 0.9; // 90% of frame height for padding
        const gap = 20; // Gap between gods in pixels

        // Calculate maximum width available for each god
        const availableWidth = (frameInnerWidth - (gap * (numberOfGods - 1))) / numberOfGods;

        return {
            width: availableWidth,
            height: frameInnerHeight,
            gap
        };
    };

    // Initialize god dimensions on component mount - this sets the FIRST god to 6" × 10"
    useEffect(() => {
        setGodWidth(defaultGodWidth);  // 6 inches
        setGodHeight(defaultGodHeight); // 10 inches
        setGodWidthInput(6);
        setGodHeightInput(10);
    }, []); // Empty dependency array means this runs once on mount

    // Update god dimensions when number of gods changes - this affects ADDITIONAL gods
    useEffect(() => {
        if (numberOfGods > 1) {  // Only adjust if there's more than one god
            const availableSpace = calculateAvailableSpace();
            setGodWidth(availableSpace.width);
            setGodWidthInput(Math.round(pxToInch(availableSpace.width)));
        }
    }, [numberOfGods, frameWidth]);

    // Function to add a god to the frame
    const addGodToFrame = (god) => {
        try {
            if (selectedGods.length < numberOfGods) {
                const isFirstGod = selectedGods.length === 0;
                
                // Add the god
                setSelectedGods(prev => [...prev, god]);
                
                // Set dimensions based on whether it's the first god or not
                if (isFirstGod) {
                    console.log('Adding first god with default dimensions');
                    setGodWidth(defaultGodWidth);
                    setGodWidthInput(6);
                } else {
                    console.log('Adding additional god with calculated dimensions');
                    const availableSpace = calculateAvailableSpace();
                    setGodWidth(availableSpace.width);
                    setGodWidthInput(Math.round(pxToInch(availableSpace.width)));
                }
            }
        } catch (error) {
            console.error('Error adding god:', error);
        }
    };

    // Function to remove a god from a specific slot
    const removeGodFromSlot = (index) => {
        try {
            const newSelectedGods = selectedGods.filter((_, i) => i !== index);
            setSelectedGods(newSelectedGods);

            // Reset dimensions based on remaining gods
            if (newSelectedGods.length === 1) {
                console.log('Resetting to default dimensions');
                setGodWidth(defaultGodWidth);
                setGodWidthInput(6);
            } else if (newSelectedGods.length > 1) {
                console.log('Recalculating dimensions for remaining gods');
                const availableSpace = calculateAvailableSpace();
                setGodWidth(availableSpace.width);
                setGodWidthInput(Math.round(pxToInch(availableSpace.width)));
            }
        } catch (error) {
            console.error('Error removing god:', error);
        }
    };

    // Function to confirm god removal
    const confirmGodRemoval = () => {
        const newSelectedGods = selectedGods.filter((_, index) => !godsToRemove.includes(index));
        setSelectedGods(newSelectedGods);
        setGodsToRemove([]);
    };

    // Handle aside button click
    const handleTabClick = (title) => {
        setActiveTab(title);
    };

    // Handle save button click for frame dimensions
    const handleSaveFrameDimensions = () => {
        // Update frame dimensions
        setFrameWidthInches(frameWidthInput);
        setFrameHeightInches(frameHeightInput);
        setIsEditingFrameDimensions(false);

        // Recalculate god dimensions based on new frame size
        const availableSpace = calculateAvailableSpace();
        
        if (selectedGods.length > 1) {
            // For multiple gods, adjust width based on available space
            setGodWidth(availableSpace.width);
            setGodWidthInput(Math.floor(pxToInch(availableSpace.width)));
        } else {
            // For single god, maintain default width
            setGodWidth(defaultGodWidth);
            setGodWidthInput(6);
        }

        // Always adjust height based on frame height
        setGodHeight(availableSpace.height);
        setGodHeightInput(Math.floor(pxToInch(availableSpace.height)));
    };

    // Handle save button click for number of gods
    const handleSaveNumberOfGods = () => {
        const availableSpace = calculateAvailableSpace();
        const minGodWidth = inchToPx(4); // Minimum 4 inches width per god
        const availableWidthInInches = Math.floor(pxToInch(availableSpace.width));
        
        if (availableSpace.width < minGodWidth) {
            setGodsCountError(
                `Not enough space for ${numberOfGodsInput} gods. ` +
                `Each god would get ${availableWidthInInches}" width, but needs minimum 4" width. ` +
                `Please either increase frame width or reduce number of gods.`
            );
            return;
        }

        // Clear any previous error
        setGodsCountError('');
        
        // Update number of gods
        setNumberOfGods(numberOfGodsInput);
        setIsEditingGodCount(false);

        // Adjust selected gods array if reducing number of gods
        if (numberOfGodsInput < selectedGods.length) {
            setSelectedGods(selectedGods.slice(0, numberOfGodsInput));
        }

        // Reset to default dimensions if only one god
        if (numberOfGodsInput === 1) {
            setGodWidth(defaultGodWidth);
            setGodWidthInput(6);
        } else {
            // Update width for multiple gods
            setGodWidth(availableSpace.width);
            setGodWidthInput(Math.floor(pxToInch(availableSpace.width)));
        }

        // Always adjust height based on frame height
        setGodHeight(availableSpace.height);
        setGodHeightInput(Math.floor(pxToInch(availableSpace.height)));
    };

    // Handle edit button click for frame
    const handleEditFrameClick = () => {
        setIsEditingFrame(true);
    };

    // Handle save button click for frame
    const handleSaveFrameClick = () => {
        setSelectedFrameInput(selectedFrameInput);
        setIsEditingFrame(false);
    };

    // Function to get count of a specific god in the frame
    const getGodCount = (godId) => {
        return selectedGods.filter(god => god.id === godId).length;
    };

    // Handle god dimensions save
    const handleSaveGodDimensions = () => {
        const availableSpace = calculateAvailableSpace();
        const newGodWidthPx = inchToPx(godWidthInput);
        const newGodHeightPx = inchToPx(godHeightInput);

        // Check if new dimensions exceed available space
        if (newGodHeightPx !== defaultGodHeight) {
            setGodDimensionError(`Height must be exactly 10 inches`);
            return;
        }

        if (newGodWidthPx > availableSpace.width) {
            setGodDimensionError(`Width cannot exceed ${Math.floor(pxToInch(availableSpace.width))} inches`);
            return;
        }

        // Clear any previous error
        setGodDimensionError('');
        
        // Update dimensions independently
        setGodWidth(newGodWidthPx);
        setGodHeight(defaultGodHeight); // Always maintain 10" height
        setIsEditingGodDimensions(false);
    };

    // Handle image load error
    const handleImageError = (godId) => {
        setImageErrorStates(prev => ({
            ...prev,
            [godId]: true
        }));
        setImageLoadingStates(prev => ({
            ...prev,
            [godId]: false
        }));
    };

    // Handle image load start
    const handleImageLoadStart = (godId) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [godId]: true
        }));
        setImageErrorStates(prev => ({
            ...prev,
            [godId]: false
        }));
    };

    // Handle image load success
    const handleImageLoadSuccess = (godId) => {
        setImageLoadingStates(prev => ({
            ...prev,
            [godId]: false
        }));
    };

    // Update visible counts on resize
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

    // Reset carousel indices when needed
    useEffect(() => {
        if (!scrollNeeded && carouselIndex !== 0) {
            setCarouselIndex(0);
        }
        if (!godsScrollNeeded && godsCarouselIndex !== 0) {
            setGodsCarouselIndex(0);
        }
    }, [scrollNeeded, carouselIndex, godsScrollNeeded, godsCarouselIndex]);

    return (
        <div className='bg-gray-200 h-auto w-full overflow-auto font-[var(--font-primary)]'>
            <div className="flex-1 flex justify-between">
                {/* Aside Navigation */}
                <aside className="fixed top-24 left-0 h-screen w-28 z-50 group">
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
                            <div className={`DropArea relative ${selectedFrameInput ? '' : 'bg-gray-800'} w-full h-full flex items-center justify-center p-10`}>
                                <div 
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-around gap-5 h-[90%] w-[90%] bg-gray-800 z-30"
                                    style={{ transition: 'height 0.3s, width 0.3s' }}
                                >
                                    {Array.from({ length: numberOfGods }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-center h-full"
                                            style={{ transition: 'width 0.3s' }}
                                        >
                                            {selectedGods[i] ? (
                                                <div className="relative h-full">
                                                <img
                                                    src={selectedGods[i].img}
                                                    alt={selectedGods[i].name}
                                                        style={{
                                                            width: `${godWidth}px`,
                                                            height: `${godHeight}px`,
                                                            objectFit: 'fill',
                                                            transition: 'width 0.3s, height 0.3s'
                                                        }}
                                                        onError={() => handleImageError(selectedGods[i].id)}
                                                        onLoadStart={() => handleImageLoadStart(selectedGods[i].id)}
                                                        onLoad={() => handleImageLoadSuccess(selectedGods[i].id)}
                                                    />
                                                    <div 
                                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors duration-200"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeGodFromSlot(i);
                                                        }}
                                                    >
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="h-5 w-5 text-white" 
                                                            viewBox="0 0 20 20" 
                                                            fill="currentColor"
                                                        >
                                                            <path 
                                                                fillRule="evenodd" 
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                                                                clipRule="evenodd" 
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div 
                                                    className="flex flex-col items-center justify-center text-center bg-white h-full"
                                                    style={{
                                                        width: `${godWidth}px`,
                                                        height: `${godHeight}px`,
                                                        transition: 'width 0.3s, height 0.3s'
                                                    }}
                                                >
                                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="h-8 w-8 text-gray-400" 
                                                            fill="none" 
                                                            viewBox="0 0 24 24" 
                                                            stroke="currentColor"
                                                        >
                                                            <path 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round" 
                                                                strokeWidth={2} 
                                                                d="M12 4v16m8-8H4" 
                                                            />
                                                        </svg>
                                                    </div>
                                                    <p className="text-sm text-gray-400 font-medium mt-2">Drop God Image Here</p>
                                                    <p className="text-xs text-gray-500 mt-1">or click to select</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="Frame absolute inset-0 z-10">
                                    <img className='h-full w-full object-fill' src={selectedFrameInput?.img} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Panel */}
                <div className="max-w-72 w-72 p-3 flex flex-col fixed top-24 z-50 right-10">
                    <div className="flex flex-col gap-2">
                        <div className="frameGodInputContainer flex flex-col bg-white rounded-lg shadow-md p-4">
                            <div className="flex flex-col gap-4">
                                {/* Frame Dimensions Input */}
                                <div className="w-full">
                                    <div className="rounded-lg p-3 bg-gray-100">
                                        <div className="flex justify-between items-center">
                                            <div>
                            <p className="text-xs font-semibold text-gray-500">Frame</p>
                            <div className="flex items-center text-xs text-gray-700 font-bold">
                                <input
                                    type="number"
                                                        className={`w-12 p-1 rounded transition-all duration-200 ${isEditingFrameDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                    value={frameWidthInput}
                                    onChange={(e) => setFrameWidthInput(e.target.value)}
                                                        readOnly={!isEditingFrameDimensions}
                                                        min="1"
                                />
                                                    <span className="flex items-center mx-1">×</span>
                                <input
                                    type="number"
                                                        className={`w-12 p-1 rounded transition-all duration-200 ${isEditingFrameDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                    value={frameHeightInput}
                                    onChange={(e) => setFrameHeightInput(e.target.value)}
                                                        readOnly={!isEditingFrameDimensions}
                                                        min="1"
                                                    />
                                                    <span className="flex items-center ml-1">in</span>
                                                </div>
                                            </div>
                                            {!isEditingFrameDimensions && !isEditingGodCount && !isEditingFrame && (
                                                <button
                                                    className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                                    onClick={() => setIsEditingFrameDimensions(true)}
                                                    aria-label="Edit Frame Dimensions"
                                                >
                                                    ✏️
                                                </button>
                                            )}
                                            {isEditingFrameDimensions && (
                                                <button
                                                    className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                                    onClick={handleSaveFrameDimensions}
                                                    aria-label="Save Frame Dimensions"
                                                >
                                                    ✔️
                                                </button>
                                            )}
                                        </div>
                            </div>
                        </div>

                                {/* Number of Gods Input */}
                                <div className="w-full">
                                    <div className="rounded-lg p-3 bg-gray-100">
                                        <div className="flex justify-between items-center">
                                            <div>
                            <p className="text-xs text-nowrap font-semibold text-gray-500">No. of Gods</p>
                                                <div className="flex items-center">
                            <input
                                type="number"
                                value={numberOfGodsInput}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            if (value > 0) {
                                                                setNumberOfGodsInput(value);
                                                                setGodsCountError('');
                                                            }
                                                        }}
                                                        readOnly={!isEditingGodCount}
                                                        min="1"
                                                        className={`w-12 p-1 rounded text-sm text-gray-700 font-bold transition-all duration-200 ${
                                                            isEditingGodCount ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'
                                                        } ${godsCountError ? 'border-red-500' : ''}`}
                            />
                        </div>
                                            </div>
                                            {!isEditingFrameDimensions && !isEditingGodCount && !isEditingFrame && (
                            <button
                                                    className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                                    onClick={() => setIsEditingGodCount(true)}
                                                    aria-label="Edit Number of Gods"
                            >
                                ✏️
                            </button>
                        )}
                                            {isEditingGodCount && (
                            <button
                                                    className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                                    onClick={handleSaveNumberOfGods}
                                                    aria-label="Save Number of Gods"
                            >
                                ✔️
                            </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {godsCountError && (
                                <div className="mt-2">
                                    <p className="text-xs text-red-500">
                                        {godsCountError}
                                    </p>
                                </div>
                        )}
                    </div>

                    {/* Frame Type - Only visible when Frame tab is active or frame is selected */}
                        {(activeTab === 'Frame' || selectedFrameInput) && (
                        <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 rounded-lg shadow-md bg-white">
                            <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                                <p className="text-xs font-semibold text-gray-500">Frame Type</p>
                                <div className="flex items-center text-xs text-gray-700 font-bold">
                                    <select
                                        id="frameSelect"
                                            className={`w-full p-1 rounded text-sm transition-all duration-200 ${isEditingFrame ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
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
                                        className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                    onClick={handleEditFrameClick}
                                    aria-label="Edit Frame Type"
                                >
                                    ✏️
                                </button>
                            )}
                            {isEditingFrame && (
                                <button
                                        className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
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
                            <div className="flex flex-col bg-white rounded-lg shadow-md">
                                <div className="flex w-full justify-between gap-2 items-center p-2">
                            <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                                <p className="text-xs font-semibold text-gray-500">God Dimensions</p>
                                <div className="flex items-center text-xs text-gray-700 font-bold">
                                    <input
                                        type="number"
                                                className={`w-12 p-1 rounded transition-all duration-200 ${isEditingGodDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                        value={godWidthInput}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (value > 0) {
                                                        setGodWidthInput(value);
                                                    }
                                                }}
                                        readOnly={!isEditingGodDimensions}
                                                min="1"
                                    />
                                            <span className="flex items-center mx-1">×</span>
                                    <input
                                        type="number"
                                                className={`w-12 p-1 rounded transition-all duration-200 ${isEditingGodDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                        value={godHeightInput}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value);
                                                    if (value > 0) {
                                                        setGodHeightInput(value);
                                                    }
                                                }}
                                        readOnly={!isEditingGodDimensions}
                                                min="1"
                                    />
                                            <span className="flex items-center ml-1">in</span>
                                </div>
                            </div>
                            {!isEditingGodDimensions && (
                                <button
                                            className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                    onClick={() => setIsEditingGodDimensions(true)}
                                    aria-label="Edit God Dimensions"
                                >
                                    ✏️
                                </button>
                            )}
                            {isEditingGodDimensions && (
                                <button
                                            className="cursor-pointer bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300"
                                    onClick={handleSaveGodDimensions}
                                    aria-label="Save God Dimensions"
                                >
                                    ✔️
                                </button>
                                    )}
                                </div>
                                {godDimensionError && (
                                    <div className="px-2 pb-2">
                                        <p className="text-xs text-red-500 mt-1">
                                            {godDimensionError}
                                        </p>
                                    </div>
                            )}
                        </div>
                    )}
                    </div>
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
                                        setSelectedFrameInput(frame);
                                    }}
                                    className={`cursor-pointer relative h-44 w-44 flex justify-center items-center mx-4 rounded 
                                ${selectedFrameInput?.id === frame.id ? 'border-indigo-600 border-3' : 'hover:border-3 hover:border-indigo-600'}`}
                                >
                                    <img
                                        src={frame.img}
                                        alt={frame.name}
                                        className='w-40 h-40'
                                    />
                                    <div className='absolute text-sm font-semibold'>{frame.name}</div>
                                    <div className={`absolute -top-3.5 -right-3.5 h-9 w-9 flex justify-center items-center rounded-full bg-indigo-600 ${selectedFrameInput?.id === frame.id ? '' : 'opacity-0 '}`}>
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
                                                    removeGodFromSlot(gods.findIndex(g => g.id === god.id));
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
