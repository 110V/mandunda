import * as Blockly from 'blockly/core';
import 'blockly/javascript';

Blockly.JavaScript['gotoandplay'] = function(block:any) {
    var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
    var value_frame = Blockly.JavaScript.valueToCode(block, 'frame', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `BlockFunctions["gotoAndPlay"](game, ${value_obj}, ${value_frame})\n`;
    return code;
  };