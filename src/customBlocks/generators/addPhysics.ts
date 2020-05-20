import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['addphysics'] = function(block:any) {
    var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
    var value_friction = Blockly.JavaScript.valueToCode(block, 'friction', Blockly.JavaScript.ORDER_ATOMIC);
    var value_mass = Blockly.JavaScript.valueToCode(block, 'mass', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["addForce"addPhysics"](game, ${value_object}, ${value_friction}, ${value_mass});\n`;
    return code;
  };