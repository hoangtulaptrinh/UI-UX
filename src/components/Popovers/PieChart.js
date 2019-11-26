import React from 'react';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { FaRegChartBar } from 'react-icons/fa';
import './PieChart.css'
import { VictoryPie } from 'victory'

const PieChart = (props) => {
  return (
    <div className='PieChart'>
      <FaRegChartBar id="PopoverLegacy" />
      <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
        <PopoverHeader>Chart</PopoverHeader>
        <PopoverBody className='PieChart-Body'>
          <VictoryPie
            colorScale={["orange", "cyan", "navy"]}
            innerRadius={100}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 }
            ]}
          />
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default PieChart;