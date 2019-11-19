/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { MdGif } from "react-icons/md";
import './Gif.css'

const PopoverItem = props => {
  const { id, item } = props;
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <span>
      <div
        className="mr-1"
        id={"Popover-" + id}
      >
        <MdGif />
      </div>

      <Popover
        placement={item.placement}
        isOpen={popoverOpen}
        target={"Popover-" + id}
        toggle={toggle}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          <div className='test123' />
        </PopoverBody>
      </Popover>
    </span>
  );
};

const PopoverExampleMulti = props => {
  return (
    <>
      {[
        {
          placement: "top",
          text: "Top"
        },
      ].map((popover, i) => {
        return <PopoverItem key={i} item={popover} id={i} />;
      })}
    </>
  );
};

export default PopoverExampleMulti;