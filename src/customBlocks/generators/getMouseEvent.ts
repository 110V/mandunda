import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getmouseevent'] = function(block:any) {
    var dropdown_eventtype = block.getFieldValue('eventType');
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["getMouseEvent"](game, ${dropdown_eventtype})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };