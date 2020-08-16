import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['checkdrawing'] = function(block:any) {
    var value_isdrawing = Blockly.JavaScript.valueToCode(block, 'isDrawing', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["stop"](game, ${value_isdrawing})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };