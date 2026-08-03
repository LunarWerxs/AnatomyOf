import type { LanguageDef } from '../lib/types'

// Shiki ships no GML grammar, so the code panel borrows JavaScript's. GML is a
// C-family language and the overlap is close to total: var, function, if/else,
// with, enum, new, switch, return, ?:, // and /* */ all tokenize correctly.
// Measured against every plausible stand-in (typescript, csharp, cpp, java,
// dart, swift, kotlin), javascript colors the most of a real GML file and is
// the only one that never mis-colors braces or enum members.
export const gml: LanguageDef = {
  id: 'gml',
  popularity: 31,
  name: 'GML (GameMaker)',
  titleWord: 'GML',
  article: 'a',
  extensions: ['.gml'],
  accentHex: '#71b417',
  officialUrl: 'https://manual.gamemaker.io/',
  shikiLang: 'javascript',
  note: "GML is GameMaker's built-in scripting language. A .gml file is either one event of one object or a script of reusable functions, and since GameMaker 2.3 a single script file can hold as many functions, constructors, and macros as you want.",
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`) or block (`/* ... */`), ignored by the compiler.',
      details:
        '`//` comments out the rest of the line and `/* ... */` brackets a block that can span many lines, exactly as in C, Java, and JavaScript. Neither form reaches the running game, so they cost nothing at runtime.\n\nBecause a `.gml` file is opened inside GameMaker rather than as a standalone document, a block comment at the top is the usual place to record which object and which event the file belongs to. The IDE shows you that in its own chrome, but the comment survives when the code is pasted into a forum post or a diff.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Commenting_Code.htm',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'jsdoc',
      title: 'Function documentation (`///`)',
      body: "Triple-slash lines with `@` tags that feed the IDE's autocomplete.",
      details:
        'A comment starting with three slashes is read by the GameMaker IDE rather than merely ignored. `@description`, `@param`, and `@returns` populate the tooltip and argument hints you get when you later type the function\'s name, which is the closest thing GML has to a type signature. A type in braces (`@param {Real} _x`) tells Feather, the built-in code analyser, what to expect, and square brackets around a name mark it optional.\n\nOn an object event, a single `/// @description ...` line at the top also renames that event in the IDE\'s event list, so a Step event can read "handle input" instead of "Step". Older code carries a `@function` or `@func` tag spelling out the whole signature; that one belongs to the legacy code editor, and current GameMaker infers the signature from the declaration itself.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/The_Asset_Editors/Code_Editor_Properties/JSDoc_Script_Comments.htm',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'macro',
      title: 'Macro (`#macro`)',
      body: 'A compile-time constant. The value is pasted in wherever the name appears.',
      details:
        '`#macro MAX_SPEED 8` defines a name the compiler substitutes literally before the game is built. There is no variable, no memory, and no lookup at runtime, which makes macros the idiomatic way to name a tuning number you never intend to change while the game is running.\n\nA macro can also be scoped to a build configuration with `#macro Config:NAME value`, so a `Debug` build and a `Release` build can disagree about the same constant without an `if` anywhere in your code. Macros are not variables: you cannot assign to one, and they are visible across the whole project regardless of which file declares them.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Constants.htm',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'enum',
      title: 'Enum',
      body: 'A named set of integer constants, referenced as `Name.member`.',
      details:
        '`enum PlayerState { idle, running, hurt }` creates three compile-time constants numbered from 0 upward, read back as `PlayerState.idle` and friends. You can also assign explicit values (`error = -1`), and later members continue counting from the last one given.\n\nEnums exist so that state machines stop being written in raw integers. `if (state == 2)` tells a reader nothing; `if (state == PlayerState.hurt)` tells them everything, and costs exactly the same at runtime because the compiler has already replaced the name with the number.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables/Constants.htm',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'var-local',
      title: 'Local variable (`var`)',
      body: '`var` scopes a variable to the current event or function only.',
      details:
        "`var _spd = 4;` creates a variable that lives until the end of the event or function that declared it, then vanishes. It is not stored on the instance, so nothing else can read it, and re-running the event next frame starts from scratch.\n\nThe leading underscore is a naming convention, not syntax: GameMaker projects use it so that a glance at `_spd` versus `spd` tells you whether the value survives the frame. Locals are also the fastest kind of variable in GML, since the compiler can resolve them without going through an instance's variable table.",
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables_And_Variable_Scope.htm',
      color: 'green',
      side: 'left',
    },
    {
      id: 'var-instance',
      title: 'Instance variable',
      body: 'An assignment with no `var` belongs to the instance and persists.',
      details:
        'Writing `hp = 100;` with no keyword in front of it stores the value on the instance running the code, where it stays until that instance is destroyed. Every instance of an object gets its own copy, which is what lets forty enemies each track their own health with one line of code.\n\nSome instance variables are built in and already exist before you touch them: `x`, `y`, `speed`, `direction`, `image_index`, `visible`, and a few dozen more. Assigning to `x` does not just record a number, it moves the instance, because the engine reads that variable every frame. And yes, `y` grows downward.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables_And_Variable_Scope.htm',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'var-global',
      title: 'Global variable (`global.`)',
      body: 'One shared copy, readable from any instance in any room.',
      details:
        '`global.score = 0;` creates a variable that belongs to the game rather than to any instance. It survives room changes and instance destruction, and any code anywhere can read or write it by naming the `global.` prefix explicitly.\n\nThat prefix is deliberate. GML makes you say `global.` every single time precisely because the alternative, an invisible shared variable, is how save files quietly corrupt themselves. Score, current level, and settings are reasonable globals; anything that logically belongs to one thing on screen is not.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Variables_And_Variable_Scope.htm',
      color: 'red',
      side: 'left',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: '`function name(args) { ... }` declares a reusable, callable block.',
      details:
        'Since GameMaker 2.3 a script file is ordinary code that happens to declare functions, so one file can hold as many as you like. Before that release every script *was* a single function and the file name *was* the function name, which is why older tutorials look so different from current ones.\n\nA function declared at the top level of a script is global: any object can call it from any event. Functions are also values, so one can be stored in a variable or a struct field, passed to another function, and called later, which is how callbacks and simple state machines are usually wired up.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Script_Functions.htm',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'constructor',
      title: 'Constructor and struct',
      body: '`function Name() constructor` builds structs with `new Name()`.',
      details:
        'Adding the `constructor` keyword after the parameter list turns a function into a blueprint. `new Weapon("Rusty Sword", 3)` runs the body against a fresh struct, and every plain assignment inside becomes a field on that struct. A struct is a bag of named values with no sprite, no position, and no events: unlike an instance, it is not a thing in a room. A one-off struct can also be written as a literal, `var _pos = { x: 0, y: 0 };`, where a colon rather than `=` separates key from value.\n\n`static` marks a member that is stored once for the constructor rather than once per struct, which is how methods are normally declared: without it, forty weapons would carry forty identical copies of the same function. A constructor can also extend another with `function Sword() : Weapon() constructor`, giving GML single inheritance.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Structs.htm',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'with',
      title: '`with` (scope switching)',
      body: 'Runs a block as if it were each matching instance in turn.',
      details:
        '`with (obj_enemy) { ... }` executes its body once for every instance of `obj_enemy` in the room, and inside that body `self` *is* that enemy. Bare `x`, `hp`, and `instance_destroy()` therefore refer to the enemy, not to whoever wrote the code. Passing a single instance id instead of an object runs the block exactly once, for that instance.\n\nInside a `with`, the keyword `other` refers back to whoever ran it, which is how the two sides talk to each other (`other.hp -= damage`). This is the single most GML-flavored feature in the language, and the single easiest way to write code that reads correctly and does something else entirely.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/with.htm',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'control-flow',
      title: 'Control flow',
      body: "`if`/`else` and the loops, including GML's own `repeat` and `do ... until`.",
      details:
        'GML has the C-family set (`if`/`else`, `for`, `while`, `switch`, `break`, `continue`, `return`) plus two of its own. `repeat (3) { ... }` runs a block a fixed number of times with no counter variable at all, and `do { ... } until (condition)` tests at the bottom, so the body always runs at least once. Note that it is `until`, not `while`: the loop ends when the condition becomes *true*.\n\nThe ternary `condition ? a : b` works as an expression, and `and`, `or`, and `not` are accepted as spelled-out aliases for `&&`, `||`, and `!`. GML will forgive a missing semicolon in many places, but the manual tells you to end every statement with one, and so does every error message you are ever going to read.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Overview/Language_Features/repeat.htm',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'builtin',
      title: 'Built-in function call',
      body: "The engine's own library: input, collision, instances, drawing.",
      details:
        'Almost everything a game does routes through a built-in function rather than a class or a module import. `keyboard_check(vk_right)` polls input, `place_meeting(x, y, obj_wall)` asks the collision system a question, `instance_create_layer(x, y, "Instances", obj_spark)` spawns something, and `instance_destroy()` removes the caller.\n\nThe naming is consistently `subject_verb`, which makes the autocomplete list the real documentation: type `audio_` or `ds_list_` and the whole family appears. One family is special: the `draw_*` functions only produce anything when called from a Draw event, because that is the only point in the frame where the engine is actually drawing.',
      learnMore:
        'https://manual.gamemaker.io/monthly/en/GameMaker_Language/GML_Reference/GML_Reference.htm',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '/// @description obj_player :: Step Event', refs: ['jsdoc'] },
      { code: '' },
      { code: '#macro WALK_SPEED 4', refs: ['macro'] },
      { code: '' },
      { code: '// Local: gone the moment this event ends.', refs: ['comment'] },
      {
        code: 'var _dx = keyboard_check(vk_right) - keyboard_check(vk_left);',
        refs: ['var-local', 'builtin'],
      },
      { code: '' },
      {
        code: '// x is a built-in instance variable, so assigning to it moves you.',
        refs: ['comment'],
      },
      { code: 'x += _dx * WALK_SPEED;', refs: ['var-instance', 'macro'] },
      { code: '' },
      {
        code: 'if (place_meeting(x, y, obj_wall)) {\n    x -= _dx * WALK_SPEED; // a collision engine, shipped as-is\n}',
        refs: ['control-flow', 'builtin'],
      },
      { code: '' },
      {
        code: 'if (hp <= 0) {\n    show_debug_message("Player down at " + string(x) + ", " + string(y));\n    instance_destroy();\n}',
        refs: ['control-flow', 'var-instance', 'builtin'],
      },
    ],
    verbose: [
      {
        code: '/*\n    scr_player.gml\n\n    A script file: no sprite, no events, just code the whole\n    project can call. Since 2.3 one file can hold any number\n    of functions, so this is no longer forty files.\n*/',
        refs: ['comment'],
      },
      { code: '' },
      {
        code: '// Compile-time constant: pasted in by the compiler, never looked up.',
        refs: ['comment'],
      },
      { code: '#macro MAX_SPEED 8', refs: ['macro'] },
      {
        code: '#macro Debug:MAX_SPEED 999 // the Debug config gets its own value',
        refs: ['macro'],
      },
      { code: '' },
      { code: '// Named integers, so `state == 2` stops being a riddle.', refs: ['comment'] },
      {
        code: 'enum PlayerState {\n    idle,\n    running,\n    hurt\n}',
        refs: ['enum'],
      },
      { code: '' },
      { code: '// One copy for the whole game. Use sparingly, mourn often.', refs: ['comment'] },
      { code: 'global.score = 0;', refs: ['var-global'] },
      { code: '' },
      {
        code: '/// @description Blueprint for a weapon struct.\n/// @param {String} _name    Shown in the inventory\n/// @param {Real}   _damage  Damage per hit\n/// @returns {Struct.Weapon}',
        refs: ['jsdoc'],
      },
      {
        code: 'function Weapon(_name, _damage) constructor {',
        refs: ['function', 'constructor'],
      },
      {
        code: '    // Every `new Weapon(...)` gets its own copy of these.\n    name = _name;\n    damage = _damage;\n    ammo = [1, 1, 1]; // arrays are 0-indexed',
        refs: ['constructor'],
      },
      { code: '' },
      {
        code: '    // `static` stores this once for ALL weapons, not once each.\n    static describe = function() {\n        return name + " (" + string(damage) + " dmg)";\n    }\n}',
        refs: ['constructor', 'function'],
      },
      { code: '' },
      {
        code: "/// @description Called from obj_player's Step event, so `self` is the player.",
        refs: ['jsdoc'],
      },
      { code: 'function player_step() {', refs: ['function'] },
      {
        code: '    var _spd = keyboard_check(vk_shift) ? MAX_SPEED : 4;',
        refs: ['var-local', 'builtin', 'macro'],
      },
      {
        code: '    var _dx = keyboard_check(vk_right) - keyboard_check(vk_left);',
        refs: ['var-local', 'builtin'],
      },
      { code: '' },
      {
        code: '    // No `var`, so these live on the instance. And yes, y grows DOWN.',
        refs: ['comment'],
      },
      { code: '    x += _dx * _spd;', refs: ['var-instance'] },
      {
        code: '    state = (_dx == 0) ? PlayerState.idle : PlayerState.running;',
        refs: ['var-instance', 'enum', 'control-flow'],
      },
      { code: '' },
      {
        code: '    // `repeat` is a for loop that admits it only wanted a count.',
        refs: ['comment'],
      },
      {
        code: '    repeat (3) {\n        instance_create_layer(x, y, "Instances", obj_spark);\n    }',
        refs: ['control-flow', 'builtin'],
      },
      { code: '' },
      {
        code: '    // Inside `with`, `self` IS the enemy and `other` is still the player.',
        refs: ['comment'],
      },
      {
        code: '    with (obj_enemy) {\n        if (place_meeting(x, y, other.id)) {\n            other.hp -= damage;\n            instance_destroy();\n        }\n    }',
        refs: ['with', 'control-flow', 'builtin'],
      },
      { code: '' },
      {
        code: '    // `until`, not `while`: the body always runs at least once.',
        refs: ['comment'],
      },
      {
        code: '    do {\n        y += 1;\n    } until (place_meeting(x, y + 1, obj_wall));',
        refs: ['control-flow', 'var-instance', 'builtin'],
      },
      { code: '' },
      {
        code: '    if (hp <= 0) {\n        global.score = max(global.score - 100, 0);\n        instance_destroy();\n    }',
        refs: ['control-flow', 'var-global', 'builtin'],
      },
      { code: '}', refs: ['function'] },
      { code: '' },
      {
        code: '/// @description Called from the Draw event, the only place draw_* does anything.',
        refs: ['jsdoc'],
      },
      {
        code: 'function player_draw() {\n    draw_self();\n    // draw_text: still the most-used debugger in game development.\n    draw_text(x, y - 24, "HP: " + string(hp));\n}',
        refs: ['function', 'builtin', 'var-instance'],
      },
    ],
  },
}
