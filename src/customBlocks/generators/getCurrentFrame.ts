import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getcurrentframe'] = function(block:any) {
    var value_currentframe = Blockly.JavaScript.valueToCode(block, 'currentframe', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["stop"](game, ${value_currentframe})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };