import type { LanguageDef } from '../lib/types'

export const objectivec: LanguageDef = {
  id: 'objectivec',
  popularity: 30,
  name: 'Objective-C',
  titleWord: 'Objective-C',
  article: 'an',
  extensions: ['.m', '.h'],
  accentHex: '#438eff',
  officialUrl: 'https://en.wikipedia.org/wiki/Objective-C',
  shikiLang: 'objective-c',
  note: "Objective-C is a superset of C that adds Smalltalk-style messaging, used extensively for Apple's macOS and iOS development before Swift.",
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`//`) or block (`/* ... */`), ignored by the compiler.',
      details:
        "Because Objective-C is a strict superset of C, it inherits C's two comment forms verbatim: `//` runs to the end of the line, and `/* ... */` spans multiple lines but does not nest. Both are stripped before compilation and have no effect on the compiled binary whatsoever.\n\nHeader files (`.h`) lean on comments especially heavily, since they are the public contract of a class, the declarations a `.m` implementation file promises to fulfill. A well-commented header often serves as the only documentation a consumer of a framework ever reads.",
      learnMore: 'https://en.cppreference.com/w/c/comment',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'import',
      title: 'Import directive',
      body: 'Includes header files and automatically prevents multiple inclusions.',
      details:
        "`#import <Foundation/Foundation.h>` pulls in Foundation's declarations: `NSString`, `NSObject`, `NSLog`, and the rest of the base classes almost every Objective-C file depends on. Angle brackets search framework/system include paths; quotes (`\"MyHeader.h\"`) search the local project directory first.\n\n`#import` is Objective-C's own preprocessor extension over plain C's `#include`: it tracks which files it has already pulled in and silently skips repeats, so headers no longer need hand-written `#ifndef` include guards. It is otherwise textual substitution performed by the same preprocessor pass C uses.",
      learnMore: 'https://en.wikipedia.org/wiki/Include_directive',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'interface',
      title: 'Interface declaration',
      body: "Defines a class's public API with `@interface`, inheriting from a superclass.",
      details:
        "`@interface Person : NSObject { ... }` opens a class declaration named `Person`, inheriting from `NSObject`, the root class most Objective-C objects ultimately descend from. Everything between `@interface` and the matching `@end` (ivars, property declarations, and method signatures) makes up the class's public interface, conventionally placed in a `.h` header so other files can `#import` it.\n\nObjective-C supports single class inheritance: a class has exactly one superclass. Shared contracts across unrelated hierarchies are expressed with protocols, while categories can add methods to an existing class without subclassing it.",
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/DefiningClasses/DefiningClasses.html',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'ivar',
      title: 'Instance variable',
      body: 'Private data stored in an object, often prefixed with an underscore.',
      details:
        '`NSInteger _age;` declared inside the `@interface` braces is an instance variable (ivar). Raw storage that belongs to every instance of the class, invisible outside it by default. The leading underscore is a long-standing convention signaling "backing storage, do not touch directly," reserving the un-prefixed name for a property\'s public accessor.\n\nModern Objective-C rarely hand-declares ivars for properties, since `@property` auto-synthesizes a matching underscored ivar for you. Explicit ivars still show up for state that should never be exposed through a property at all.',
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'property',
      title: 'Property declaration',
      body: 'Declares accessor methods and ownership semantics; modern compilers normally synthesize their implementation.',
      details:
        "`@property (nonatomic, strong) NSString *name;` declares a property and asks the compiler to synthesize `-name` and `-setName:` accessor methods plus a backing `_name` ivar, all without writing a line of implementation. The parenthesized attributes configure the generated accessors: `nonatomic` skips the overhead of thread-safe locking (the default, `atomic`, adds it), and `strong` tells Automatic Reference Counting to retain the object for as long as this property holds it.\n\nOther common attributes include `weak` (a non-owning reference that zeroes itself out when the object is deallocated, avoiding retain cycles) and `copy` (favored for `NSString` so a mutable string handed in later can't change value out from under you). `@synthesize` used to be required to wire a property to its ivar; the compiler has generated it implicitly since Xcode 4.4.",
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html',
      color: 'green',
      side: 'right',
    },
    {
      id: 'method-declaration',
      title: 'Method declaration',
      body: "Defines a method's signature; `-` for instance methods, `+` for class methods.",
      details:
        "A leading `-` marks an instance method (`- (void)sayHello;` operates on a specific object), while a leading `+` marks a class method (`+ (Person *)personWithName:(NSString *)name age:(NSInteger)age;` operates on the class itself, commonly used for factory constructors). The parenthesized type before the selector fragment is the return type, and each labeled colon segment (`name:`, `age:`) is part of the method's full selector name.\n\nUnlike C++ or Java, Objective-C selectors are not overloaded by parameter type alone. `personWithName:age:` is one indivisible name, and every keyword before a colon is meant to read like a sentence describing what the call does. This is the readability trade-off for the verbosity Objective-C is famous (or infamous) for.",
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/DefiningClasses/DefiningClasses.html',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'implementation',
      title: 'Implementation block',
      body: "Contains the actual code for a class's methods, opened with `@implementation`.",
      details:
        '`@implementation Person ... @end` supplies the bodies for the methods declared in the matching `@interface`. By convention this block lives in the `.m` ("message" or "methods") file, kept separate from the `.h` header so consumers of a class see only its public shape, not its internals.\n\nA class\'s interface and implementation can even disagree slightly: a "class extension" (`@interface Person () @end` in the `.m` file) can declare additional private properties or methods visible only within the implementation file, a common pattern for hiding internal state from the public header.',
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/DefiningClasses/DefiningClasses.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'method-definition',
      title: 'Method definition',
      body: 'The actual implementation of a declared method.',
      details:
        'Inside `@implementation`, each method from the interface gets a matching body, such as `- (instancetype)initWithName:(NSString *)name age:(NSInteger)age { ... }`. `instancetype` is a special return type meaning "whatever class this was actually invoked on," which lets initializers and factory methods return the correct type even through subclassing, something a literal class name in the signature could not do safely.\n\nInitializers follow a strict idiom: call a superclass initializer, guard the result, assign ivars, then return `self`. Any initializer that skips the `if (self)` guard risks configuring an object that failed to initialize, so the pattern shown here is close to mandatory rather than stylistic.',
      learnMore: 'https://en.wikipedia.org/wiki/Objective-C',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'self',
      title: 'Self keyword',
      body: 'Refers to the current instance of the class.',
      details:
        '`self` inside an instance method refers to the object the message was sent to, analogous to `this` in C++ or Java. Inside a class method, `self` instead refers to the class object itself, which is why `[self alloc]` inside a `+` method allocates an instance of whatever class actually received the call, correctly supporting subclasses without being hard-coded.\n\n`self.name` reads through the synthesized accessor (calling `-name`), which is a meaningfully different operation than reaching directly for the ivar `_name`: the accessor path respects `strong`/`copy`/`weak` memory semantics and any custom logic layered into a hand-written setter, while direct ivar access bypasses all of it.',
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithObjects/WorkingwithObjects.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'logging',
      title: 'Logging',
      body: 'Prints formatted output to the console with `NSLog`.',
      details:
        '`NSLog(@"Hello, my name is %@ and I am %ld years old.", self.name, (long)_age);` writes a timestamped, process-tagged line to the console, formatted with `printf`-style conversion specifiers. `%@` is Objective-C\'s own addition to the format-string vocabulary: it calls `-description` on any Objective-C object and substitutes the resulting string, which is why `NSLog` can print an `NSString`, `NSArray`, or custom object without a manual `%s` and C-string conversion.\n\n`NSInteger` is a platform-dependent typedef (32-bit or 64-bit depending on the architecture), so `NSLog` has no single matching format specifier for it; casting to `(long)` and using `%ld` sidesteps the ambiguity entirely rather than guessing wrong on one architecture.',
      learnMore: 'https://en.wikipedia.org/wiki/Objective-C',
      color: 'pink',
      side: 'left',
    },
    {
      id: 'main-autoreleasepool',
      title: 'Main function & autorelease pool',
      body: 'The entry point, using `@autoreleasepool` to manage memory for temporary objects.',
      details:
        'Like plain C, execution begins at `int main(int argc, const char *argv[])`. Wrapping the body in `@autoreleasepool { ... }` establishes a pool that drains at the closing brace, deallocating any object that was sent `-autorelease` (directly, or indirectly through convenience constructors) inside that scope.\n\nUnder Automatic Reference Counting this pattern matters less for basic memory safety than it did under manual retain/release, but it still bounds the lifetime of temporary objects and keeps peak memory usage down in loops that create many short-lived objects, such as processing images or parsing large collections one autoreleased object at a time.',
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmAutoreleasePools.html',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'method-call',
      title: 'Method call',
      body: 'Sends a message to an object using bracket syntax: `[receiver message]`.',
      details:
        '`[bob sayHello];` is a message send: the runtime looks up `sayHello` in `bob`\'s class (and its superclasses) and invokes whatever it finds, resolved dynamically at runtime rather than bound at compile time the way a C function call is. `[Person personWithName:@"Bob" age:30];` shows the same syntax with a multi-part selector, each argument slotting after its matching colon-labeled keyword.\n\nBecause dispatch happens at runtime through the Objective-C runtime library, sending a message to `nil` is not a crash (it silently returns `nil`/`0`/`NO`) which is a deliberate design choice distinct from most C-family languages, where calling through a null pointer segfaults immediately.',
      learnMore:
        'https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/WorkingwithObjects/WorkingwithObjects.html',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: '#import <Foundation/Foundation.h> // no ceremony spared', refs: ['import'] },
      { code: '' },
      {
        code: '@interface Robot : NSObject\n@property (nonatomic, strong) NSString *name;\n- (void)announceSelf;\n@end',
        refs: ['interface', 'property', 'method-declaration'],
      },
      { code: '' },
      {
        code: '@implementation Robot\n- (void)announceSelf {\n    NSLog(@"Beep boop, I am %@.", self.name); // beep boop is load-bearing',
        refs: ['implementation', 'method-definition', 'self', 'logging'],
      },
      { code: '}', refs: ['implementation'] },
      { code: '@end', refs: ['implementation'] },
      { code: '' },
      {
        code: 'int main(int argc, const char *argv[]) {\n    @autoreleasepool {',
        refs: ['main-autoreleasepool'],
      },
      {
        code: '        Robot *unit = [Robot new];\n        unit.name = @"Bender";\n        [unit announceSelf]; // one bracket to rule them all',
        refs: ['main-autoreleasepool', 'method-call'],
      },
      { code: '    }\n    return 0;\n}', refs: ['main-autoreleasepool'] },
    ],
    verbose: [
      {
        code: '//\n//  Person.h & Person.m (Conceptual Combination)\n//  AnatomyDemo\n//\n//  Two files pretending to be one, held together by hope and a build system.\n//',
        refs: ['comment'],
      },
      { code: '' },
      { code: '#import <Foundation/Foundation.h> // Import system header', refs: ['import'] },
      { code: '' },
      { code: '// Interface Declaration (usually in .h file)', refs: ['comment'] },
      {
        code: '@interface Person : NSObject {',
        refs: ['interface'],
      },
      { code: '    // Instance Variable (ivar)', refs: ['interface', 'comment'] },
      { code: '    NSInteger _age;', refs: ['interface', 'ivar'] },
      { code: '}', refs: ['interface'] },
      { code: '' },
      { code: '// Property Declaration', refs: ['comment'] },
      {
        code: '@property (nonatomic, strong) NSString *name;',
        refs: ['property'],
      },
      { code: '' },
      { code: '// Method Declaration (Instance Method)', refs: ['comment'] },
      { code: '- (void)sayHello;', refs: ['method-declaration'] },
      { code: '' },
      { code: '// Method Declaration (Class Method)', refs: ['comment'] },
      {
        code: '+ (Person *)personWithName:(NSString *)name age:(NSInteger)age;',
        refs: ['method-declaration'],
      },
      { code: '' },
      { code: '@end // End of Interface, mercifully', refs: ['interface', 'comment'] },
      { code: '' },
      { code: '// Implementation (usually in .m file)', refs: ['comment'] },
      { code: '@implementation Person', refs: ['implementation'] },
      { code: '' },
      {
        code: '// Synthesize property (optional in modern Obj-C)',
        refs: ['implementation', 'comment'],
      },
      { code: '// @synthesize name = _name;', refs: ['implementation', 'comment'] },
      { code: '' },
      {
        code: '- (instancetype)initWithName:(NSString *)name age:(NSInteger)age {\n    self = [super init]; // step one of the sacred initializer ritual',
        refs: ['implementation', 'method-definition', 'self'],
      },
      {
        code: '    if (self) {\n        _name = [name copy]; // Accessing ivar directly\n        _age = age;\n    }',
        refs: ['implementation', 'method-definition', 'ivar', 'self'],
      },
      { code: '    return self;', refs: ['implementation', 'method-definition', 'self'] },
      { code: '}', refs: ['implementation', 'method-definition'] },
      { code: '' },
      {
        code: '- (void)sayHello {\n    // Using self to access property\n    // "Hello, World" felt insufficiently verbose for this language',
        refs: ['implementation', 'method-definition', 'self'],
      },
      {
        code: '    NSLog(@"Hello, my name is %@ and I am %ld years old.", self.name, (long)_age);',
        refs: ['implementation', 'method-definition', 'self', 'logging'],
      },
      { code: '}', refs: ['implementation', 'method-definition'] },
      { code: '' },
      {
        code: '+ (Person *)personWithName:(NSString *)name age:(NSInteger)age {\n    return [[self alloc] initWithName:name age:age]; // factory method, no assembly line required',
        refs: ['implementation', 'method-definition', 'self', 'method-call'],
      },
      { code: '}', refs: ['implementation', 'method-definition'] },
      { code: '@end // End of Implementation', refs: ['implementation', 'comment'] },
      { code: '' },
      { code: '// Main function (entry point)', refs: ['comment'] },
      {
        code: 'int main(int argc, const char *argv[]) {\n    @autoreleasepool {',
        refs: ['main-autoreleasepool'],
      },
      {
        code: '        // Object creation using class method\n        Person *bob = [Person personWithName:@"Bob" age:30];',
        refs: ['main-autoreleasepool', 'method-call', 'comment'],
      },
      {
        code: '        // Method call using bracket syntax\n        [bob sayHello]; // brackets: because parentheses were too mainstream',
        refs: ['main-autoreleasepool', 'method-call', 'comment'],
      },
      { code: '    }', refs: ['main-autoreleasepool'] },
      { code: '    return 0;', refs: ['main-autoreleasepool'] },
      { code: '}', refs: ['main-autoreleasepool'] },
    ],
  },
}
