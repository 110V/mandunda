import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['checkcollision'] = function(block:any) {
    var value_a = Blockly.JavaScript.valueToCode(block, 'a', Blockly.JavaScript.ORDER_ATOMIC);
    var value_b = Blockly.JavaScript.valueToCode(block, 'b', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["checkCollision"](game, ${value_a}, ${value_b})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };