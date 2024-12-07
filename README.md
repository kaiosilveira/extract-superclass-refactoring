[![Continuous Integration](https://github.com/kaiosilveira/extract-superclass-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/extract-superclass-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my Refactoring catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Extract Superclass

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
class Department {
  get totalAnnualCost() { ... }
  get name() { ... }
  get headCount() { ... }
}

class Employee {
  get annualCost() { ... }
  get name() { ... }
  get id() { ... }
}
```

</td>

<td>

```javascript
class Party {
  get name() { ... }
  get annualCost() { ... }
}

class Department extends Party {
  get annualCost() { ... }
  get headCount() { ... }
}

class Employee extends Party {
  get id() { ... }
  get annualCost() { ... }
}
```

</td>
</tr>
</tbody>
</table>

Duplication is probably not the root of **all** evil, but it accounts for a good portion of it. Often enough, we have classes doing the same thing in slightly different ways. This refactoring helps with bringing this behavior to a single place.

## Working example

Our working example is a program that contains an `Employee` and a `Department`. These two classes do very similar things in slightly different ways. Our goal is to introduce a superclass so both of them can extend it.

### Test suite

Our test suite starts pretty simple and covers the basic behavior of each class (such as validating that it correctly calculates the annual costs). With that in place, we're safe to proceed.

PS: Take a look at the source code for the implementation.

### Steps

We start by introducing `Party`, the superclass. It starts empty, and we'll gradually move behavior into it:

```diff
+export class Party {}
```

We then make `Department` extend `Party`:

```diff
+export class Department extends Party {
   constructor(name, staff) {
+    super();
     this._name = name;
     this._staff = staff;
   }
```

and also `Employee`:

```diff
+export class Employee extends Party {
   constructor(name, id, monthlyCost) {
+    super();
     this._name = name;
     this._id = id;
     this._monthlyCost = monthlyCost;
```

Then, we can start moving behavior. First, we [pull up](://github.com/kaiosilveira/pull-up-field-refactoring) the `name` field to `Party`:

```diff
diff --git Party
-export class Party {}
+export class Party {
+  constructor(name) {
+    this._name = name;
+  }
+}

diff --git Department...
 export class Department extends Party {
   constructor(name, staff) {
-    super();
-    this._name = name;
+    super(name);
     this._staff = staff;
   }

diff --git Employee...
 export class Employee extends Party {
   constructor(name, id, monthlyCost) {
-    super();
-    this._name = name;
+    super(name);
     this._id = id;
     this._monthlyCost = monthlyCost;
   }
```

And then, we do [the same](://github.com/kaiosilveira/pull-up-method-refactoring) for the `name` getter:

```diff
diff --git Party
export class Party {
+  get name() {
+    return this._name;
+  }
 }

diff --git Department...
export class Department extends Party {
-  get name() {
-    return this._name;
-  }
diff --git Employee...
export class Employee extends Party {
-  get name() {
-    return this._name;
-  }
```

Finally, we notice that the calculation of annual costs, although particular to each subclass, can be implemented as a [template method](https://github.com/kaiosilveira/design-patterns/tree/main/template-method) at `Party`. To accomplish that, we first need to rename `totalMonthlyCost` to `monthlyCost` at `Department`:

```diff
export class Department extends Party {
     return this._staff.slice();
   }
-  get totalMonthlyCost() {
+  get monthlyCost() {

   ...

   get totalAnnualCost() {
-    return this.totalMonthlyCost * 12;
+    return this.monthlyCost * 12;
   }
 }
```

and also rename `totalAnnualCost` to `annualCost`:

```diff
export class Department extends Party {
-  get totalAnnualCost() {
+  get annualCost() {
     return this.monthlyCost * 12;
   }
 }
```

Finally, we can pull up the `annualCost` getter to `Party`:

```diff
diff --git Party
export class Party {
+  get annualCost() {
+    return this.monthlyCost * 12;
+  }
 }

diff --git Department...
export class Department extends Party {
-  get annualCost() {
-    return this.monthlyCost * 12;
-  }
 }

diff --git Employee...
export class Employee extends Party {
   get id() {
     return this._id;
   }
-
-  get annualCost() {
-    return this._monthlyCost * 12;
-  }
 }
```

And that's it!

### Commit history

Below there's the commit history for the steps detailed above.

| Commit SHA                                                                                                                | Message                                                    |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [c93eceb](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/c93ecebba55c6a8ceefa5eaea9c652633f75b995) | introduce `Party` class                                    |
| [5ffb7ef](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/5ffb7ef10cee37943c1f2099e5249452fccd6a11) | make `Department` extend `Party`                           |
| [c56e8ac](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/c56e8ac111e987b0cade9a88a089d5ee4216acb4) | make `Employee` extend `Party`                             |
| [b650705](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/b65070560d0bf2eeb74e77e5018df6864c337060) | pull up `name` field to `Party`                            |
| [907a85d](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/907a85d01f15ec889cf21791d8016ee87e7c8522) | pull up `name` getter to `Party`                           |
| [1fa6909](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/1fa6909c1bbcde9013116bc66f18ce7314ca320c) | rename `totalMonthlyCost` to `monthlyCost` at `Department` |
| [07933a8](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/07933a87aca922489d9e8176982fec3f1d00656c) | rename `totalAnnualCost` to `annualCost` at `Department`   |
| [5f107c1](https://github.com/kaiosilveira/extract-superclass-refactoring/commit/5f107c16ca1586a408ed5555e57900b7951e4856) | pull up `annualCost` getter to `Party`                     |

For the full commit history for this project, check the [Commit History tab](https://github.com/kaiosilveira/extract-superclass-refactoring/commits/main).
