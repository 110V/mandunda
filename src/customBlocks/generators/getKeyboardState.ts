import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getkeyboardstate'] = function(block:any) {
    var dropdown_statetype = block.getFieldValue('statetype');
    var value_keycode = Blockly.JavaScript.valueToCode(block, 'keycode', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["getKeyboardState"](game, ${dropdown_statetype}, ${value_keycode})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };