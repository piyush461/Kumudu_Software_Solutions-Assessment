import React, { useEffect, useRef, useState } from 'react';
import { BsAspectRatio } from "react-icons/bs";
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineAccessibility } from "react-icons/md";
import { TbRuler2 } from "react-icons/tb";
import '../styles/animations.css';
import '../styles/fonts.css';

const CreateFrame = () => {
    // Active aside button state
    const [activeTab, setActiveTab] = useState('Dimensions');

    // Add tooltip states
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');
    const tooltipTimeoutRef = useRef(null);

    // Function to show tooltip
    const showTooltipMessage = (message) => {
        setTooltipMessage(message);
        setShowTooltip(true);
        
        // Clear any existing timeout
        if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
        }
        
        // Hide tooltip after 3 seconds
        tooltipTimeoutRef.current = setTimeout(() => {
            setShowTooltip(false);
        }, 3000);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (tooltipTimeoutRef.current) {
                clearTimeout(tooltipTimeoutRef.current);
            }
        };
    }, []);

    const frames = [
        { id: 1, name: 'Wooden Frame', img: '/assets/frame1.png' },
        { id: 2, name: 'Metal Frame', img: '/assets/frame2.png' },
        { id: 3, name: 'Golden Frame', img: '/assets/frame3.png' },
        { id: 4, name: 'Aluminium Frame', img: '/assets/frame5.png' },
        { id: 5, name: 'Textured Frame', img: '/assets/frame6.png' },
    ];

    const gods = [
        { id: 1, name: 'Laxmi', img: '/assets/GOD1.jpeg' },
        { id: 2, name: 'Ganesha', img: '/assets/GOD2.jpeg' },
        { id: 3, name: 'Krishna', img: '/assets/GOD3.jpeg' },
        { id: 4, name: 'Saraswati', img: '/assets/GOD4.jpeg' },
    ];

    const asideButtons = [
        { title: 'Dimensions', head: 'Frame Dimensions', icon: TbRuler2 },
        { title: 'Frame', head: 'Frame Type', icon: BsAspectRatio },
        { title: 'Gods', head: 'Select Gods', icon: IoImagesOutline },
        { title: 'Accessories', head: 'Select Accessories', icon: MdOutlineAccessibility },
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

    // Track initial render
    const [isInitialRender, setIsInitialRender] = useState(true);

    // God dimensions state
    const [godWidthInput, setGodWidthInput] = useState(6);  // in inches
    const [godHeightInput, setGodHeightInput] = useState(10); // in inches
    const [isEditingGodDimensions, setIsEditingGodDimensions] = useState(false);
    const [godDimensionError, setGodDimensionError] = useState('');

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

    // Available dimensions for dropdowns
    const availableWidths = Array.from({length: 30}, (_, i) => i + 1);  // 1 to 30 inches
    const availableHeights = Array.from({length: 40}, (_, i) => i + 1); // 1 to 40 inches

    // Accessories state
    const [activeAccessoryTab, setActiveAccessoryTab] = useState('corners'); // 'corners' or 'lamps'

    const corners = [
        { id: 1, name: 'Corner 1', img: '/assets/corner1.png' },
    ];

    const lamps = [
        { id: 1, name: 'Lamp 1', img: '/assets/Lamp1.png' },
        { id: 2, name: 'Lamp 2', img: '/assets/Lamp2.png' },
        { id: 3, name: 'Lamp 3', img: '/assets/Lamp3.png' },
    ];

    // Remove all selectedCorners state and related functions
    const [selectedCorner, setSelectedCorner] = useState(null);

    // Simplified corner click handler
    const handleCornerClick = (corner) => {
        setSelectedCorner(corner);
    };

    // Add state for selected lamp
    const [selectedLamp, setSelectedLamp] = useState(null);

    // Simplified lamp click handler
    const handleLampClick = (lamp) => {
        setSelectedLamp(lamp);
    };

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

    // Calculate maximum possible gods based on frame width
    const calculateMaxGods = () => {
        const frameInnerWidth = frameWidth * 0.9; // 90% of frame width for padding
        const gap = 20; // Gap between gods in pixels
        const minWidth = inchToPx(1); // Minimum 1 inch width per god

        // Calculate max gods possible with minimum 1 inch width each
        let maxGods = 1;
        while (maxGods <= 10) { // Cap at 10 gods
            const availableWidth = (frameInnerWidth - (gap * (maxGods - 1))) / maxGods;
            if (availableWidth < minWidth) break;
            maxGods++;
        }
        return maxGods - 1; // Subtract 1 since we broke the loop when it became invalid
    };

    // Calculate maximum available dimensions for gods
    const calculateMaxGodDimensions = () => {
        const space = calculateAvailableSpace();
        return {
            maxWidth: Math.floor(pxToInch(space.width)),
            maxHeight: Math.floor(pxToInch(space.height))
        };
    };

    // Generate available dimensions based on space
    const getAvailableGodDimensions = () => {
        const { maxWidth, maxHeight } = calculateMaxGodDimensions();
        return {
            widths: Array.from({ length: maxWidth }, (_, i) => i + 1),  // 1 to maxWidth inches
            heights: Array.from({ length: maxHeight }, (_, i) => i + 1)  // 1 to maxHeight inches
        };
    };

    // Function to handle image load and adjust dimensions
    const handleImageLoad = (event, godId) => {
        const img = event.target;
        const availableSpace = calculateAvailableSpace();

        if (isInitialRender) {
            // On initial render, use default dimensions (6" × 10")
            setIsInitialRender(false);
            return;
        }

        // For all other cases, calculate dimensions based on available space
        const containerWidth = availableSpace.width;
        const containerHeight = availableSpace.height;

        const imgAspectRatio = img.naturalWidth / img.naturalHeight;
        const containerAspectRatio = containerWidth / containerHeight;

        let newWidth, newHeight;

        if (imgAspectRatio > containerAspectRatio) {
            // Image is wider than container (relative to height)
            newWidth = containerWidth;
            newHeight = containerWidth / imgAspectRatio;
        } else {
            // Image is taller than container (relative to width)
            newHeight = containerHeight;
            newWidth = containerHeight * imgAspectRatio;
        }

        // Update state with new dimensions (in inches)
        setGodWidthInput(Math.round(pxToInch(newWidth)));
        setGodHeightInput(Math.round(pxToInch(newHeight)));

        handleImageLoadSuccess(godId);
    };

    // Function to add a god to the frame
    const addGodToFrame = (god) => {
        try {
            // Find the first empty slot (null or undefined)
            const emptyIndex = selectedGods.findIndex(g => !g);
            
            if (emptyIndex !== -1) {
                // If there's an empty slot, fill it
                const newSelectedGods = [...selectedGods];
                newSelectedGods[emptyIndex] = god;
                setSelectedGods(newSelectedGods);
            } else if (selectedGods.length < numberOfGods) {
                // If no empty slots but still space, add to end
                setSelectedGods(prev => [...prev, god]);
            }

            if (!isInitialRender) {
                const availableSpace = calculateAvailableSpace();
                setGodWidthInput(Math.round(pxToInch(availableSpace.width)));
                setGodHeightInput(Math.round(pxToInch(availableSpace.height)));
            }
        } catch (error) {
            console.error('Error adding god:', error);
        }
    };

    // Function to remove a god from a specific slot
    const removeGodFromSlot = (index) => {
        try {
        const newSelectedGods = [...selectedGods];
            newSelectedGods[index] = null;
            
            // Remove any trailing nulls
            while (newSelectedGods.length > 0 && !newSelectedGods[newSelectedGods.length - 1]) {
                newSelectedGods.pop();
            }
            
        setSelectedGods(newSelectedGods);

            if (!isInitialRender && newSelectedGods.some(god => god)) {
                const availableSpace = calculateAvailableSpace();
                setGodWidthInput(Math.round(pxToInch(availableSpace.width)));
                setGodHeightInput(Math.round(pxToInch(availableSpace.height)));
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

    // Handle aside button click with tooltip
    const handleTabClick = (title) => {
        setActiveTab(title);
        if (title === 'Gods') {
            showTooltipMessage('Scroll down to view and select gods');
        } else if (title === 'Accessories') {
            showTooltipMessage('Scroll down to view and select accessories');
        }
    };

    // Handle save button click for frame dimensions
    const handleSaveFrameDimensions = () => {
        // Update frame dimensions
        setFrameWidthInches(frameWidthInput);
        setFrameHeightInches(frameHeightInput);
        setIsEditingFrameDimensions(false);

        // Check if current number of gods is still possible with new frame size
        const maxPossibleGods = calculateMaxGods();
        if (numberOfGods > maxPossibleGods) {
            // Update number of gods to maximum possible
            setNumberOfGods(maxPossibleGods);
            // Remove excess gods
            setSelectedGods(prev => prev.slice(0, maxPossibleGods));
        }

        if (!isInitialRender) {
            // Recalculate god dimensions based on new frame size
            const availableSpace = calculateAvailableSpace();
            const availableWidthPerGod = availableSpace.width;
            setGodWidthInput(Math.floor(pxToInch(availableWidthPerGod)));
            setGodHeightInput(Math.floor(pxToInch(availableSpace.height)));
        }
    };

    // Handle save button click for number of gods
    const handleSaveNumberOfGods = () => {
        // Calculate available width per god (in inches)
        const availableSpace = calculateAvailableSpace();
        const widthPerGod = pxToInch(availableSpace.width);

        // Check if each god has at least 1 inch width
        if (widthPerGod < 1) {
            setGodsCountError(`Not enough width for ${numberOfGodsInput} gods. Please increase frame width.`);
            return;
        }

        // Clear any previous error
        setGodsCountError('');
        
        // Update number of gods
        setNumberOfGods(numberOfGodsInput);
        
        // If reducing number of gods, remove excess gods from the end
        if (numberOfGodsInput < selectedGods.length) {
            setSelectedGods(selectedGods.slice(0, numberOfGodsInput));
        }

        setIsEditingGodCount(false);

        if (!isInitialRender) {
            // Update dimensions based on new number of gods
            const availableWidthPerGod = availableSpace.width;
            setGodWidthInput(Math.floor(pxToInch(availableWidthPerGod)));
            setGodHeightInput(Math.floor(pxToInch(availableSpace.height)));
        }
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
        return selectedGods.filter(god => god?.id === godId).length;
    };

    // Function to remove a single instance of a god from carousel
    const removeGodFromAllSlots = (godId) => {
        try {
            const lastIndex = selectedGods.map(god => god?.id).lastIndexOf(godId);
            if (lastIndex !== -1) {
                const newSelectedGods = [...selectedGods];
                newSelectedGods[lastIndex] = null;
                
                // Remove any trailing nulls
                while (newSelectedGods.length > 0 && !newSelectedGods[newSelectedGods.length - 1]) {
                    newSelectedGods.pop();
                }
                
                setSelectedGods(newSelectedGods);

                if (!isInitialRender && newSelectedGods.some(god => god)) {
                    const availableSpace = calculateAvailableSpace();
                    setGodWidthInput(Math.round(pxToInch(availableSpace.width)));
                    setGodHeightInput(Math.round(pxToInch(availableSpace.height)));
                }
            }
        } catch (error) {
            console.error('Error removing god:', error);
        }
    };

    // Handle save button click for god dimensions
    const handleSaveGodDimensions = () => {
        const availableSpace = calculateAvailableSpace();
        const newGodWidthPx = inchToPx(godWidthInput);
        const newGodHeightPx = inchToPx(godHeightInput);

        if (newGodWidthPx > availableSpace.width) {
            setGodDimensionError(`Width cannot exceed ${Math.floor(pxToInch(availableSpace.width))} inches`);
            return;
        }

        if (newGodHeightPx > availableSpace.height) {
            setGodDimensionError(`Height cannot exceed ${Math.floor(pxToInch(availableSpace.height))} inches`);
            return;
        }

        // Clear any previous error
        setGodDimensionError('');
        
        // Update dimensions
        const newSelectedGods = [...selectedGods];
        setSelectedGods(newSelectedGods); // Trigger re-render with new dimensions
        
        setIsEditingGodDimensions(false);
    };

    // Handle image load error
    const handleImageError = (godId) => {
        console.log(`Error loading image for god ${godId}`);
    };

    // Handle image load success
    const handleImageLoadSuccess = (godId) => {
        console.log(`Successfully loaded image for god ${godId}`);
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

    // Handle drag events
    const handleDragStart = (e, god) => {
        try {
            e.dataTransfer.setData('text/plain', JSON.stringify(god));
        } catch (error) {
            console.error('Error starting drag:', error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        try {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            if (!data) return;
            
            const godData = JSON.parse(data);
            const emptyIndex = selectedGods.findIndex(g => !g);
            
            if (emptyIndex !== -1 || selectedGods.length < numberOfGods) {
                addGodToFrame(godData);
            }
        } catch (error) {
            console.error('Error handling drop:', error);
        }
    };

    return (
        <div className='bg-gray-200 h-auto w-full overflow-auto font-[var(--font-primary)]'>
            {/* Tooltip */}
            {showTooltip && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] bg-black text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-fade-in">
                    {tooltipMessage}
                </div>
            )}

            <div className="flex-1 flex justify-between">
                {/* Aside Navigation */}
                <aside className="fixed top-24 left-0 h-screen w-28 z-50 group">
                    <div className='absolute left-0 top-28 w-8 h-28 rounded-r-xl bg-black animate-pulse flex items-center justify-center slide-animation'>
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-white border-b-[6px] border-b-transparent"></div>
                    </div>
                    <div className='flex flex-col items-center gap-6 bg-white py-5 px-5 transform -translate-x-[150%] group-hover:translate-x-0 transition-transform duration-300 rounded-r-xl overflow-hidden bg-blue-300 shadow-lg'>
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
                            <div className={`DropArea relative bg-black w-full h-full flex items-center justify-center p-10`}>
                                {/* Gods Container */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-[90%] w-[90%] bg-black z-30">
                                    {Array.from({ length: numberOfGods }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 h-full flex items-center justify-center relative"
                                            style={{ transition: 'width 0.3s' }}
                                        >
                                            {selectedGods[i] ? (
                                                <div className="relative h-full w-full flex items-center bg-black justify-center">
                                                    {/* Add corners for first god */}
                                                    {i === 0 && selectedCorner && (
                                                        <>
                                                            <img 
                                                                src={selectedCorner.img} 
                                                                alt="Corner" 
                                                                className="absolute -top-4 -left-6 w-36 h-36 object-contain z-50"
                                                            />
                                                            <img 
                                                                src={selectedCorner.img} 
                                                                alt="Corner" 
                                                                className="absolute -bottom-6 -left-6 w-36 h-36 object-contain z-50"
                                                                style={{ transform: 'rotate(270deg)' }}
                                                            />
                                                        </>
                                                    )}
                                                    {/* Add corners for last god */}
                                                    {i === numberOfGods - 1 && selectedCorner && (
                                                        <>
                                                            <img 
                                                                src={selectedCorner.img} 
                                                                alt="Corner" 
                                                                className="absolute -top-6 -right-4 w-36 h-36 object-contain z-50"
                                                                style={{ transform: 'rotate(90deg)' }}
                                                            />
                                                            <img 
                                                                src={selectedCorner.img} 
                                                                alt="Corner" 
                                                                className="absolute -bottom-6 -right-6 w-36 h-36 object-contain z-50"
                                                                style={{ transform: 'rotate(180deg)' }}
                                                            />
                                                        </>
                                                    )}
                                                    {/* Add lamp if not the last god */}
                                                    {i < numberOfGods - 1 && selectedLamp && (
                                                        <div className="absolute -right-10 bottom-12 z-40">
                                                            <img 
                                                                src={selectedLamp.img} 
                                                                alt="Lamp" 
                                                                className="w-20 h-40 object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="godImgContainer" style={{
                                                        width: `${calculateAvailableSpace().width}px`,
                                                        height: `${calculateAvailableSpace().height}px`,
                                                        overflow: 'hidden',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                <img
                                                    src={selectedGods[i].img}
                                                    alt={selectedGods[i].name}
                                                    style={{
                                                                width: `${inchToPx(godWidthInput)}px`,
                                                                height: `${inchToPx(godHeightInput)}px`,
                                                                objectFit: 'fill'
                                                            }}
                                                            onError={() => handleImageError(selectedGods[i].id)}
                                                            onLoad={(e) => handleImageLoad(e, selectedGods[i].id)}
                                                        />
                                                    </div>
                                                    {activeTab === 'Gods' && (
                                                        <button 
                                                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors duration-200"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeGodFromSlot(i);
                                                            }}
                                                            aria-label={`Remove ${selectedGods[i].name}`}
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
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <div
                                                    className="godImgContainer overflow-hidden flex flex-col items-center justify-center text-center bg-black"
                                                    style={{
                                                        width: `${calculateAvailableSpace().width}px`,
                                                        height: `${calculateAvailableSpace().height}px`
                                                    }}
                                                    onDragOver={handleDragOver}
                                                    onDrop={handleDrop}
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
                <div className="max-w-72 w-72 p-3 flex flex-col fixed top-24 z-50 right-20">
                    <div className="flex flex-col gap-2">
                        <div className="frameGodInputContainer flex flex-col bg-white rounded-lg shadow-md p-4 w-72">
                            <div className="flex flex-col gap-4">
                                {/* Frame Dimensions Input */}
                                <div className="w-full">
                                    <div className="rounded-lg">
                                        <div className="flex justify-between gap-2 items-center">
                                            <div className='bg-gray-100 w-full p-1 px-2 rounded-lg'>
                                                <p className="text-xs font-semibold text-gray-500">Frame Dimensions</p>
                                                <div className="flex items-center text-xs text-gray-700 font-bold gap-2">
                                                    <div className="flex items-center">
                                                        <span className="mr-1">W:</span>
                                                        <select
                                                            className={`w-12 p-1 rounded transition-all duration-200 ${isEditingFrameDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                    value={frameWidthInput}
                                                            onChange={(e) => setFrameWidthInput(Number(e.target.value))}
                                                            disabled={!isEditingFrameDimensions}
                                                        >
                                                            {availableWidths.map(width => (
                                                                <option key={width} value={width}>{width}"</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <span>×</span>
                                                    <div className="flex items-center">
                                                        <span className="mr-1">H:</span>
                                                        <select
                                                            className={`w-12 p-1 rounded transition-all duration-200 ${isEditingFrameDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                    value={frameHeightInput}
                                                            onChange={(e) => setFrameHeightInput(Number(e.target.value))}
                                                            disabled={!isEditingFrameDimensions}
                                                        >
                                                            {availableHeights.map(height => (
                                                                <option key={height} value={height}>{height}"</option>
                                                            ))}
                                                        </select>
                                                    </div>
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
                                    <div className="rounded-lg">
                                        <div className="flex justify-between gap-2 items-center">
                                            <div className='bg-gray-100 w-full p-1 px-2 rounded-lg'>
                            <p className="text-xs text-nowrap font-semibold text-gray-500">No. of Gods</p>
                                                <div className="flex items-center">
                                                    <select
                                value={numberOfGodsInput}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value);
                                                            setNumberOfGodsInput(value);
                                                            setGodsCountError('');
                                                        }}
                                                        disabled={!isEditingGodCount}
                                                        className={`w-12 p-1 rounded text-sm text-gray-700 font-bold transition-all duration-200 ${
                                                            isEditingGodCount ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'
                                                        }`}
                                                    >
                                                        {Array.from({ length: calculateMaxGods() }, (_, i) => i + 1).map(num => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </select>
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
                                        {godsCountError && (
                                            <p className="text-xs text-red-500 mt-1 px-2">
                                                {godsCountError}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                    </div>

                    {/* Frame Type - Only visible when Frame tab is active or frame is selected */}
                        {(activeTab === 'Frame' || selectedFrameInput) && (
                        <div className="flex w-full justify-between gap-2 items-center p-2 mb-3 rounded-lg shadow-md bg-white w-72">
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
                                {!isEditingFrame && (
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
                            <div className="flex flex-col bg-white rounded-lg shadow-md w-72">
                                <div className="flex w-full justify-between gap-2 items-center p-2">
                            <div className="flex-1 rounded-lg p-1 px-2 bg-gray-100">
                                <p className="text-xs font-semibold text-gray-500">God Dimensions</p>
                                        <div className="flex items-center text-xs text-gray-700 font-bold gap-2">
                                            <div className="flex items-center">
                                                <span className="mr-1">Width:</span>
                                                <select
                                                    className={`w-12 p-1 rounded transition-all duration-200 ${isEditingGodDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                        value={godWidthInput}
                                                    onChange={(e) => setGodWidthInput(Number(e.target.value))}
                                                    disabled={!isEditingGodDimensions}
                                                >
                                                    {getAvailableGodDimensions().widths.map(width => (
                                                        <option key={width} value={width}>{width}"</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <span>×</span>
                                            <div className="flex items-center">
                                                <span className="mr-1">Height:</span>
                                                <select
                                                    className={`w-12 p-1 rounded transition-all duration-200 ${isEditingGodDimensions ? 'border border-gray-300 focus:outline-none focus:border-indigo-500' : 'border-none bg-transparent'}`}
                                        value={godHeightInput}
                                                    onChange={(e) => setGodHeightInput(Number(e.target.value))}
                                                    disabled={!isEditingGodDimensions}
                                                >
                                                    {getAvailableGodDimensions().heights.map(height => (
                                                        <option key={height} value={height}>{height}"</option>
                                                    ))}
                                                </select>
                                </div>
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
                                        className='w-40 h-40 cursor-grab active:cursor-grabbing'
                                        onClick={() => addGodToFrame(god)}
                                        draggable="true"
                                        onDragStart={(e) => handleDragStart(e, god)}
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
                                                    removeGodFromAllSlots(god.id);
                                                }}
                                                className="absolute -top-3.5 -left-3.5 h-9 w-9 cursor-pointer flex justify-center items-center rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
                                                aria-label={`Remove all ${god.name} instances`}
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

            {/* Accessories selection: only visible when 'Accessories' tab active */}
            {activeTab === 'Accessories' && (
                <div className="bg-white w-full pl-28">
                    <div className='flex justify-between items-center py-3 px-5 w-full'>
                        <h1 className='font-bold text-2xl text-gray-700'>
                            Select Accessories
                        </h1>
                    </div>
                    {/* Accessories Type Selection */}
                    <div className="relative">
                        <div className="flex px-5">
                            <div className="relative">
                                <button
                                    onClick={() => setActiveAccessoryTab('corners')}
                                    className={`px-8 py-2 text-sm font-medium transition-colors duration-200 ${
                                        activeAccessoryTab === 'corners'
                                            ? 'text-indigo-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Ornamental Corners
                                </button>
                                {activeAccessoryTab === 'corners' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() => setActiveAccessoryTab('lamps')}
                                    className={`px-8 py-2 text-sm font-medium transition-colors duration-200 ${
                                        activeAccessoryTab === 'lamps'
                                            ? 'text-indigo-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    Decorative Lamps
                                </button>
                                {activeAccessoryTab === 'lamps' && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                                )}
                            </div>
                        </div>
                        {/* Bottom border line */}
                        <div className="h-[1px] bg-gray-200" />
                    </div>
                    {/* Accessories Display */}
                    <div className="bg-gray-100 min-h-[300px]">
                        <div className="px-5 py-6">
                            <div className="grid grid-cols-4 gap-6">
                                {activeAccessoryTab === 'corners' ? (
                                    // Display corners
                                    corners.map((corner) => (
                                        <div
                                            key={corner.id}
                                            onClick={() => handleCornerClick(corner)}
                                            className={`cursor-pointer relative h-44 w-44 flex justify-center items-center mx-4 rounded 
                                            ${selectedCorner?.id === corner.id ? 'border-indigo-600 border-3' : 'hover:border-3 hover:border-indigo-600'}`}
                                        >
                                            <img
                                                src={corner.img}
                                                alt={corner.name}
                                                className='w-40 h-40'
                                            />
                                            <div className='absolute text-sm font-semibold'>{corner.name}</div>
                                            {selectedCorner?.id === corner.id && (
                                                <div className="absolute -top-3.5 -right-3.5 h-9 w-9 flex justify-center items-center rounded-full bg-indigo-600">
                                                    <img className='h-8' src="/assets/tick.png" alt="" />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    // Display lamps
                                    lamps.map((lamp) => (
                                        <div
                                            key={lamp.id}
                                            onClick={() => handleLampClick(lamp)}
                                            className={`cursor-pointer relative h-44 w-44 flex justify-center items-center mx-4 rounded 
                                            ${selectedLamp?.id === lamp.id ? 'border-indigo-600 border-3' : 'hover:border-3 hover:border-indigo-600'}`}
                                        >
                                            <img
                                                src={lamp.img}
                                                alt={lamp.name}
                                                className='w-40 h-40'
                                            />
                                            <div className='absolute text-sm font-semibold'>{lamp.name}</div>
                                            {selectedLamp?.id === lamp.id && (
                                                <div className="absolute -top-3.5 -right-3.5 h-9 w-9 flex justify-center items-center rounded-full bg-indigo-600">
                                                    <img className='h-8' src="/assets/tick.png" alt="" />
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
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
