import React from "react";

const LoadingCircle = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width="204px"
             height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.548780487804878s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(36 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.4878048780487804s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(72 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.42682926829268286s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(108 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.3658536585365853s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(144 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.30487804878048774s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(180 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.2439024390243902s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(216 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.18292682926829265s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(252 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.1219512195121951s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(288 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s"
                             begin="-0.06097560975609755s" repeatCount="indefinite" />
                </rect>
            </g>
            <g transform="rotate(324 50 50)">
                <rect x="46.5" y="27" rx="2.48" ry="2.48" width="7" height="8" fill="#606060">
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="0.6097560975609756s" begin="0s"
                             repeatCount="indefinite" />
                </rect>
            </g>
        </svg>
    );
};
export default LoadingCircle;