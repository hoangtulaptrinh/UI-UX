import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody, Row, Col } from 'reactstrap';
import { FaRegSmileWink } from 'react-icons/fa';
import './Icon.css'
import _ from 'lodash'
import { connect } from 'react-redux';

const Emoji = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const chooseEmoji = (item) => {
    props.addEmoji(item);
  }
  return (
    <div className='IconPopover'>
      <div id="Popover1" >
        <FaRegSmileWink />
      </div>
      <Popover
        placement="top-end"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
        className='All-Popover'
        hideArrow={true}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody className='PopoverBody'>
          <Row>
            {
              _.map(Array.from(props.Emoji), (item, index) =>
                <Col sm="2" key={index}>
                  <p
                    onClick={() => chooseEmoji(item)}
                  >
                    {item}
                  </p>
                </Col>
              )
            }
          </Row>
        </PopoverBody>
      </Popover>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    Emoji: state.Emoji
  }
}

export default connect(mapStatetoProps)(Emoji);