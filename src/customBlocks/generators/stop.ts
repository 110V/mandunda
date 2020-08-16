import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['stop'] = function(block:any) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["stop"](game, ${value_obj})\n`;
    return code;
  };