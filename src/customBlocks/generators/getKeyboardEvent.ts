import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getkeyboardevent'] = function(block:any) {
  var dropdown_eventtype = block.getFieldValue('eventType');
  var value_keycode = Blockly.JavaScript.valueToCode(block, 'keycode', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = `blockFunctions["getKeyboardEvent"](game, "${dropdown_eventtype}", ${value_keycode})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};