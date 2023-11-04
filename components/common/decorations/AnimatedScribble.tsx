"use client";
import {HTMLProps, LegacyRef, useEffect, useState} from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IProps extends HTMLProps<SVGElement>{
  width: number
  smwidth?: number
  animationDelay?: number
}

export const AnimatedScribble = ({width, smwidth, animationDelay, className}: IProps) => {

  const [targetRef, isIntersecting] = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);
  const {windowWidth} = useWindowDimensions();

  // Easing function
  function easeInOutQuad(x: number, t: number, b: number, c: number, d: number): number {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  function SVG(tag: string): Element {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
  }

  function replaceRectsWithPaths(parentElement: Element): void {
    const rects = parentElement.querySelectorAll("rect");
    rects.forEach((rect: Element) => {
      const rectX = rect.getAttribute("x");
      const rectY = rect.getAttribute("y");
      const rectWidth = parseFloat(rect.getAttribute("width")!);
      const rectHeight = parseFloat(rect.getAttribute("height")!);
      const rectX2 = parseFloat(rectX!) + rectWidth;
      const rectY2 = parseFloat(rectY!) + rectHeight;

      const convertedPath = `M${rectX},${rectY} ${rectX2},${rectY} ${rectX2},${rectY2} ${rectX},${rectY2} ${rectX},${rectY}`;

      const pathElement = SVG("path");
      pathElement.setAttribute("d", convertedPath);
      pathElement.setAttribute("fill", rect.getAttribute("fill")!);
      pathElement.setAttribute("stroke", rect.getAttribute("stroke")!);
      pathElement.setAttribute("stroke-width", rect.getAttribute("stroke-width")!);

      rect.parentNode!.insertBefore(pathElement, rect.nextSibling);
      rect.parentNode!.removeChild(rect);
    });
  }

  // function hideSVGPaths(parentElement: Element): void {
  //   const paths = parentElement.querySelectorAll("path");
  //   paths.forEach((path: Element) => {
  //     const totalLength = (path as SVGPathElement).getTotalLength();
  //     (path as SVGPathElement).style.strokeDashoffset = totalLength.toString();
  //     (path as SVGPathElement).style.strokeDasharray = `${totalLength} ${totalLength}`;
  //   });
  // }

  function drawSVGPaths(parentElement: Element, timeMin: number, timeMax: number, timeDelay: number): void {
    const paths = parentElement.querySelectorAll("path");
    paths.forEach((path: Element, i: number) => {
      const totalLength = (path as SVGPathElement).getTotalLength();
      (path as SVGPathElement).style.strokeDashoffset = totalLength.toString();
      (path as SVGPathElement).style.strokeDasharray = `${totalLength} ${totalLength}`;

      setTimeout(() => {
        let startTime: number | undefined;
        function animate(time: number) {
          if (startTime === undefined) {
            startTime = time;
          }
          const elapsed = time - startTime;
          const t = Math.min(elapsed / (timeMax - timeMin), 1);
          const offset = easeInOutQuad(t, elapsed, totalLength, -totalLength, timeMax - timeMin);
          (path as SVGPathElement).style.strokeDashoffset = offset.toString();
          if (t < 1) {
            requestAnimationFrame(animate);
          }
        }
        requestAnimationFrame(animate);
      }, timeDelay * i);
    });
  }

  function replaceWithPaths(parentElement: Element): void {
    replaceRectsWithPaths(parentElement);
  }

  function startSVGAnimation(parentElement: Element): void {
    drawSVGPaths(parentElement, 0, 3000, animationDelay || 0);
  }

  useEffect(() => {
    const svgElement = targetRef.current;

    if (svgElement && isIntersecting && !hasAnimated ) {
      replaceWithPaths(svgElement);
      startSVGAnimation(svgElement);
      setHasAnimated(true);
    }
  }, [isIntersecting]);

  return (
    <div ref={targetRef as LegacyRef<HTMLDivElement>} className="z-10">
      <svg
        className={`scribble ${className}`}
        style={{ width : windowWidth >= 768 ? width : smwidth ? smwidth : width }}
        xmlns="http://www.w3.org/2000/svg" width="285" height="28" viewBox="0 0 285 28" fill="none"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M221.765 0.0233105C184.916 0.361739 160.496 1.66657 111.656 5.90661C107.36 6.27939 100.645 6.86029 96.7321 7.1975C64.5011 9.9744 19.517 16.8618 7.13993 20.9146C4.57309 21.7551 0 24.0889 0 24.5586C0 24.6362 0.213569 24.5144 1.05361 23.9576C4.92646 21.3903 15.3174 19.0944 40.9043 15.1525C56.0185 12.824 72.5345 10.7218 86.1387 9.39517C96.5232 8.38246 145.799 4.44164 147.457 4.49144C147.797 4.50158 145.918 4.70409 143.281 4.94142C114.955 7.49128 105.31 8.52504 88.2265 10.8429C74.9894 12.6387 67.2241 13.9556 47.3806 17.7705C39.915 19.2057 40.1306 19.1524 40.0121 19.5957C39.7121 20.7187 40.6683 20.7437 46.7999 19.7729C88.3828 13.1901 113.199 10.7963 152.096 9.61599C162.562 9.29845 198.816 9.0077 198.181 9.24638C197.818 9.38275 186.914 10.2184 168.643 11.5099C127.764 14.3997 101.607 17.8319 72.81 24.0851C64.8252 25.8189 63.3924 26.3646 64.0892 27.4056C64.8252 28.5049 69.3766 28.1922 91.6287 25.5129C124.955 21.5002 137.33 20.4254 164.004 19.2271C170.204 18.9486 180.855 18.6641 180.551 18.7852C180.466 18.8189 173.75 19.566 165.628 20.4452C145.303 22.645 132.261 24.2578 131.806 24.6278C131.104 25.1981 131.306 26.0205 132.21 26.266C133.311 26.5654 136.425 26.4016 143.59 25.6673C159.131 24.0746 174.661 23.2016 197.625 22.6296C201.061 22.5439 205.063 22.4092 206.517 22.3302C209.9 22.1465 215.261 22.1469 217.744 22.3313C218.807 22.4101 220.129 22.5074 220.682 22.5475C222.779 22.6994 215.508 21.7216 212.409 21.4348C204.639 20.7162 194.511 20.5553 182.501 20.9597C179.746 21.0525 177.467 21.105 177.438 21.0765C177.377 21.0166 180.169 20.7371 193.696 19.4492C204.068 18.4616 204.328 18.418 204.723 17.6024C204.974 17.0849 204.723 16.4693 204.135 16.158C203.689 15.9225 188.542 15.9968 180.319 16.2748C160.605 16.9415 150.158 17.51 137.018 18.6308C123.723 19.7649 114.891 20.7785 92.8006 23.7056C79.3522 25.4876 72.271 26.3449 69.9007 26.4782L68.4316 26.5609L70.21 26.1103C75.696 24.7207 93.9829 21.3307 104.387 19.7746C126 16.5421 140.769 15.059 173.901 12.7941C201.74 10.8912 207.442 10.3208 207.872 9.39653C208.336 8.40062 207.508 7.80898 205.217 7.4981C202.093 7.07415 163.524 7.18237 149.854 7.65339C136.45 8.11532 120.531 9.00967 112.12 9.7734C111.226 9.85453 110.252 9.91219 109.954 9.9016C107.766 9.8238 137.881 6.96306 155.112 5.61207C173.988 4.13213 188.921 3.27788 209.625 2.49372C223.012 1.98683 257.183 2.19888 271.02 2.87498C283.838 3.50128 284.298 3.50976 284.686 3.12956C285.092 2.73301 285.103 2.43892 284.727 2.07098C284.249 1.60269 281.552 1.35463 275.427 1.21538C273.173 1.16407 268.198 0.956561 264.37 0.754049C260.543 0.551689 255.81 0.317545 253.854 0.233695C250.163 0.0755299 230.272 -0.0547883 221.765 0.0233105ZM153.607 4.1176C153.502 4.15907 153.293 4.16164 153.143 4.1232C152.992 4.08475 153.078 4.05085 153.333 4.04782C153.588 4.0448 153.711 4.07613 153.607 4.1176ZM151.596 4.27621C151.405 4.31208 151.057 4.313 150.822 4.27834C150.587 4.24353 150.743 4.21416 151.168 4.21295C151.593 4.21189 151.786 4.24034 151.596 4.27621ZM149.506 4.42939C149.272 4.46405 148.889 4.46405 148.655 4.42939C148.421 4.39473 148.613 4.36642 149.08 4.36642C149.548 4.36642 149.74 4.39473 149.506 4.42939ZM109.065 10.028C108.874 10.064 108.561 10.064 108.369 10.028C108.178 9.99181 108.335 9.96229 108.717 9.96229C109.1 9.96229 109.257 9.99181 109.065 10.028ZM107.364 10.1727C107.258 10.2147 107.084 10.2147 106.978 10.1727C106.871 10.1307 106.958 10.0964 107.171 10.0964C107.383 10.0964 107.471 10.1307 107.364 10.1727ZM222.035 22.7351C222.142 22.7771 222.316 22.7771 222.422 22.7351C222.528 22.6931 222.441 22.6588 222.229 22.6588C222.016 22.6588 221.929 22.6931 222.035 22.7351Z" fill="none" stroke="#134380" strokeWidth="2"/>
      </svg>
    </div>
  );
};