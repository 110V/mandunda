import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['addphysics'] = function (block: any) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var value_friction = Blockly.JavaScript.valueToCode(block, 'friction', Blockly.JavaScript.ORDER_ATOMIC);
  var value_mass = Blockly.JavaScript.valueToCode(block, 'mass', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_isstatic = block.getFieldValue('isstatic') == 'TRUE';
  // TODO: Assemble JavaScript into code variable.
  var code = `blockFunctions["addPhysics"](game, ${value_object}, ${value_friction}, ${value_mass}, ${checkbox_isstatic});\n`;
  return code;
};