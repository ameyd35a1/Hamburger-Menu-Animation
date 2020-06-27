import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

import dallas from '../images/dallas.webp';
import austin from '../images/austin.webp';
import newyork from '../images/newyork.webp';
import sanfrancisco from '../images/sanfrancisco.webp';
import beijing from '../images/beijing.webp';


const citites = [
  { name: 'Dallas', image: dallas },
  { name: 'Austin', image: austin },
  { name: 'New York', image: newyork },
  { name: 'San Francisco', image: sanfrancisco },
  { name: 'Beijing', image: beijing },
]

const Hamburger = ({ state }) => {
  //vars for our animated dom nodes
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revelMenuBackground = useRef(null);
  let cityBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let info = useRef(null);

  useEffect(() => {
    if (state.clicked === false) {
      //close menu
      gsap.to([revealMenu, revelMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: 'power3.inOut',
        stagger: {
          amount: 0.07
        }
      });
      gsap.to(menu, {
        duration: 1,
        css: { display: "none" }
      })
    } else if (
      state.clicked === true ||
      (state.clicked === true && state.initial === null)
    ) {
      //open menu
      gsap.to(menu, {
        duration: 0,
        css: { display: "block" }
      });

      gsap.to([revealMenu, revelMenuBackground], {
        duration: 0,
        height: '100%',
        opacity: 1,
      });
      staggerReveal(revelMenuBackground, revealMenu);
      fadeInUp(info);
      staggerText(line1, line2, line3);
    }
  }, [state]);

  const staggerReveal = (node1, node2) => {
    gsap.from([node1, node2], {
      duration: 0.8,
      height: 0,
      transformOrigin: 'right top',
      skewY: 2,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.1
      }
    })
  }

  const staggerText = (node1, node2, node3) => {
    gsap.from([node1, node2, node3], {
      duration: 0.8,
      y: 100,
      delay: 0.1,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.3
      }
    })
  }

  const fadeInUp = (node) => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: 0.2,
      ease: 'power3.inOut',
      opacity: 0,
    })
  }

  const handleCity = city => {
    gsap.to(cityBackground, {
      duration: 0,
      background: `url(${city}) center center`
    });

    gsap.to(cityBackground, {
      duration: .4,
      opacity: 1,
      ease: 'power3.inOut',
    })

    gsap.from(cityBackground, {
      duration: .4,
      skewY: 2,
      transformOrigin: "right top"
    })
  }

  const handleCityReturn = () => {
    gsap.to(cityBackground, {
      duration: .4,
      opacity: 0
    })
  }

  const handleHover = e => {
    gsap.to(e.target, {
      duration: .3,
      y: 3,
      skewX: 4,
      ease: 'power3.inOut'
    })
  }

  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: .3,
      y: -3,
      skewX: 0,
      ease: 'power3.inOut'
    })
  }

  return (
    <div
      ref={(el) => {
        menu = el;
      }}
      className="hamburger-menu"
    >
      <div
        ref={(el) => {
          revelMenuBackground = el;
        }}
        className="menu-secondary-background-color"
      ></div>
      <div
        ref={(el) => {
          revealMenu = el;
        }}
        className="menu-layer"
      >
        <div ref={(el) => {
          cityBackground = el;
        }} className="menu-city-background"></div>
        <div className="container">
          <div className="wrapper">
            <div className="menu-links">
              <nav>
                <ul>
                  <li>
                    <Link ref={(el) => {
                      line1 = el;
                    }} onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)} to="/opportunities">Opportunities</Link>
                  </li>
                  <li>
                    <Link ref={(el) => {
                      line2 = el;
                    }} onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)} to="/solutions">Solutions</Link>
                  </li>
                  <li>
                    <Link ref={(el) => {
                      line3 = el;
                    }} onMouseEnter={e => handleHover(e)} onMouseOut={e => handleHoverExit(e)} to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </nav>
              <div ref={(el) => {
                info = el;
              }} className="info">
                <h3>Our Promise</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div className="locations">
                Locations:
                {citites.map(el => (
                <span key={el.name} onMouseEnter={() => handleCity(el.image)} onMouseOut={handleCityReturn}>
                  {el.name}
                </span>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
