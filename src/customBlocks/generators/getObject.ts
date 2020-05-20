import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getobject'] = function(block:any) {
    var value_objectname = Blockly.JavaScript.valueToCode(block, 'objectName', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["getObject"](game, ${value_objectname})`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };