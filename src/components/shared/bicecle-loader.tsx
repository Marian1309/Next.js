'use client';

interface Properties {
  className?: string;
}

const BicacleLoader = ({ className }: Properties) => {
  return (
    <div className={className}>
      <div style={{ color: 'var(--primary)' }}>
        <svg
          className="block h-auto w-[150px]"
          height="30px"
          viewBox="0 0 48 30"
          width="48px"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
          >
            <g transform="translate(9.5,19)">
              <circle
                className="animate-bikeTire"
                r={9}
                strokeDasharray="56.549 56.549"
              />
              <g
                className="animate-bikeSpokesSpin"
                strokeDasharray="31.416 31.416"
                strokeDashoffset="-23.562"
              >
                <circle className="animate-bikeSpokes" r={5} />
                <circle
                  className="animate-bikeSpokes"
                  r={5}
                  transform="rotate(180,0,0)"
                />
              </g>
            </g>
            <g transform="translate(24,19)">
              <g
                className="animate-bikePedalsSpin"
                strokeDasharray="25.133 25.133"
                strokeDashoffset="-21.991"
                transform="rotate(67.5,0,0)"
              >
                <circle className="animate-bikePedals" r={4} />
                <circle
                  className="animate-bikePedals"
                  r={4}
                  transform="rotate(180,0,0)"
                />
              </g>
            </g>
            <g transform="translate(38.5,19)">
              <circle
                className="animate-bikeTire"
                r={9}
                strokeDasharray="56.549 56.549"
              />
              <g
                className="animate-bikeSpokesSpin"
                strokeDasharray="31.416 31.416"
                strokeDashoffset="-23.562"
              >
                <circle className="animate-bikeSpokes" r={5} />
                <circle
                  className="animate-bikeSpokes"
                  r={5}
                  transform="rotate(180,0,0)"
                />
              </g>
            </g>
            <polyline
              className="animate-bikeSeat"
              points="14 3,18 3"
              strokeDasharray="5 5"
            />
            <polyline
              className="animate-bikeBody"
              points="16 3,24 19,9.5 19,18 8,34 7,24 19"
              strokeDasharray="79 79"
            />
            <path
              className="animate-bikeHandlebars"
              d="m30,2h6s1,0,1,1-1,1-1,1"
              strokeDasharray="10 10"
            />
            <polyline
              className="animate-bikeFront"
              points="32.5 2,38.5 19"
              strokeDasharray="19 19"
            />
          </g>
        </svg>
      </div>

      <style>{`
        @keyframes bikeBody {
          0% {
            stroke-dashoffset: 79;
          }
          33%,
          67% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -79;
          }
        }

        @keyframes bikeFront {
          0% {
            stroke-dashoffset: 19;
          }
          33%,
          67% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -19;
          }
        }

        @keyframes bikeHandlebars {
          0% {
            stroke-dashoffset: 10;
          }
          33%,
          67% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -10;
          }
        }

        @keyframes bikePedals {
          0% {
            stroke-dashoffset: -25.133;
          }
          33%,
          67% {
            stroke-dashoffset: -21.991;
          }
          100% {
            stroke-dashoffset: -25.133;
          }
        }

        @keyframes bikePedalsSpin {
          0% {
            transform: rotate(0.1875turn);
          }
          100% {
            transform: rotate(3.1875turn);
          }
        }

        @keyframes bikeSeat {
          0% {
            stroke-dashoffset: 5;
          }
          33%,
          67% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -5;
          }
        }

        @keyframes bikeSpokes {
          0% {
            stroke-dashoffset: -31.416;
          }
          33%,
          67% {
            stroke-dashoffset: -23.562;
          }
          100% {
            stroke-dashoffset: -31.416;
          }
        }

        @keyframes bikeSpokesSpin {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(3turn);
          }
        }

        @keyframes bikeTire {
          0% {
            stroke-dashoffset: 56.549;
            transform: rotate(0);
          }
          33% {
            stroke-dashoffset: 0;
            transform: rotate(0.33turn);
          }
          67% {
            stroke-dashoffset: 0;
            transform: rotate(0.67turn);
          }
          100% {
            stroke-dashoffset: -56.549;
            transform: rotate(1turn);
          }
        }

        .animate-bikeBody {
          animation: bikeBody 1s ease-in-out infinite;
        }

        .animate-bikeFront {
          animation: bikeFront 1s ease-in-out infinite;
        }

        .animate-bikeHandlebars {
          animation: bikeHandlebars 1s ease-in-out infinite;
        }

        .animate-bikePedals {
          animation: bikePedals 1s ease-in-out infinite;
        }

        .animate-bikePedalsSpin {
          animation: bikePedalsSpin 1s linear infinite;
        }

        .animate-bikeSeat {
          animation: bikeSeat 1s ease-in-out infinite;
        }

        .animate-bikeSpokes {
          animation: bikeSpokes 1s ease-in-out infinite;
        }

        .animate-bikeSpokesSpin {
          animation: bikeSpokesSpin 1s linear infinite;
        }

        .animate-bikeTire {
          animation: bikeTire 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BicacleLoader;
