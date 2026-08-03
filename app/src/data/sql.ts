import type { LanguageDef } from '../lib/types'

export const sql: LanguageDef = {
  id: 'sql',
  popularity: 8,
  name: 'SQL',
  titleWord: 'SQL',
  article: 'a',
  extensions: ['.sql'],
  accentHex: '#e38c00',
  officialUrl: 'https://en.wikipedia.org/wiki/SQL',
  shikiLang: 'sql',
  note: 'SQL (Structured Query Language) is a domain-specific language for managing and querying data held in relational database management systems.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (`--`) or block (`/* ... */`), ignored by the engine.',
      details:
        'A double dash (`--`) starts a comment that runs to the end of the line. Block comments open with `/*` and close with `*/`, and may span multiple lines, though most dialects do not allow them to nest.\n\nComments are stripped before parsing, so they carry zero runtime cost. Since SQL scripts are often run as one-off migrations, a well-placed comment explaining *why* a change was made tends to outlive whoever wrote it.',
      learnMore: 'https://en.wikipedia.org/wiki/Comment_(computer_programming)',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'create-table',
      title: 'CREATE TABLE',
      body: "Data Definition Language (DDL) statement that defines a table's shape.",
      details:
        '`CREATE TABLE` is DDL (Data Definition Language): it describes structure rather than manipulating rows. Each column is given a name and a data type (`INTEGER`, `VARCHAR(n)`, `DECIMAL(p,s)`, `DATE`, `TIMESTAMP`, etc.), and the engine enforces that type on every value stored in it.\n\nDDL statements are typically auto-committed and, in most engines, cannot be rolled back as easily as ordinary data changes: which is part of why schema changes usually go through migration tooling rather than being run ad hoc.',
      learnMore: 'https://en.wikipedia.org/wiki/Data_definition_language',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'constraints',
      title: 'Constraints',
      body: 'Rules like `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `CHECK`, and `REFERENCES` that guard data integrity.',
      details:
        "A `PRIMARY KEY` uniquely identifies each row; `NOT NULL` and `UNIQUE` restrict what a column may hold; `CHECK` enforces an arbitrary boolean expression like `amount >= 0`. `REFERENCES` declares a foreign key, tying a column's values back to a primary key in another table.\n\nConstraints are checked on every `INSERT` or `UPDATE`, so violations are rejected at write time rather than discovered later during a query. This pushes correctness into the database itself instead of relying solely on application code to get it right.",
      learnMore: 'https://en.wikipedia.org/wiki/Foreign_key',
      color: 'green',
      side: 'left',
    },
    {
      id: 'insert',
      title: 'INSERT',
      body: 'Adds one or more new rows to a table.',
      details:
        '`INSERT INTO table (columns) VALUES (...)` appends new rows; listing the target columns explicitly (rather than relying on column order) keeps the statement readable and resilient to schema changes. A single `INSERT` can supply multiple `VALUES` tuples to add several rows in one statement.\n\nColumns omitted from the column list fall back to their `DEFAULT` (or `NULL`, if no default and no `NOT NULL` constraint blocks it). Most engines also support `INSERT ... SELECT` to copy rows from a query result straight into another table.',
      learnMore: 'https://www.postgresql.org/docs/current/sql-insert.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'update',
      title: 'UPDATE',
      body: 'Modifies existing rows that match a condition.',
      details:
        "`UPDATE table SET column = value WHERE condition` rewrites matching rows in place. The `SET` clause can update several columns at once, separated by commas, and may reference the row's own current values, e.g. `SET amount = amount * 1.1`.\n\nOmitting the `WHERE` clause updates every row in the table, which is a classic way to turn a Tuesday afternoon into an incident report. Most teams wrap ad hoc `UPDATE`s in a transaction specifically so they stay reversible until confirmed correct.",
      learnMore: 'https://www.postgresql.org/docs/current/sql-update.html',
      color: 'red',
      side: 'left',
    },
    {
      id: 'select-clause',
      title: 'SELECT / ORDER BY / LIMIT',
      body: 'Chooses which columns to return, how to sort them, and how many rows to keep.',
      details:
        "`SELECT` names the columns (or expressions, like `COUNT(o.order_id) AS order_count`) a query returns; `SELECT *` returns every column but is generally avoided in application code since it breaks silently when the schema changes. `ORDER BY` sorts the result set, and `LIMIT` (or `FETCH FIRST` / `TOP`, depending on dialect) caps how many rows come back.\n\nThese clauses run near the end of a query's logical evaluation order, after filtering and grouping: the engine computes the full result set conceptually, then sorts and trims it, however the query optimizer actually chooses to execute it under the hood.",
      learnMore: 'https://www.postgresql.org/docs/current/sql-select.html',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'join',
      title: 'JOIN',
      body: 'Combines rows from two tables based on a related column.',
      details:
        '`INNER JOIN ... ON` matches rows from two tables where the join condition holds, discarding rows with no match on either side. `LEFT JOIN` keeps every row from the left table regardless of a match, filling unmatched columns with `NULL`: useful for "show me all customers, even ones with no orders" queries.\n\nTable aliases (`FROM customers AS c`) keep multi-table queries readable and are required once the same table is joined to itself. A missing or wrong `ON` condition silently produces a cross join\'s worth of extra rows, which is a common source of duplicated totals.',
      learnMore: 'https://en.wikipedia.org/wiki/Join_(SQL)',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'where-clause',
      title: 'WHERE',
      body: 'Filters rows before grouping, using comparison and logical operators.',
      details:
        '`WHERE` filters individual rows before any grouping happens, using operators like `=`, `<>`, `>`, `IN`, `LIKE`, and `BETWEEN`, combined with `AND`/`OR`. It cannot reference aggregate functions like `SUM(...)` directly, that restriction is what `HAVING` exists for.\n\nBecause `WHERE` runs early in logical evaluation, filtering here (rather than after a `JOIN` produces a huge intermediate result) is usually what lets the query planner use an index instead of scanning every row.',
      learnMore: 'https://www.postgresql.org/docs/current/sql-select.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'group-having',
      title: 'GROUP BY / HAVING',
      body: 'Buckets rows into groups and filters those groups with aggregate conditions.',
      details:
        '`GROUP BY` collapses rows sharing the same value(s) in the given columns into single groups, so aggregate functions like `COUNT`, `SUM`, and `AVG` can be computed per group instead of over the whole table. Every non-aggregated column in `SELECT` must appear in the `GROUP BY` list in standard SQL.\n\n`HAVING` is `WHERE` for groups: it filters based on the aggregate result, e.g. `HAVING SUM(o.amount) > 10`, after the grouping has already happened. Trying to write that same condition in `WHERE` fails, since `WHERE` runs before aggregates exist.',
      learnMore: 'https://www.postgresql.org/docs/current/queries-table-expressions.html',
      color: 'pink',
      side: 'left',
    },
    {
      id: 'subquery',
      title: 'Subquery',
      body: 'A SELECT nested inside another statement.',
      details:
        "A subquery is a complete `SELECT` nested inside another query's `WHERE`, `FROM`, or column list, usually wrapped in parentheses. `WHERE customer_id IN (SELECT ...)` filters the outer query against a set of values produced by the inner one, and a subquery used in `FROM` is treated like a temporary, unnamed table.\n\nA correlated subquery references a column from the outer query and is re-evaluated once per outer row, which can be expensive; an uncorrelated subquery runs once. Common table expressions (`WITH name AS (SELECT ...)`) often express the same logic more readably.",
      learnMore: 'https://www.postgresql.org/docs/current/functions-subquery.html',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'transaction',
      title: 'Transaction',
      body: '`BEGIN` / `COMMIT` / `ROLLBACK` group statements into one all-or-nothing unit.',
      details:
        '`BEGIN TRANSACTION` (or just `BEGIN`) opens a unit of work; `COMMIT` makes every change inside it permanent, and `ROLLBACK` undoes all of them as if they never ran. This is the "atomicity" in ACID: partial failures do not leave the data half-changed.\n\nMany engines auto-commit each statement by default when no explicit transaction is open, so wrapping related `INSERT`/`UPDATE`/`DELETE` statements in one transaction is what makes multi-step changes safe to retry or abort as a single group.',
      learnMore: 'https://en.wikipedia.org/wiki/Database_transaction',
      color: 'rose',
      side: 'right',
    },
  ],
  // The one thing about SQL a code panel physically cannot show: a query is not
  // executed in the order it is written. Two columns and four crossing lines say
  // it faster than any amount of prose, and the row counts on the right are why
  // it matters (WHERE runs before GROUP BY, so it is filtering a million rows,
  // not eight thousand groups).
  visual: {
    panels: [
      {
        template: 'topology',
        caption: 'The order you write it is not the order it runs',
        zones: [
          {
            id: 'written',
            label: 'as you write it',
            nodes: [
              {
                id: 'w-select',
                ref: 'select-clause',
                title: 'SELECT',
                sub: 'customer_id, COUNT(*)',
              },
              { id: 'w-from', ref: 'join', title: 'FROM / JOIN', sub: 'orders JOIN customers' },
              { id: 'w-where', ref: 'where-clause', title: 'WHERE', sub: "status = 'shipped'" },
              {
                id: 'w-group',
                ref: 'group-having',
                title: 'GROUP BY / HAVING',
                sub: 'customer_id, COUNT(*) > 3',
              },
            ],
          },
          {
            id: 'run',
            label: 'as the database runs it',
            nodes: [
              {
                id: 'r-from',
                ref: 'join',
                title: 'FROM / JOIN',
                rows: [{ label: '1,000,000 rows' }],
              },
              {
                id: 'r-where',
                ref: 'where-clause',
                title: 'WHERE',
                rows: [{ label: '120,000 rows' }],
              },
              {
                id: 'r-group',
                ref: 'group-having',
                title: 'GROUP BY / HAVING',
                rows: [{ label: '8,400 groups' }],
              },
              {
                id: 'r-select',
                ref: 'select-clause',
                title: 'SELECT',
                rows: [{ label: '10 rows out' }],
              },
            ],
          },
        ],
        edges: [
          { from: 'w-from', to: 'r-from', ref: 'join' },
          { from: 'w-where', to: 'r-where', ref: 'where-clause' },
          { from: 'w-group', to: 'r-group', ref: 'group-having' },
          { from: 'w-select', to: 'r-select', ref: 'select-clause' },
        ],
      },
    ],
  },
  examples: {
    minimal: [
      { code: '-- A minimal query. No ORMs were harmed in its writing.', refs: ['comment'] },
      {
        code: "CREATE TABLE pets (\n    pet_id   INTEGER PRIMARY KEY,\n    name     VARCHAR(50) NOT NULL,\n    species  VARCHAR(20) NOT NULL DEFAULT 'cat'\n);",
        refs: ['create-table', 'constraints'],
      },
      { code: '' },
      {
        code: "INSERT INTO pets (pet_id, name, species)\nVALUES (1, 'Norm', 'iguana');",
        refs: ['insert'],
      },
      { code: '' },
      {
        code: "SELECT name\nFROM pets\nWHERE species = 'iguana'; -- always bet on the reptile",
        refs: ['select-clause', 'where-clause', 'comment'],
      },
    ],
    verbose: [
      {
        code: '-- Anatomy of a SQL file: a query is a promise you\'ll figure out the JOIN later.\n-- SQL has been "declining" since 1974 and yet here we all still are.',
        refs: ['comment'],
      },
      { code: '' },
      {
        code: '/* Block comments span multiple lines,\n   which is more than can be said for most database migrations. */',
        refs: ['comment'],
      },
      { code: '' },
      {
        code: '-- Schema definition: describe the shape of the data before you regret it',
        refs: ['comment'],
      },
      {
        code: 'CREATE TABLE customers (\n    customer_id   INTEGER        PRIMARY KEY,\n    full_name     VARCHAR(100)   NOT NULL,\n    email         VARCHAR(255)   UNIQUE NOT NULL,\n    signup_date   DATE           DEFAULT CURRENT_DATE,\n    referred_by   INTEGER        REFERENCES customers(customer_id)\n);',
        refs: ['create-table', 'constraints'],
      },
      { code: '' },
      {
        code: "CREATE TABLE orders (\n    order_id      INTEGER        PRIMARY KEY,\n    customer_id   INTEGER        NOT NULL REFERENCES customers(customer_id),\n    amount        DECIMAL(10,2)  NOT NULL CHECK (amount >= 0),\n    status        VARCHAR(20)    NOT NULL DEFAULT 'pending',\n    placed_at     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP\n);",
        refs: ['create-table', 'constraints'],
      },
      { code: '' },
      {
        code: '-- Seed a couple of rows; nothing says "trust me" like hardcoded values',
        refs: ['comment'],
      },
      {
        code: "INSERT INTO customers (customer_id, full_name, email)\nVALUES\n    (1, 'Ada Lovelace', 'ada@example.com'),\n    (2, 'Grace Hopper', 'grace@example.com');",
        refs: ['insert'],
      },
      { code: '' },
      {
        code: "INSERT INTO orders (order_id, customer_id, amount, status)\nVALUES\n    (100, 1, 42.00, 'shipped'),\n    (101, 2, 7.99, 'pending');",
        refs: ['insert'],
      },
      { code: '' },
      {
        code: '-- Update: correct a row without a WHERE clause, and enjoy your new career',
        refs: ['comment'],
      },
      {
        code: "UPDATE customers\nSET email = 'grace.hopper@example.com'\nWHERE customer_id = 2;",
        refs: ['update', 'where-clause'],
      },
      { code: '' },
      {
        code: '-- The main event: SELECT, the only four-letter word DBAs say in front of the boss',
        refs: ['comment'],
      },
      {
        code: 'SELECT\n    c.full_name,\n    COUNT(o.order_id)      AS order_count,\n    SUM(o.amount)           AS lifetime_value',
        refs: ['select-clause'],
      },
      {
        code: 'FROM customers AS c\nINNER JOIN orders AS o\n    ON o.customer_id = c.customer_id',
        refs: ['join'],
      },
      { code: "WHERE o.status <> 'cancelled'", refs: ['where-clause'] },
      { code: 'GROUP BY c.full_name\nHAVING SUM(o.amount) > 10', refs: ['group-having'] },
      { code: 'ORDER BY lifetime_value DESC\nLIMIT 10;', refs: ['select-clause'] },
      { code: '' },
      {
        code: '-- Subquery: a SELECT inside a SELECT, like Inception but with more semicolons',
        refs: ['comment'],
      },
      {
        code: 'SELECT full_name\nFROM customers\nWHERE customer_id IN (\n    SELECT customer_id\n    FROM orders\n    WHERE amount > 40\n);',
        refs: ['subquery', 'where-clause'],
      },
      { code: '' },
      { code: '-- Transactions: because "undo" should work in databases too', refs: ['comment'] },
      { code: 'BEGIN TRANSACTION;', refs: ['transaction'] },
      { code: '' },
      {
        code: "UPDATE orders\nSET status = 'refunded'\nWHERE order_id = 101;",
        refs: ['transaction', 'update', 'where-clause'],
      },
      { code: '' },
      { code: 'COMMIT;', refs: ['transaction'] },
    ],
  },
}
