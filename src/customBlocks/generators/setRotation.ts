import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['setrotation'] = function(block:any) {
    var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["setRotation"](game, ${value_object}, ${value_name})\n`;
    return code;
  };