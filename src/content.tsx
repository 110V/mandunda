import BlocklyJS from 'blockly/javascript';

import "./customBlocks/definitions/definition"
import "./customBlocks/generators/gameStart"
import "./customBlocks/generators/addForce"
import "./customBlocks/generators/addPhysics"
import "./customBlocks/generators/checkCollision"
import "./customBlocks/generators/gameTick"
import "./customBlocks/generators/getKeyboardEvent"
import "./customBlocks/generators/getKeyboardState"
import "./customBlocks/generators/getMouseEvent"
import "./customBlocks/generators/getMouseState"
import "./customBlocks/generators/getObject"
import "./customBlocks/generators/getPos"
import "./customBlocks/generators/getVelocity"
import "./customBlocks/generators/mouseEvent"
import "./customBlocks/generators/setPos"
import "./customBlocks/generators/setVelocity"
import "./customBlocks/generators/setRotation"
import "./customBlocks/generators/currentObject"

export const INITIAL_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

export const INITIAL_TOOLBOX_XML = 
`<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
<category name="Logic" colour="#5C81A6">
  <block type="controls_if"></block>
  <block type="logic_compare">
    <field name="OP">EQ</field>
  </block>
  <block type="logic_operation">
    <field name="OP">AND</field>
  </block>
  <block type="logic_negate"></block>
  <block type="logic_boolean">
    <field name="BOOL">TRUE</field>
  </block>
  <block type="logic_null"></block>
  <block type="logic_ternary"></block>
</category>
<category name="Loops" colour="#5CA65C">
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
  <block type="controls_whileUntil">
    <field name="MODE">WHILE</field>
  </block>
  <block type="controls_for">
    <field name="VAR" id="C(8;cYCF}~vSgkxzJ+{O" variabletype="">i</field>
    <value name="FROM">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="TO">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
    <value name="BY">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="controls_forEach">
    <field name="VAR" id="Cg!CSk/ZJo2XQN3=VVrz" variabletype="">j</field>
  </block>
  <block type="controls_flow_statements">
    <field name="FLOW">BREAK</field>
  </block>
</category>
<category name="Math" colour="#5C68A6">
  <block type="math_round">
    <field name="OP">ROUND</field>
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">3.1</field>
      </shadow>
    </value>
  </block>
  <block type="math_number">
    <field name="NUM">0</field>
  </block>
  <block type="math_single">
    <field name="OP">ROOT</field>
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">9</field>
      </shadow>
    </value>
  </block>
  <block type="math_trig">
    <field name="OP">SIN</field>
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">45</field>
      </shadow>
    </value>
  </block>
  <block type="math_constant">
    <field name="CONSTANT">PI</field>
  </block>
  <block type="math_number_property">
    <mutation divisor_input="false"></mutation>
    <field name="PROPERTY">EVEN</field>
    <value name="NUMBER_TO_CHECK">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
  </block>
  <block type="math_arithmetic">
    <field name="OP">ADD</field>
    <value name="A">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="B">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
  <block type="math_on_list">
    <mutation op="SUM"></mutation>
    <field name="OP">SUM</field>
  </block>
  <block type="math_modulo">
    <value name="DIVIDEND">
      <shadow type="math_number">
        <field name="NUM">64</field>
      </shadow>
    </value>
    <value name="DIVISOR">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
  </block>
  <block type="math_constrain">
    <value name="VALUE">
      <shadow type="math_number">
        <field name="NUM">50</field>
      </shadow>
    </value>
    <value name="LOW">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="HIGH">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
  </block>
  <block type="math_random_int">
    <value name="FROM">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="TO">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
  </block>
  <block type="math_random_float"></block>
</category>
<category name="Text" colour="#5CA68D">
  <block type="text_charAt">
    <mutation at="true"></mutation>
    <field name="WHERE">FROM_START</field>
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR" id="q@$ZF(L?Zo/z\`d{o.Bp!" variabletype="">text</field>
      </block>
    </value>
  </block>
  <block type="text">
    <field name="TEXT"></field>
  </block>
  <block type="text_append">
    <field name="VAR" id=":};P,s[*|I8+L^-.EbRi" variabletype="">item</field>
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="text_length">
    <value name="VALUE">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_isEmpty">
    <value name="VALUE">
      <shadow type="text">
        <field name="TEXT"></field>
      </shadow>
    </value>
  </block>
  <block type="text_indexOf">
    <field name="END">FIRST</field>
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR" id="q@$ZF(L?Zo/z\`d{o.Bp!" variabletype="">text</field>
      </block>
    </value>
    <value name="FIND">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_join">
    <mutation items="2"></mutation>
  </block>
  <block type="text_getSubstring">
    <mutation at1="true" at2="true"></mutation>
    <field name="WHERE1">FROM_START</field>
    <field name="WHERE2">FROM_START</field>
    <value name="STRING">
      <block type="variables_get">
        <field name="VAR" id="q@$ZF(L?Zo/z\`d{o.Bp!" variabletype="">text</field>
      </block>
    </value>
  </block>
  <block type="text_changeCase">
    <field name="CASE">UPPERCASE</field>
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_trim">
    <field name="MODE">BOTH</field>
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_print">
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
  <block type="text_prompt_ext">
    <mutation type="TEXT"></mutation>
    <field name="TYPE">TEXT</field>
    <value name="TEXT">
      <shadow type="text">
        <field name="TEXT">abc</field>
      </shadow>
    </value>
  </block>
</category>
<category name="Lists" colour="#745CA6">
  <block type="lists_indexOf">
    <field name="END">FIRST</field>
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR" id="e\`(L;x,.j[[XN\`F33Q5." variabletype="">list</field>
      </block>
    </value>
  </block>
  <block type="lists_create_with">
    <mutation items="0"></mutation>
  </block>
  <block type="lists_repeat">
    <value name="NUM">
      <shadow type="math_number">
        <field name="NUM">5</field>
      </shadow>
    </value>
  </block>
  <block type="lists_length"></block>
  <block type="lists_isEmpty"></block>
  <block type="lists_create_with">
    <mutation items="3"></mutation>
  </block>
  <block type="lists_getIndex">
    <mutation statement="false" at="true"></mutation>
    <field name="MODE">GET</field>
    <field name="WHERE">FROM_START</field>
    <value name="VALUE">
      <block type="variables_get">
        <field name="VAR" id="e\`(L;x,.j[[XN\`F33Q5." variabletype="">list</field>
      </block>
    </value>
  </block>
  <block type="lists_setIndex">
    <mutation at="true"></mutation>
    <field name="MODE">SET</field>
    <field name="WHERE">FROM_START</field>
    <value name="LIST">
      <block type="variables_get">
        <field name="VAR" id="e\`(L;x,.j[[XN\`F33Q5." variabletype="">list</field>
      </block>
    </value>
  </block>
  <block type="lists_getSublist">
    <mutation at1="true" at2="true"></mutation>
    <field name="WHERE1">FROM_START</field>
    <field name="WHERE2">FROM_START</field>
    <value name="LIST">
      <block type="variables_get">
        <field name="VAR" id="e\`(L;x,.j[[XN\`F33Q5." variabletype="">list</field>
      </block>
    </value>
  </block>
  <block type="lists_split">
    <mutation mode="SPLIT"></mutation>
    <field name="MODE">SPLIT</field>
    <value name="DELIM">
      <shadow type="text">
        <field name="TEXT">,</field>
      </shadow>
    </value>
  </block>
  <block type="lists_sort">
    <field name="TYPE">NUMERIC</field>
    <field name="DIRECTION">1</field>
  </block>
</category>
<category name="Colour" colour="#A6745C">
  <block type="colour_picker">
    <field name="COLOUR">#ff0000</field>
  </block>
  <block type="colour_random"></block>
  <block type="colour_rgb">
    <value name="RED">
      <shadow type="math_number">
        <field name="NUM">100</field>
      </shadow>
    </value>
    <value name="GREEN">
      <shadow type="math_number">
        <field name="NUM">50</field>
      </shadow>
    </value>
    <value name="BLUE">
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    </value>
  </block>
  <block type="colour_blend">
    <value name="COLOUR1">
      <shadow type="colour_picker">
        <field name="COLOUR">#ff0000</field>
      </shadow>
    </value>
    <value name="COLOUR2">
      <shadow type="colour_picker">
        <field name="COLOUR">#3333ff</field>
      </shadow>
    </value>
    <value name="RATIO">
      <shadow type="math_number">
        <field name="NUM">0.5</field>
      </shadow>
    </value>
  </block>
</category>
<sep></sep>
<category name="Custom Button" colour="#A6745C">
  <button text="A button" callbackKey="myFirstButtonPressed"></button>
</category>
<category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
<category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
<category name="Engine" colour="#5ba55b">
<block type="gamestart"></block>
<block type="setpos">
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
  <value name="X">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
  <value name="Y">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
</block>
<block type="getpos">
  <field name="type">x</field>
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
</block>
<block type="gametick"></block>
<block type="getmousestate">
  <field name="stateType">isDown</field>
</block>
<block type="getmouseevent">
  <field name="eventType">isDown</field>
</block>
<block type="getkeyboardstate">
  <field name="statetype">isDown</field>
  <value name="keycode">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
</block>
<block type="getkeyboardevent">
  <field name="eventType">isDown</field>
  <value name="keycode">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
</block>
<block type="addphysics">
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
  <value name="friction">
    <block type="math_number">
      <field name="NUM">0.1</field>
    </block>
  </value>
  <value name="mass">
    <block type="math_number">
      <field name="NUM">0.0001</field>
    </block>
  </value>
</block>
<block type="addforce">
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
  <value name="X">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
  <value name="Y">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
</block>
<block type="setvelocity">
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
  <value name="X">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
  <value name="Y">
    <block type="math_number">
      <field name="NUM">0</field>
    </block>
  </value>
</block>
<block type="getvelocity">
  <field name="type">x</field>
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
</block>
<block type="checkcollision">
  <value name="a">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
  <value name="b">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
</block>
<block type="mouseevent">
  <field name="type">mousedown</field>
  <value name="object">
    <block type="getobject">
      <value name="objectName">
        <block type="text">
          <field name="TEXT"></field>
        </block>
      </value>
    </block>
  </value>
</block>
<block type="setrotation">
      <value name="object">
        <block type="getobject">
          <value name="objectName">
            <block type="text">
              <field name="TEXT"></field>
            </block>
          </value>
        </block>
      </value>
      <value name="NAME">
        <block type="math_number">
          <field name="NUM">0</field>
        </block>
      </value>
    </block>
    <block type="currentobject"/>
</category>
</xml>`;

const INITIAL_TOOLBOX_CATEGORIES = [
  {
    name: 'Controls',
    blocks: [
      { type: 'controls_if' },
      {
        type: 'controls_repeat_ext',
        values: {
          TIMES: {
            type: 'math_number',
            shadow: true,
            fields: {
              NUM: 10,
            },
          },
        },
        statements: {
          DO: {
            type: 'text_print',
            shadow: true,
            values: {
              TEXT: {
                type: 'text',
                shadow: true,
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: 'Text',
    blocks: [
      { type: 'text' },
      {
        type: 'text_print',
        values: {
          TEXT: {
            type: 'text',
            shadow: true,
            fields: {
              TEXT: 'abc',
            },
          },
        },
      },
    ],
  },
];
