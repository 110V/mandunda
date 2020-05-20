import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['gametick'] = function (block: any) {
  var statements_blocks = Blockly.JavaScript.statementToCode(block, 'blocks');
  // TODO: Assemble JavaScript into code variable.
  var code = `blockFunctions["gameTick"](game, ()=>{
      ${statements_blocks}
  });\n`;
  return code;
};