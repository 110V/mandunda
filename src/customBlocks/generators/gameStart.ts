import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['gamestart'] = function(block:any) {
    var statements_blocks = Blockly.JavaScript.statementToCode(block, 'blocks');
    // TODO: Assemble JavaScript into code variable.
    var code = `blockFunctions["gamestart"](game, ()=>{
        ${statements_blocks}
    });\n`;
    return code;
  };