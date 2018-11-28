/**
 * @license
 *
 * This code has been adapted from:
 * https://github.com/jessy1092/react-github-fork-ribbon/
 *
 * Which is licensed as follows:
 *
 * The MIT License (MIT)
 * Copyright (c) 2015-2017 Lee < jessy1092@gmail.com >
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import * as React from "react";

import { Without } from "../../Types/utils";

interface IPositionMapping {
  "left": React.CSSProperties[];
  "right": React.CSSProperties[];
  "left-bottom": React.CSSProperties[];
  "right-bottom": React.CSSProperties[];
}

interface IColorMapping {
  red: React.CSSProperties;
  orange: React.CSSProperties;
  black: React.CSSProperties;
  green: React.CSSProperties;
}

interface IRibbonProps {
    href: string;
    target: string;
    color?: keyof IColorMapping;
    className?: string;
    position?: keyof IPositionMapping;
}

type OtherProps = Without<
  Without<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "style"
  >,
  "style"
>;

export default class Ribbon extends React.Component<IRibbonProps & OtherProps> {
  render() {
    const {position = "right", href, target, color = "red", className = "", children, ...other}  = this.props;

    const positionStyle = positionMapping[position] || [RibbonStyle.rightStyle, RibbonStyleWrapper.rightStyle];
    const colorStyle = colorMapping[color] || RibbonStyle.redColor;

    const thePosition = (positionStyle[0] === RibbonStyle.rightStyle) ? "right" : position;

    const ribbonStyle = {
      ...RibbonStyle.baseStyle,
      ...positionStyle[0],
      ...colorStyle,
    };

    const wrapperStyle = {
      ...RibbonStyleWrapper.baseStyle,
      ...positionStyle[1],
    };

    return (
      <div
        className={`github-fork-ribbon-wrapper ${thePosition} ${className}`}
        style={wrapperStyle}
        {...other}
      >
        <div
          className="github-fork-ribbon"
          style={ribbonStyle}
        >
          <a
            href={href}
            target={target}
            style={RibbonStyle.urlStyle}
            rel="noopener"
          >
            {children}
          </a>
        </div>
      </div>
    );
  }
}

/*
* "Fork me on GitHub" CSS ribbon v0.1.1 | MIT License
* https://github.com/simonwhitaker/github-fork-ribbon-css
*
* 20150116 Lee: use css source for inline style react component.
*/
const RibbonStyle: {[key: string]: React.CSSProperties} = {
    baseStyle: {
      // The right and left classes determine the side we attach our banner to
      position: "absolute",

      // Add a bit of padding to give some substance outside the "stitching"
      padding: "2px 0",

      // Set the base colour
      backgroundColor: "#a00",

      // Set a gradient: transparent black at the top to almost-transparent black at the bottom
      backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))",

      // Add a drop shadow
      WebkitBoxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.5)",
      MozBoxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.5)",
      boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.5)",

      // Set the font
      font: '700 13px "Helvetica Neue", Helvetica, Arial, sans-serif',

      zIndex: 9999,
      pointerEvents: "auto",
    },

    urlStyle: {
      // Set the text properties
      color: "#fff",
      textDecoration: "none",
      textShadow: "0 -1px rgba(0, 0, 0, 0.5)",
      textAlign: "center",

      /* Set the geometry. If you fiddle with these you'll also need
         to tweak the top and right values in .github-fork-ribbon. */
      width: "200px",
      lineHeight: "20px",

      // Set the layout properties
      display: "inline-block",
      padding: "2px 0",

      // Add "stitching" effect
      borderWidth: "1px 0",
      borderStyle: "dashed",
      // borderColor: '#fff',
      borderColor: "rgba(255, 255, 255, 0.7)",
    },

    redColor: {
      backgroundColor: "#a00",
    },

    orangeColor: {
      backgroundColor: "#f80",
    },

    blackColor: {
      backgroundColor: "#333",
    },

    greenColor: {
      backgroundColor: "#090",
    },

    leftStyle: {
      top: "42px",
      left: "-43px",

      WebkitTransform: "rotate(-45deg)",
      MozTransform: "rotate(-45deg)",
      msTransform: "rotate(-45deg)",
      OTransform: "rotate(-45deg)",
      transform: "rotate(-45deg)",
    },

    rightStyle: {
      top: "42px",
      right: "-43px",

      WebkitTransform: "rotate(45deg)",
      MozTransform: "rotate(45deg)",
      msTransform: "rotate(45deg)",
      OTransform: "rotate(45deg)",
      transform: "rotate(45deg)",
    },

    leftBottomStyle: {
      top: "80px",
      left: "-43px",

      WebkitTransform: "rotate(45deg)",
      MozTransform: "rotate(45deg)",
      msTransform: "rotate(45deg)",
      OTransform: "rotate(45deg)",
      transform: "rotate(45deg)",
    },

    rightBottomStyle: {
      top: "80px",
      right: "-43px",

      WebkitTransform: "rotate(-45deg)",
      MozTransform: "rotate(-45deg)",
      msTransform: "rotate(-45deg)",
      OTransform: "rotate(-45deg)",
      transform: "rotate(-45deg)",
    },
  };

const RibbonStyleWrapper: {[key: string]: React.CSSProperties} = {
    baseStyle: {
      width: "150px",
      height: "150px",
      position: "absolute",
      overflow: "hidden",
      top: 0,
      zIndex: 9999,
      pointerEvents: "none",
    },

    fixedStyle: {
      position: "fixed",
    },

    leftStyle: {
      left: 0,
    },

    rightStyle: {
      right: 0,
    },

    leftBottomStyle: {
      position: "fixed",
      top: "inherit",
      bottom: 0,
      left: 0,
    },

    rightBottomStyle: {
      position: "fixed",
      top: "inherit",
      bottom: 0,
      right: 0,
    },
  };

const positionMapping: IPositionMapping = {
  "left": [RibbonStyle.leftStyle, RibbonStyleWrapper.leftStyle],
  "right": [RibbonStyle.rightStyle, RibbonStyleWrapper.rightStyle],
  "left-bottom": [RibbonStyle.leftBottomStyle, RibbonStyleWrapper.leftBottomStyle],
  "right-bottom": [RibbonStyle.rightBottomStyle, RibbonStyleWrapper.rightBottomStyle],
};

const colorMapping: IColorMapping = {
  red: RibbonStyle.redColor,
  orange: RibbonStyle.orangeColor,
  black: RibbonStyle.blackColor,
  green: RibbonStyle.greenColor,
};
