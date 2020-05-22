import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getpos'] = function(block:any) {
    var dropdown_type = block.getFieldValue('type');
    var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["getPos"](game, "${dropdown_type}", ${value_object})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };