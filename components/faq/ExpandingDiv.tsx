"use client";
import { DownIcon } from "../svgs/DownIcon2";
import { UpIcon } from "../svgs/UpIcon2";
import { useState, useEffect } from "react";

export interface SectionButton {
  href: string;
  classNames: string[];
  children?: React.ReactNode[];
}
  
export interface Section {
  title: string;
  description: string;
  buttons?: SectionButton[];
}

export interface ExpandingDivProps {
  background: string;
  sections: Section[];
}
  
export const ExpandingDiv = ({ background, sections }: ExpandingDivProps) => {
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  // Reset expanded sections whenever the sections prop changes
  useEffect(() => {
    setExpandedSections({});
  }, [sections]);

  const toggleSection = (index: number) => {
    setExpandedSections(prevExpandedSections => ({
      ...prevExpandedSections,
      [index]: !prevExpandedSections[index]
    }));
  };

  return (
    <div className="w-100 pb-6">
      {sections.map((section, index) => (
        <div key={index} className={`${background} rounded-2xl m-auto mt-6 `}>
          <div className="relative cursor-pointer" onClick={() => toggleSection(index)}>
            <div className="py-6 px-5 relative">
              <button className="group w-full text-xl font-semibold text-neutral-black inline-flex items-start text-left">
                {section.title}
                {!expandedSections[index] ? <DownIcon /> : <UpIcon />}
              </button>
              {expandedSections[index] && (
                <nav tabIndex={0} className="w-full">
                  <p className="mt-4 font-light text-lg leading-normal md:leading-loose">
                    {section.description}
                  </p>
                  {section.buttons?.map((button, btnIndex) => (
                    <a key={btnIndex} href={button.href}    className={`${button.classNames.join(" ")} mt-6 block`}>
                      {button.children}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
