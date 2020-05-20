import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['setvelocity'] = function(block:any) {
    var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["setVelocity"](game, ${value_object}, ${value_x}, ${value_y})\n`;
    return code;
  };