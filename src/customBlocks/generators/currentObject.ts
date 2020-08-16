import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['currentobject'] = function(block:any) {
    // TODO: Assemble JavaScript into code variable.
    var code = '{CURRENTOBJECT}';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };