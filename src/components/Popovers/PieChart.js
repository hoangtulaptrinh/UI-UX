import React from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FaRegChartBar } from 'react-icons/fa';
import './PieChart.css'
import { VictoryPie } from 'victory'
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames'

const PieChart = (props) => {
  const lightTheme = props.changeTheme;
  let colorScale = ["cyan", "navy"];
  if (lightTheme === false) {
    colorScale = ["green", "red"];
  }
  return (
    <div className='PieChart'>
      <FaRegChartBar id="PopoverLegacy" />
      <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
        <PopoverHeader
          className={classNames('Header-Chart', {
            HeaderChartBodyLightTheme: lightTheme === false
          })}
        >
          Chart
        </PopoverHeader>
        <PopoverBody>
          {
            props.currentRoom !== -1 ?
              <div
                className={classNames('PieChart-Body', {
                  PieChartBodyLightTheme: lightTheme === false
                })}>
                <VictoryPie
                  colorScale={colorScale}
                  innerRadius={100}
                  labels={() => { }} // ẩn đi label
                  data={[
                    { x: "Online", y: 1 },
                    { x: "Offline", y: _.uniqBy(_.find(props.dataRoom, { id: props.currentRoom }).data, 'name').length - 1 }
                  ]}
                />
                <div className='Info-Chart'>
                  <div className='Online'>
                    <div style={{ background: colorScale[0] }} className='circle-div' />
                    <div
                      className={classNames('state-number', {
                        StateNumberBodyLightTheme: lightTheme === false
                      })}
                    >
                      <p>Online:</p>
                      <p>1</p>
                    </div>
                  </div>
                  <div className='Offline'>
                    <div style={{ background: colorScale[1] }} className='circle-div' />
                    <div
                      className={classNames('state-number', {
                        StateNumberBodyLightTheme: lightTheme === false
                      })}
                    >
                      <p>Offline:</p>
                      <p>{_.uniqBy(_.find(props.dataRoom, { id: props.currentRoom }).data, 'name').length - 1}</p>
                    </div>
                  </div>
                </div>
              </div>
              :
              null
          }
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    currentRoom: state.currentRoom,
    changeTheme: state.changeTheme
  }
}

export default connect(mapStatetoProps)(PieChart);