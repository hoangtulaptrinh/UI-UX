import React, { useState } from 'react';
import { Popover, PopoverBody, Row, Col } from 'reactstrap';
import { FaRegSmileWink } from 'react-icons/fa';
import './Icon.css'
import _ from 'lodash'
import { connect } from 'react-redux';
import classNames from 'classnames'

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
        <PopoverBody id='scroll-body-icon'
          className={classNames('PopoverBody', {
            PopoverBodyLightTheme: props.changeTheme === true,
          })}
        >
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
    Emoji: state.Emoji,
    changeTheme: state.changeTheme,
  }
}

export default connect(mapStatetoProps)(Emoji);