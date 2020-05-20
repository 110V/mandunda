import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['getmousestate'] = function(block:any) {
    var dropdown_statetype = block.getFieldValue('stateType');
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["getMousState"](game, ${dropdown_statetype})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  }