import * as Blockly from 'blockly/core';

Blockly.Blocks['setpos'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("무비클립");
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField("의 위치를")
        .appendField("X:");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField("Y:");
    this.appendDummyInput()
        .appendField("로 설정");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("좌표 설정");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getobject'] = {
  init: function() {
    this.appendValueInput("objectName")
        .setCheck("String")
        .appendField("오브젝트 :");
    this.setOutput(true, "object");
    this.setColour(230);
 this.setTooltip("오브젝트를 이름으로 찾습니다.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getpos'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("다음 오브젝트의 ")
        .appendField(new Blockly.FieldDropdown([["x","x"], ["y","y"]]), "type")
        .appendField("좌표");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['gametick'] = {
  init: function() {
    this.appendStatementInput("blocks")
        .setCheck(null)
        .appendField("게임 틱");
    this.setColour(255);
 this.setTooltip("게임 틱마다 내용을 반복합니다.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getmousestate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("마우스가")
        .appendField(new Blockly.FieldDropdown([["누른상태","isDown"], ["뗀상태","isUp"]]), "stateType")
        .appendField("인가?");
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("마우스가 눌린 상태인지 뗀 상태인지 확인합니다.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getmouseevent'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("마우스를 ")
        .appendField(new Blockly.FieldDropdown([["누른","isDown"], ["뗀","isUp"], ["클릭한","isClick"]]), "eventType")
        .appendField("순간인가?");
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("마우스가 이벤트당  한번만 True를 반환합니다.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getkeyboardstate'] = {
  init: function() {
    this.appendValueInput("keycode")
        .setCheck("Number")
        .appendField("다음 키가 ")
        .appendField(new Blockly.FieldDropdown([["눌린","isDown"], ["뗀","isUp"]]), "statetype")
        .appendField("상태인가?");
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getkeyboardevent'] = {
  init: function() {
    this.appendValueInput("keycode")
        .setCheck("Number")
        .appendField("다음 키를 ")
        .appendField(new Blockly.FieldDropdown([["누른","isDown"], ["뗀","isUp"]]), "eventType")
        .appendField("순간인가?");
    this.setOutput(true, "Boolean");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['addphysics'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("다음 오브젝트에 물리엔진 추가");
    this.appendValueInput("friction")
        .setCheck("Number")
        .appendField("마찰");
    this.appendValueInput("mass")
        .setCheck("Number")
        .appendField("질량");
    this.appendDummyInput()
        .appendField("고정된 물체인가? ")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isstatic");
    this.appendDummyInput()
        .appendField("각도 고정")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "norotation");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("물리세계에 던진다!");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['addforce'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("다음 오브젝트에");
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField("X:");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField("Y:");
    this.appendDummyInput()
        .appendField("만큼 힘주기");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['setvelocity'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("다음 오브젝트의 속도를");
    this.appendValueInput("X")
        .setCheck("Number")
        .appendField("X:");
    this.appendValueInput("Y")
        .setCheck("Number")
        .appendField("Y:");
    this.appendDummyInput()
        .appendField("로 정하기");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['getvelocity'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("다음 오브젝트의 속도")
        .appendField(new Blockly.FieldDropdown([["x","x"], ["y","y"]]), "type")
        .appendField("구하기");
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['checkcollision'] = {
  init: function() {
    this.appendValueInput("a")
        .setCheck(null)
        .appendField("오브젝트");
    this.appendValueInput("b")
        .setCheck(null)
        .appendField("오브젝트");
    this.appendDummyInput()
        .appendField("사이의 충돌 확인");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(0);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['mouseevent'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object");
    this.appendStatementInput("blocks")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["눌림","mousedown"], ["뗌","mouseup"], ["움직임","mousemove"], ["올림","mouseover"], ["클릭","mouseclick"]]), "type")
        .appendField("이벤트");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['gamestart'] = {
  init: function() {
    this.appendStatementInput("blocks")
        .setCheck(null)
        .appendField("시작");
    this.setColour(50);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['setrotation'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck("object")
        .appendField("오브젝트");
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("의 각도를");
    this.appendDummyInput()
        .appendField("로 설정");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['currentobject'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("이 오브젝트");
    this.setOutput(true, "object");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};