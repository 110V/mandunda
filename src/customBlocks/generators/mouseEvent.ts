import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['mouseevent'] = function(block:any) {
  var value_object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  var statements_blocks = Blockly.JavaScript.statementToCode(block, 'blocks');
  // TODO: Assemble JavaScript into code variable.
  var code = `blockFunctions["mouseEvent"](game, ${value_object}, "${dropdown_type}",()=>{
    ${statements_blocks}
  })\n`;
  return code;
};