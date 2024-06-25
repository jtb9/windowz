import { Rnd } from "react-rnd";
import "./windowz.css";
import { useEffect, useState } from "react";

interface WindowzProps {
    children?: any;
    title?: string;
    open?: boolean;
    onClose?: () => void;
    progress?: number; // value between 0.0 and 1.0
    onConfirm?: () => void;
    onCancel?: () => void;

    startingX?: number;
    startingY?: number;
    startingWidth?: number;
    startingHeight?: number;
}

export default function Windowz(props: WindowzProps) {
    const [inHover, setInHover] = useState(false);
    const [maximized, setMaximized] = useState(false);
    const [position, setPosition] = useState({
        x: props.startingX ? props.startingX : 0,
        y: props.startingY ? props.startingY : 0
    });

    const [size, setSize] = useState({
        width: props.startingWidth ? props.startingWidth : "500",
        height: props.startingHeight ? props.startingHeight : "500"
    });

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isOpen = props.open ? props.open : false;

    if (isOpen === false) {
        return <span />
    }

    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    }

    const renderDragHandle = () => {
        return <div className="windowz-title-move">
            {/* //@ts-ignore */}
            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="m15.46 7-3.2-2.19-.71 1 2.29 1.57H8.62V2.16l1.57 2.29 1-.71L9 .54a1.25 1.25 0 0 0-2 0l-2.22 3.2 1 .71 1.59-2.29v5.22H2.16l2.29-1.57-.71-1L.54 7a1.25 1.25 0 0 0 0 2l3.2 2.19.71-1-2.29-1.57h5.21v5.22l-1.56-2.29-1 .71L7 15.46a1.25 1.25 0 0 0 2.06 0l2.19-3.2-1-.71-1.63 2.29V8.62h5.22l-2.29 1.57.71 1L15.46 9a1.25 1.25 0 0 0 0-2z" /></svg>
        </div>
    }

    const renderWindowControls = () => {
        return <div className="windowz-title-controls">
            <svg onClick={() => {
                handleClose();
            }} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Edit / Close_Square">
                    <path id="Vector" d="M9 9L11.9999 11.9999M11.9999 11.9999L14.9999 14.9999M11.9999 11.9999L9 14.9999M11.9999 11.9999L14.9999 9M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </g>
            </svg>
            <svg
                onClick={() => setMaximized(!maximized)}
                fill="#000000"
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                id="maximize"
                xmlns="http://www.w3.org/2000/svg"
                className="icon line"
            >
                <path
                    id="primary"
                    d="M3,14v6a1,1,0,0,0,1,1h6"
                    style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1.5,
                    }}
                />
                <line
                    id="primary-2"
                    data-name="primary"
                    x1="10"
                    y1="14"
                    x2="3.29"
                    y2="20.71"
                    style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1.5,
                    }}
                />
                <path
                    id="primary-3"
                    data-name="primary"
                    d="M14,3h6a1,1,0,0,1,1,1v6"
                    style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1.5,
                    }}
                />
                <line
                    id="primary-4"
                    data-name="primary"
                    x1="20.71"
                    y1="3.29"
                    x2="14"
                    y2="10"
                    style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1.5,
                    }}
                />
            </svg>
        </div>
    }

    const renderProgressBar = () => {
        if (props.progress === undefined) {
            return undefined;
        }

        return <div className="windowz-progress">
            <div style={{ width: `${100.0 * props.progress}%` }} className="windowz-progress-fill"></div>
            <div style={{ width: '100%' }} className="windowz-progress-fill-backdrop"></div>
        </div>
    }

    const renderWindowzControls = () => {
        let hasOkay = props.onConfirm !== undefined;
        let hasCancel = props.onCancel !== undefined;

        if (hasOkay === false && hasCancel === false) {
            return undefined;
        }

        let visibleControls = [];

        if (hasCancel) {
            visibleControls.push(<button>Cancel</button>)
        }

        if (hasOkay) {
            visibleControls.push(<button>Okay</button>)
        }

        return <div className="windowz-frame-controls">
            {visibleControls}
        </div>
    }

    const calculatePositionY = () => {
        if (position.y < 5) {
            return 5;
        }

        const maxY = windowSize.height - parseInt(size.height.toString()) - 20;

        if (position.y > maxY) {
            return maxY;
        }

        return position.y;
    }

    const calculatePositionX = () => {
        if (position.x < 5) {
            return 5;
        }

        const maxX = windowSize.width - parseInt(size.width.toString()) - 20;

        if (position.x > maxX) {
            return maxX;
        }

        return position.x;
    }

    const renderFrame = (innards: any) => {
        return <Rnd
            size={{
                width: maximized ? windowSize.width - 30 : size.width,
                height: maximized ? windowSize.height - 30 : size.height,
            }}
            position={{
                x: maximized ? 0 : calculatePositionX(),
                y: maximized ? 0 : calculatePositionY()
            }}
            onDragStop={(e, d) => {
                if (!maximized) {
                    setPosition({ x: d.x, y: d.y })
                }
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                if (!maximized) {
                    setSize({
                        width: ref.style.width,
                        height: ref.style.height
                    });
                }
            }}
            dragHandleClassName="windowz-title-move"
        >
            <div style={{
                marginBottom: props.progress ? "40px" : undefined
            }} className="windowz-frame">
                <div onPointerLeave={() => {
                    setInHover(false);
                }} onPointerEnter={() => {
                    setInHover(true);
                }} className="windowz-frame-title">
                    {inHover ? renderDragHandle() : undefined}
                    <div className="windowz-frame-title-name">
                        {props.title}
                    </div>
                    {renderWindowControls()}
                </div>
                <div className="windowz-frame-body">
                    {innards}
                </div>
                {renderProgressBar()}
                {renderWindowzControls()}
            </div>
        </Rnd>
    }

    return renderFrame(props.children)
}
